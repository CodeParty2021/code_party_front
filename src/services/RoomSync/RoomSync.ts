import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ref, child, getDatabase } from "firebase/database";
import { AnyAction } from "redux";
import "firebase_config";
import { ThunkAction } from "redux-thunk";

import { RootState } from "store";

export const RootRef = () => ref(getDatabase(), "/RoomApp");
export const RoomsRef = () => child(RootRef(), "rooms");
export const MembersRef = () => child(RootRef(), "members");
export const ActionsRef = () => child(RootRef(), "actions");

/**
 * ルーム情報
 * DB上：Value Type
 */
export type RoomInfo = {
  name: string;
  host: string;
  /**
   * - waiting: 待機画面に居る
   * - watching: GameWatching画面にいる
   * - result: GameWatching画面で結果を表示している
   */
  status: "waiting" | "watching";
  analyzingResult?: {
    resultId?: string;
    error?: string;
  };
};

/**
 * 参加しているユーザの状態
 * DB上：List Type
 */
export type UserState = {
  displayName: string;
  /**
   * - waiting: 待機画面に居る
   * - watching: GameWatching画面にいる
   * - disconnect: 接続が切れた
   */
  status: "waiting" | "watching" | "disconnect" | "kicking";
  /**
   * 選択したコードのID
   */
  codeId?: string;
  //for CasualBattle/WaitingRoom
  ready: boolean;
};

/**
 * ユーザアクション
 * DB上：List Type
 */
export type UserAction = {
  userId: string;
  actionId: number;
};

/**
 * RoomのRootState
 */
export type RoomState = {
  id?: string;
  isEntered: boolean;
  info?: RoomInfo;
  members: { [id: string]: UserState };
  sortedKeysOfMembers: string[];
  actions: { [id: string]: UserAction };
  sortedKeysOfActions: string[];
};

// ---- Valueタイプ（DB上でオブジェクトで保存されているタイプ） ---- //
/**
 * ValueタイプのデータがReducerに渡されるときの引数
 */
export type ValueReducerArg<T> = {
  id: string;
  data: T;
};
/**
 * {@link ValueReducerArg}をPayload化したもの
 */
type ValuePayload<T> = PayloadAction<ValueReducerArg<T>>;

// ---- Listタイプ（DB上でリストで保存されているタイプ） ---- //
/**
 * ListタイプのデータがReducerに渡されるときの引数
 * (Removeを除く)
 */
export type ListReducerArg<T> = {
  id: string;
  data: T;
  previousChildName?: string | null;
};
/**
 * {@link ListReducerArg}をPayload化したもの
 */
type ListPayload<T> = PayloadAction<ListReducerArg<T>>;

// ---- 状態タイプ定義 ----//
type RoomPayload = ValuePayload<RoomInfo>; // Room Payload
type UserStatePayload = ListPayload<UserState>; // Member Payload
type UserActionPayload = ListPayload<UserAction>; // Action Payload

// ---- DBアップデート用タイプ ---- //
// null：値を削除，undefined：更新しない
type nullable<T> = {
  [P in keyof T]?: T[P] | undefined | null;
};
export type RoomInfoUpdate = nullable<RoomInfo>; // Room Update
export type UserStateUpdate = nullable<UserState>; // Member Update
export type UserActionUpdate = nullable<UserAction>; // Action Update

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;
// export type ThunkResult = (
//   dispatch: Dispatch<any>,
//   getState: () => RootState
// ) => Promise<any> | any;

/**
 * 初期状態
 */
const initialState: RoomState = {
  id: undefined,
  info: undefined,
  isEntered: false,
  members: {},
  sortedKeysOfMembers: [],
  actions: {},
  sortedKeysOfActions: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState: { ...initialState } as RoomState,
  reducers: {
    // room
    enterRoom: (state, action: RoomPayload) => {
      state.id = action.payload.id;
      state.info = action.payload.data;
      state.isEntered = true;
    },
    exitRoom: (state) => {
      Object.assign(state, initialState);
    },

    //members
    addMember: (state, action: UserStatePayload) => {
      const { id, data, previousChildName } = action.payload;
      state.members[id] = data;
      state.sortedKeysOfMembers = _addChild(
        state.sortedKeysOfMembers,
        id,
        previousChildName
      );
    },
    updateMember: (state, action: UserStatePayload) => {
      const { id, data } = action.payload;
      state.members[id] = data;
    },
    moveMember: (state, action: UserStatePayload) => {
      const { id, data, previousChildName } = action.payload;
      state.members[id] = data;
      state.sortedKeysOfMembers = _moveChild(
        state.sortedKeysOfMembers,
        id,
        previousChildName
      );
    },
    removeMember: (state, action: PayloadAction<string>) => {
      state.sortedKeysOfMembers = _removeChild(
        state.sortedKeysOfMembers,
        action.payload
      );
      delete state.members[action.payload];
    },

    //actions
    addAction: (state, action: UserActionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.actions[id] = data;
      state.sortedKeysOfActions = _addChild(
        state.sortedKeysOfActions,
        id,
        previousChildName
      );
    },
    updateAction: (state, action: UserActionPayload) => {
      const { id, data } = action.payload;
      state.actions[id] = data;
    },
    moveAction: (state, action: UserActionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.actions[id] = data;
      state.sortedKeysOfActions = _moveChild(
        state.sortedKeysOfActions,
        id,
        previousChildName
      );
    },
    removeAction: (state, action: PayloadAction<string>) => {
      state.sortedKeysOfActions = _removeChild(
        state.sortedKeysOfActions,
        action.payload
      );
      delete state.actions[action.payload];
    },
  },
});

// ---- Stateのリスト用，挿入ソート関数群 ---- //

const _addChild = (
  sortedKeys: string[],
  key: string,
  previousKey?: string | null
): string[] => {
  if (!sortedKeys || sortedKeys.length == 0) return [key];
  if (!previousKey) return [key, ...sortedKeys];

  const index = sortedKeys.indexOf(previousKey) + 1;
  return [...sortedKeys.slice(0, index), key, ...sortedKeys.slice(index)];
};

const _removeChild = (sortedKeys: string[], key: string) => {
  const index = sortedKeys.indexOf(key);
  return [...sortedKeys.slice(0, index), ...sortedKeys.slice(index + 1)];
};

const _moveChild = (
  sortedKeys: string[],
  key: string,
  previousKey?: string | null
): string[] => {
  return _addChild(_removeChild(sortedKeys, key), key, previousKey);
};

export const {
  enterRoom,
  exitRoom,
  addMember,
  updateMember,
  moveMember,
  removeMember,
  addAction,
  updateAction,
  moveAction,
  removeAction,
} = roomSlice.actions;

export default roomSlice.reducer;
