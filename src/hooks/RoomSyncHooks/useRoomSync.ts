import { child, DataSnapshot, get, push, set, update } from "firebase/database";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionsRef, exitRoom, MembersRef, RoomInfo, RoomInfoUpdate, RoomsRef, RoomState, startActionsDBSync, startMembersDBSync, startRoomDBSync, stopActionsDBSync, stopMembersDBSync, stopRoomDBSync, UserAction, UserActionUpdate, UserState, UserStateUpdate } from "services/RoomSync/RoomSync";
import { User } from "services/user/user";
import { RootState } from "store";

export const useRoomSync = () => {
  const room = useSelector((state: RootState) => state.room);
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return {
    room: room,
    isHost: useMemo(() => _isHost(room, user), [room, user]),
    createRoom: () => {
      if(user) dispatch(_createRoomAsync("blank", user));
    },
    enterRoom: (roomId: string) => {
      if(user) dispatch(_enterRoomAsync(roomId, user));
    },
    exitRoom: () => {
      if(room.id && user) {
        if(_isHost(room, user)){
          dispatch(_exitRoomAsHostAsync(room.id, user.id, room.sortedKeysOfMembers));
        } else {
          dispatch(_exitRoomAsync(room.id, user.id));
        }
      }
    },
    updateMember: (data: UserStateUpdate) => {
      if(room.id && user) _updateMemberAsync(room.id, user.id, data);
    },
    addAction: (data: UserAction) => {
      if(room.id) _addActionAsync(room.id, data);
    },
    updateAction: (id: string, data: UserActionUpdate) => {
      if(room.id) _updateActionAsync(room.id, id, data);
    },
    removeAction: (id: string) => {
      if(room.id) _removeActionAsync(room.id, id);
    }
  };
};

/**
 * ユーザがホストか判定
 * @param room ルーム
 * @param user ユーザ
 * @returns true: ホストである，false: ホストでない
 */
 const _isHost = (room: RoomState, user?: User | null) => {
  return (room.info && user && room.info.host == user.id) ? true : false;
};

/**
 * ルームを作成する
 * @param roomName ルーム名
 * @param user ホストユーザ
 * @returns dispatch用関数
 */
const _createRoomAsync = (roomName: string, user: User) => {
  return async (dispatch: any) => {
    const roomInfo: RoomInfo = {
      name: roomName,
      host: user.id,
      state: "waiting",
    };
    await push(RoomsRef, roomInfo).then((data) => {
      if(data.key){
        _initMemberAsync(data.key, user);
        dispatch(startRoomDBSync(data.key));
        dispatch(startMembersDBSync(data.key));
        dispatch(startActionsDBSync(data.key));
      }
    });
  };
};

/**
 * ルームに入る
 * @param roomId ルームID
 * @param user ルームに入るユーザ
 * @returns dispatch用関数
 */
const _enterRoomAsync = (roomId: string, user: User) => {
  return async (dispatch: any) => {
    if(roomId == "") return;
    await get(child(RoomsRef, roomId)).then((ss: DataSnapshot) => {
      const data = ss.val();
      if(data && ss.key) {
        _initMemberAsync(ss.key, user);
        dispatch(startRoomDBSync(ss.key));
        dispatch(startMembersDBSync(ss.key));
        dispatch(startActionsDBSync(ss.key));
      }
    });
  };
};

/**
 * ルームから退出する
 * ユーザがホストの場合は{@link exitRoomAsHostAsync}を使用
 * @param roomId ルームID
 * @param userId 退出するユーザID
 * @returns dispatch用関数
 */
const _exitRoomAsync = (roomId: string, userId: string) => {
  return async (dispatch: any) => {
    await _removeMemberAsync(roomId, userId);
    dispatch(stopRoomDBSync());
    dispatch(stopMembersDBSync());
    dispatch(stopActionsDBSync());
    dispatch(exitRoom());
  };
};

/**
 * 自分がホストでルームから退出する
 * @param roomId ルームID
 * @param userId 退出するユーザID（ホストID）
 * @param memberKeys メンバーIDリスト
 * @returns dispatch用関数
 */
const _exitRoomAsHostAsync = (roomId: string, userId: string, memberKeys: string[]) => {
  return async (dispatch: any) => {
    _moveHostNextAsync(roomId, userId, memberKeys);
    if(memberKeys.length <= 1) _destroyRoomAsync(roomId);
    dispatch(_exitRoomAsync(roomId, userId));
  };
};

/**
 * ホストを次の人に委譲する
 * @param roomId ルームID
 * @param userId ホストID
 * @param memberKeys メンバーIDリスト
 */
const _moveHostNextAsync = (roomId: string, hostId: string, memberKeys: string[]) => {
  if(memberKeys && memberKeys.length >= 2) {
    const idx = memberKeys?.indexOf(hostId);
    _moveHostAsync(roomId, memberKeys[(idx + 1) % memberKeys.length]);
  }
};

/**
 * 指定されたユーザにホストを変更する
 * @param roomId ルームID
 * @param newHostId 新ホストID
 */
 const _moveHostAsync = async (roomId: string, newHostId: string) => {
  await _updateRoomAsync(roomId, {
    host: newHostId,
  });
};

// ---- Realtime DBへのset・update・push・removeファンクション群 ----- //

/**
 * ルーム情報を更新する
 * @param roomId ルームID
 * @param roomInfo ルーム情報
 * @returns dispatch用関数
 */
const _updateRoomAsync = async (roomId: string, roomInfo: RoomInfoUpdate) => {
  if(roomId == "") return;
  await update(child(RoomsRef, roomId), roomInfo);
};

/**
 * ルームを削除し、ルームに関連付いたメンバー・アクション情報をすべて削除する
 * @param roomId ルームID
 * @returns dispatch用関数
 */
const _destroyRoomAsync = async (roomId: string) => {
  if(roomId == "") return;
  await set(child(RoomsRef, roomId), null);
  await set(child(MembersRef, roomId), null);
  await set(child(ActionsRef, roomId), null);
};

/**
 * メンバーの初期化をDBに送信する
 * @param roomId ルームID
 * @param user ユーザインスタンス
 * @param userState メンバー情報の初期値
 */
const _initMemberAsync = async (roomId: string, user: User, userState: UserState = {displayName: user.displayName, ready: false}) => {
  await _updateMemberAsync(roomId, user.id, userState);
};

/**
 * メンバーの更新をDBに送信する
 * @param roomId ルームID
 * @param id メンバーID（ユーザID）
 * @param userState メンバー情報
 * @returns dispatch用関数
 */
const _updateMemberAsync = async (roomId: string, id: string, userState: UserStateUpdate) => {
  if(roomId == "" || id == "") return;
  await update(child(MembersRef, `${roomId}/${id}`), userState);
};

/**
 * メンバーの削除をDBに送信する
 * @param roomId ルームID
 * @param id メンバーID（ユーザID）
 * @returns dispatch用関数
 */
const _removeMemberAsync = async (roomId: string, id: string) => {
  if(roomId == "" || id == "") return;
  await set(child(MembersRef, `${roomId}/${id}`), null);
};

/**
 * アクションの追加をDBに送信する
 * @param roomId ルームID
 * @param userAction アクション情報
 * @returns dispatch用関数
 */
const _addActionAsync = async (roomId: string, userAction: UserAction) => {
  if(roomId == "") return;
  await push(child(ActionsRef, roomId), userAction);
};

/**
 * アクションの更新をDBに送信する
 * @param roomId ルームID
 * @param id アクションID
 * @param userAction アクション情報
 * @returns dispatch用関数
 */
const _updateActionAsync = async (roomId: string, id: string, userAction: UserActionUpdate) => {
  if(roomId == "" || id == "") return;
  await update(child(ActionsRef, `${roomId}/${id}`), userAction);
};

/**
 * アクションの削除をDBに送信する
 * @param roomId ルームID
 * @param id アクションID
 * @returns dispatch用関数
 */
const _removeActionAsync = async (roomId: string, id: string) => {
  if(roomId == "" || id == "") return;
  await set(child(ActionsRef, `${roomId}/${id}`), null);
};