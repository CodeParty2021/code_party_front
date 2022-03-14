import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  RoomState,
  UserStateUpdate,
  UserAction,
  UserActionUpdate,
  ThunkResult,
  RoomInfo,
  exitRoom,
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
  startActionsDBSync,
  startMembersDBSync,
  startRoomDBSync,
  stopActionsDBSync,
  stopMembersDBSync,
  stopRoomDBSync,
} from "services/RoomSync/DBListener/DBListener";
import { User } from "services/user/user";
import { RootState } from "store";

export const useRoomSync = () => {
  const room = useSelector((state: RootState) => state.room);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return {
    room: room,
    isHost: useMemo(() => isHost(room, user), [room, user]),
    createRoom: () => {
      if (user) dispatch(createRoomAsync("blank", user));
    },
    enterRoom: (roomId: string) => {
      if (user) dispatch(enterRoomAsync(roomId, user));
    },
    exitRoom: () => {
      if (room.id && user) {
        if (isHost(room, user)) {
          dispatch(exitRoomAsHostAsync(user.id));
        } else {
          dispatch(exitRoomAsync(user.id));
        }
      }
    },
    updateMember: (data: UserStateUpdate) => {
      if (room.id && user) updateMemberAsync(room.id, user.id, data);
    },
    addAction: (data: UserAction) => {
      if (room.id) addActionAsync(room.id, data);
    },
    updateAction: (id: string, data: UserActionUpdate) => {
      if (room.id) updateActionAsync(room.id, id, data);
    },
    removeAction: (id: string) => {
      if (room.id) removeActionAsync(room.id, id);
    },
  };
};

/**
 * ユーザがホストか判定
 * @param room ルーム
 * @param user ユーザ
 * @returns true: ホストである，false: ホストでない
 */
export const isHost = (room: RoomState, user?: User | null) => {
  return room.info && user && room.info.host == user.id ? true : false;
};

/**
 * ルームを作成する
 * @param roomName ルーム名
 * @param user ホストユーザ
 * @returns dispatch用関数
 */
export const createRoomAsync = (roomName: string, user: User): ThunkResult => {
  return async (dispatch) => {
    const roomInfo: RoomInfo = {
      name: roomName,
      host: user.id,
      state: "waiting",
    };
    const dbRef = await pushRoomAsync(roomInfo);
    const key = dbRef.key;
    if (key) {
      dispatch(_enterRoomAsync(key, user));
    }
  };
};

/**
 * ルームに入る
 * @param roomId ルームID
 * @param user ルームに入るユーザ
 * @returns dispatch用関数
 */
export const enterRoomAsync = (roomId: string, user: User): ThunkResult => {
  return async (dispatch: any) => {
    if (roomId == "") return;
    const data = await getRoomAsync(roomId);
    //部屋が存在したら入室処理
    if (data) {
      dispatch(_enterRoomAsync(roomId, user));
    }
  };
};

const _enterRoomAsync = (roomId: string, user: User): ThunkResult => {
  return async (dispatch: any) => {
    initMemberAsync(roomId, user);
    dispatch(startRoomDBSync(roomId));
    dispatch(startMembersDBSync(roomId));
    dispatch(startActionsDBSync(roomId));
  };
};

/**
 * ルームから退出する
 * ユーザがホストの場合は{@link exitRoomAsHostAsync}を使用
 * @param roomId ルームID
 * @param userId 退出するユーザID
 * @returns dispatch用関数
 */
export const exitRoomAsync = (userId: string): ThunkResult => {
  return async (dispatch: any, getState: any) => {
    const roomId = getState().room.id;
    await removeMemberAsync(roomId, userId);
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
export const exitRoomAsHostAsync = (userId: string): ThunkResult => {
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
