import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  UserStateUpdate,
  UserAction,
  UserActionUpdate,
  ThunkResult,
  RoomInfo,
  exitRoom,
  RoomInfoUpdate,
} from "services/RoomSync/RoomSync";
import {
  addActionAsync,
  destroyRoomAsync,
  getRoomAsync,
  initMemberAsync,
  pushRoomAsync,
  removeActionAsync,
  removeMemberAsync,
  updateActionAsync,
  updateMemberAsync,
  updateRoomAsync,
} from "services/RoomSync/DBOperator/DBOperator";
import {
  cancelUserStateOnDisconnect,
  startActionsDBSync,
  startMembersDBSync,
  startRoomDBSync,
  stopActionsDBSync,
  stopMembersDBSync,
  stopRoomDBSync,
  updateUserStateOnDisconnect,
} from "services/RoomSync/DBListener/DBListener";
import { User } from "services/user/user";
import { RootState } from "store";

export const useRoomSync = () => {
  const room = useSelector((state: RootState) => state.room);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return {
    /**
     * ルーム情報
     */
    room: room,
    /**
     * ログインユーザがルームのホストかどうか
     */
    isHost: useMemo(() => isHost(room.info, user), [room.info, user]),
    /**
     * ログインユーザをホストとしてルームを作成する
     */
    createRoom: async () => {
      if (user) await dispatch(createRoomAsync("blank", user));
    },
    /**
     * ルームを検索して可能であればルームに入室する
     * @param roomId ルームID
     */
    enterRoom: async (roomId: string) => {
      if (user) await dispatch(enterRoomAsync(roomId, user));
    },
    /**
     * 入室中のルームから退室する
     */
    exitRoom: async () => {
      if (room.id && user) {
        if (isHost(room.info, user)) {
          await dispatch(exitRoomAsHostAsync(user.id));
        } else {
          await dispatch(exitRoomAsync(user.id));
        }
      }
    },
    /**
     * 入室中のルーム情報を更新する
     * @param data ルーム情報
     */
    updateRoomInfo: async (data: RoomInfoUpdate) => {
      if (room.id) await updateRoomAsync(room.id, data);
    },
    /**
     * 入室中のルームでのユーザ情報を更新する
     * @param data ユーザ情報
     */
    updateMember: async (data: UserStateUpdate) => {
      if (room.id && user) await updateMemberAsync(room.id, user.id, data);
    },
    /**
     * 入室中のルームでアクションを起こす
     * @param data アクション情報
     */
    addAction: async (data: UserAction) => {
      if (room.id) await addActionAsync(room.id, data);
    },
    /**
     * 入室中のルームで起こしたアクション情報を更新する
     * @param id アクションID
     * @param data アクション情報
     */
    updateAction: async (id: string, data: UserActionUpdate) => {
      if (room.id) await updateActionAsync(room.id, id, data);
    },
    /**
     * 入室中のルームで起こしたアクションを取り消す
     * @param id アクションID
     */
    removeAction: async (id: string) => {
      if (room.id) await removeActionAsync(room.id, id);
    },
  };
};

/**
 * ユーザがホストか判定
 * @param roomInfo ルーム情報
 * @param user ユーザ
 * @returns true: ホストである，false: ホストでない
 */
export const isHost = (roomInfo?: RoomInfo, user?: User | null) => {
  return roomInfo && user && roomInfo.host == user.id ? true : false;
};

/**
 * ルームを作成する
 * @param roomName ルーム名
 * @param user ホストユーザ
 * @returns dispatch用関数
 */
export const createRoomAsync = (
  roomName: string,
  user: User
): ThunkResult<void> => {
  return async (dispatch) => {
    const roomInfo: RoomInfo = {
      name: roomName,
      host: user.id,
      status: "waiting",
    };
    const dbRef = await pushRoomAsync(roomInfo);
    const key = dbRef.key;
    if (key) {
      await dispatch(_enterRoomAsync(key, user));
    }
  };
};

/**
 * ルームに入れるか確認してからルームに入る
 * @param roomId ルームID
 * @param user ルームに入るユーザ
 * @returns dispatch用関数
 */
export const enterRoomAsync = (
  roomId: string,
  user: User
): ThunkResult<void> => {
  return async (dispatch: any) => {
    if (roomId == "") return;
    const data = await getRoomAsync(roomId);
    //ルームが存在したら入室処理
    if (data) {
      dispatch(_enterRoomAsync(roomId, user));
    }
  };
};

/**
 * ルームに入る
 * @param roomId ルームID
 * @param user ユーザ情報
 * @returns dispatch用関数
 */
const _enterRoomAsync = (roomId: string, user: User): ThunkResult<void> => {
  return async (dispatch: any) => {
    await initMemberAsync(roomId, user);
    await updateUserStateOnDisconnect(roomId, user.id, {
      status: "disconnect",
    });
    await dispatch(startRoomDBSync(roomId));
    await dispatch(startMembersDBSync(roomId));
    await dispatch(startActionsDBSync(roomId));
  };
};

/**
 * ルームから退出する
 * ユーザがホストの場合は{@link exitRoomAsHostAsync}を使用
 * @param userId 退出するユーザID
 * @returns dispatch用関数
 */
export const exitRoomAsync = (userId: string): ThunkResult<void> => {
  return async (dispatch: any, getState: any) => {
    const roomId = getState().room.id;
    await removeMemberAsync(roomId, userId);
    await cancelUserStateOnDisconnect(roomId, userId);
    dispatch(stopRoomDBSync());
    dispatch(stopMembersDBSync());
    dispatch(stopActionsDBSync());
    dispatch(exitRoom());
  };
};

/**
 * 自分がホストでルームから退出する
 * @param userId 退出するユーザID（ホストID）
 * @param memberKeys メンバーIDリスト
 * @returns dispatch用関数
 */
export const exitRoomAsHostAsync = (userId: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    const room = getState().room;
    const roomId = room.id;
    const memberKeys = room.sortedKeysOfMembers;
    if (roomId) {
      moveHostNextAsync(roomId, userId, memberKeys);
      dispatch(exitRoomAsync(userId));
      if (memberKeys.length <= 1) destroyRoomAsync(roomId);
    }
  };
};

/**
 * ホストを次の人に委譲する
 * @param roomId ルームID
 * @param userId ホストID
 * @param memberKeys メンバーIDリスト
 */
export const moveHostNextAsync = async (
  roomId: string,
  hostId: string,
  memberKeys: string[]
) => {
  if (memberKeys && memberKeys.length >= 2) {
    const idx = memberKeys?.indexOf(hostId);
    await moveHostAsync(roomId, memberKeys[(idx + 1) % memberKeys.length]);
  }
};

/**
 * 指定されたユーザにホストを変更する
 * @param roomId ルームID
 * @param newHostId 新ホストID
 */
export const moveHostAsync = async (roomId: string, newHostId: string) => {
  await updateRoomAsync(roomId, {
    host: newHostId,
  });
};
