import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ref, onChildAdded, Unsubscribe, onValue, Query, onChildChanged, onChildMoved, onChildRemoved, child, DataSnapshot } from "firebase/database";

import { db } from "firebase_config";

export const RootRef = ref(db, "/RoomApp");
export const RoomsRef = child(RootRef, "rooms");
export const MembersRef = child(RootRef, "members");
export const ActionsRef = child(RootRef, "actions");

/**
 * ルーム情報
 * DB上：Value Type
 */
export type RoomInfo = {
  name: string;
  host: string;
  state: "waiting" | "analyzing" | "watching";
};

/**
 * 参加しているユーザの状態
 * DB上：List Type
 */
export type UserState = {
  displayName: string;
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
type ValueReducerArg<T> = {
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
type ListReducerArg<T> = {
  id: string;
  data: T;
  previousChildName?: string | null;
};
/**
 * {@link ListReducerArg}をPayload化したもの
 */
type ListPayload<T> = PayloadAction<ListReducerArg<T>>;

// ---- 状態タイプ定義 ----//
type RoomPayload = ValuePayload<RoomInfo>;        // Room Payload
type UserStatePayload = ListPayload<UserState>;   // Member Payload
type UserActionPayload = ListPayload<UserAction>; // Action Payload

// ---- DBアップデート用タイプ ---- //
export type RoomInfoUpdate = Partial<RoomInfo>;     // Room Update
export type UserStateUpdate = Partial<UserState>;   // Member Update
export type UserActionUpdate = Partial<UserAction>; // Action Update

/**
 * 初期状態
 */
const initialState = {
  id: undefined,
  info: undefined,
  isEntered: false,
  members: {},
  sortedKeysOfMembers: [],
  actions: {},
  sortedKeysOfActions: [],
} as RoomState;

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
      state.sortedKeysOfMembers = _addChild(state.sortedKeysOfMembers, id, previousChildName);
    },
    updateMember: (state, action: UserStatePayload) => {
      const { id, data} = action.payload;
      state.members[id] = data;
    },
    moveMember: (state, action: UserStatePayload) => {
      const { id, data, previousChildName } = action.payload;
      state.members[id] = data;
      state.sortedKeysOfMembers = _moveChild(state.sortedKeysOfMembers, id, previousChildName);
    },
    removeMember: (state, action: PayloadAction<string>) => {
      state.sortedKeysOfMembers = _removeChild(state.sortedKeysOfMembers, action.payload);
      delete state.members[action.payload];
    },

    //actions
    addAction: (state, action: UserActionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.actions[id] = data;
      state.sortedKeysOfActions = _addChild(state.sortedKeysOfActions, id, previousChildName);
    },
    updateAction: (state, action: UserActionPayload) => {
      const { id, data } = action.payload;
      state.actions[id] = data;
    },
    moveAction: (state, action: UserActionPayload) => {
      const { id, data, previousChildName } = action.payload;
      state.actions[id] = data;
      state.sortedKeysOfActions = _moveChild(state.sortedKeysOfActions, id, previousChildName);
    },
    removeAction: (state, action: PayloadAction<string>) => {
      state.sortedKeysOfActions = _removeChild(state.sortedKeysOfActions, action.payload);
      delete state.actions[action.payload];
    },
  },
});

// ---- Stateのリスト用，挿入ソート関数群 ---- //

const _addChild = (sortedKeys: string[], key: string, previousKey?: string | null): string[] => {
  if(!sortedKeys || sortedKeys.length == 0) return [key];
  if(!previousKey) return [key, ...sortedKeys];

  const index = sortedKeys.indexOf(previousKey) + 1;
  return [...sortedKeys.slice(0, index), key, ...sortedKeys.slice(index)];
};

const _removeChild = (sortedKeys: string[], key: string) => {
  const index = sortedKeys.indexOf(key);
  return [...sortedKeys.slice(0, index), ...sortedKeys.slice(index + 1)];
};

const _moveChild = (sortedKeys: string[], key: string, previousKey?: string | null) : string[] => {
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

// ---- Realtime DBへのリスナーを設定する関数群 ---- //

/**
 * ルーム情報の同期を開始する
 * @param roomId ルームID
 * @returns dispatch関数
 */
export const startRoomDBSync = (roomId: string) => {
  return (dispatch: any) => {
    if(roomId == "") return;
    dispatch(_startValueDBSync("rooms", child(RoomsRef, roomId), enterRoom, exitRoom));
  };
};

/**
 * ルーム情報の同期を終了する
 * @returns dispatch関数
 */
export const stopRoomDBSync = () => {
  return (dispatch: any) => {
    dispatch(_stopValueDBSync("rooms"));
  };
};

/**
 * メンバーリストの同期を開始する
 * @param roomId ルームID
 * @returns dispatch用関数
 */
export const startMembersDBSync = (roomId: string) => {
  return (dispatch: any) => {
    if(roomId == "") return;
    dispatch(_startListDBSync("members", child(MembersRef, roomId), addMember, updateMember, moveMember, removeMember));
  };
};

/**
 * メンバーリストの同期を停止する
 * @returns dispatch用関数
 */
export const stopMembersDBSync = () => {
  return (dispatch: any) => {
    dispatch(_stopListDBSync("members"));
  };
};

/**
 * アクションリストの同期を開始する
 * @param roomId ルームID
 * @returns dispatch用関数
 */
export const startActionsDBSync = (roomId: string) => {
  return (dispatch: any) => {
    if(roomId == "") return;
    dispatch(_startListDBSync("actions", child(ActionsRef, roomId), addAction, updateAction, moveAction, removeAction));
  };
};

/**
 * アクションリストの同期を停止する
 * @returns dispatch用関数
 */
export const stopActionsDBSync = () => {
  return (dispatch: any) => {
    dispatch(_stopListDBSync("actions"));
  };
};

// ---- Value Typeのリスナーを設定する関数群 ---- //

type _valueReducerFunc = ActionCreatorWithPayload<ListReducerArg<any>>;
type _valueRemoveReducerFunc = ActionCreatorWithoutPayload;

/**
 * 単一データの同期をcallbackKeyに紐づけて開始する
 * @param callbackKey コールバックキー
 * @param syncRef 同期先参照
 * @param reducerFunc 変更適用Reducer
 * @param removeReducerFunc 削除Reducer
 * @returns dispatch用関数
 */
const _startValueDBSync = (callbackKey: string, syncRef: Query, reducerFunc: _valueReducerFunc, removeReducerFunc?: _valueRemoveReducerFunc) => {
  return (dispatch: any) => {
    _setCallBackToSyncSingleData(
      callbackKey,
      syncRef,
      (ss: DataSnapshot) => {
        const data = ss.val();
        if(data && ss.key){
          const roomData = {
            id: ss.key,
            data: {...data},
          };
          dispatch(reducerFunc(roomData));
        } else {
          if(removeReducerFunc) dispatch(removeReducerFunc());
        }
      }
    );
  };
};

const _stopValueDBSync = (callbackKey: string) => {
  return () => {
    _unsubscribeCallBackToSyncSingleData(callbackKey);
  };
};

// ---- List Typeのリスナーを設定する関数群 ---- //

type _listReducerFunc = ActionCreatorWithPayload<ListReducerArg<any>, string>;
type _listRemoveReducerFunc = ActionCreatorWithPayload<string, string>;

/**
 * リストデータの同期をcallbackKeyに紐づけて開始する
 * @param callbackKey コールバックキー
 * @param syncRef 同期先参照
 * @param addedFunc child追加Reducer
 * @param updatedFunc child更新Reducer
 * @param movedFunc child移動Reducer
 * @param removedFunc child追加Reducer
 * @returns dispatch用関数
 */
const _startListDBSync = (callbackKey: string, syncRef: Query, addedFunc: _listReducerFunc, updatedFunc: _listReducerFunc, movedFunc: _listReducerFunc, removedFunc: _listRemoveReducerFunc) => {
  return (dispatch: any) => {
    _setCallBackToSyncListData(
      callbackKey,
      syncRef,
      // childAddedCB
      (ss: DataSnapshot, previousChildName?: string | null) => {
        const data = ss.val();
        if(data && ss.key){
          dispatch(addedFunc({
            id: ss.key,
            data: {...data},
            previousChildName: previousChildName,
          }));
        }
      },
      // childchangedCB
      (ss: DataSnapshot) => {
        const data = ss.val();
        if(data && ss.key){
          dispatch(updatedFunc({
            id: ss.key,
            data: {...data},
          }));
        }
      },
      // childMovedCB
      (ss: DataSnapshot, previousChildName?: string | null) => {
        const data = ss.val();
        if(data && ss.key){
          dispatch(movedFunc({
            id: ss.key,
            data: {...data},
            previousChildName: previousChildName,
          }));
        }
      },
      // childRemovedCB
      (ss: DataSnapshot) => {
        const data = ss.val();
        if(data && ss.key){
          dispatch(removedFunc(ss.key));
        }
      },
    );
  };
};

/**
 * 指定したcallbackKeyに設定したリストデータの同期を停止する
 * @param callbackKey コールバックキー
 * @returns dispatch用関数
 */
const _stopListDBSync = (callbackKey: string) => {
  return () => {
    _unsubscribeCallBackToSyncListData(callbackKey);
  };
};

/**
 * 単一データを監視するコールバックを設定
 * @param callbackKey コールバックキー
 * @param query データベースクエリ
 * @param valueCB コールバック関数
 */
const _setCallBackToSyncSingleData = (callbackKey: string, query: Query, valueCB: any) => {
  _setCallBack(callbackKey, query, onValue, valueCB);
};

/**
 * 単一データを監視しているコールバックを削除
 * @param callbackKey コールバックキー
 */
const _unsubscribeCallBackToSyncSingleData = (callbackKey: string) => {
  _unsubscribe(callbackKey);
};

/**
 * リストデータを監視するコールバックを設定
 * @param query データベースクエリ
 * @param childAddedCB 追加時のコールバック関数
 * @param childChangedCB 更新時のコールバック関数
 * @param childMovedCB 移動時のコールバック関数
 * @param childRemovedCB 削除時のコールバック関数
 */
const _setCallBackToSyncListData = (callbackKey: string, query: Query, childAddedCB?: any, childChangedCB?: any, childMovedCB?: any, childRemovedCB?: any) => {
  if(childAddedCB) _setCallBack(callbackKey + "/added", query, onChildAdded, childAddedCB);
  if(childChangedCB) _setCallBack(callbackKey + "/changed", query, onChildChanged, childChangedCB);
  if(childMovedCB) _setCallBack(callbackKey + "/moved", query, onChildMoved, childMovedCB);
  if(childRemovedCB) _setCallBack(callbackKey + "/removed", query, onChildRemoved, childRemovedCB);
};

/**
 * リストデータを監視しているコールバックを全て削除
 * @param callbackKey コールバックキー
 */
const _unsubscribeCallBackToSyncListData = (callbackKey: string) => {
  _unsubscribe(callbackKey + "/added");
  _unsubscribe(callbackKey + "/changed");
  _unsubscribe(callbackKey + "/moved");
  _unsubscribe(callbackKey + "/removed");
};

/**
 * コールバック削除関数リスト
 */
const unsbscribes: { [key: string]: Unsubscribe } = {};

type listenerSetFunc = typeof onChildAdded | typeof onChildChanged | typeof onChildMoved | typeof onChildRemoved;

/**
 * 指定したcallbackKeyにコールバックを設定
 * @param callbackKey コールバックの保存キー
 * @param query データベースクエリ
 * @param setCBFunc コールバック設定関数
 * @param callback コールバック関数
 */
const _setCallBack = (callbackKey: string, query: Query, setCBFunc: listenerSetFunc, callback: any) => {
  if(callbackKey in unsbscribes) {
    unsbscribes[callbackKey]();
  }
  unsbscribes[callbackKey] = setCBFunc(query, callback);
};

/**
 * 指定したQuery・EventTypeのコールバックを削除
 * @param callbackKey コールバックの保存キー
 */
const _unsubscribe = (callbackKey: string) => {
  if(callbackKey in unsbscribes) {
    unsbscribes[callbackKey]();
    delete unsbscribes[callbackKey];
  }
};

export default roomSlice.reducer;
