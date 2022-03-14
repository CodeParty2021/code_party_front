import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import {
  child,
  DatabaseReference,
  DataSnapshot,
  onChildAdded,
  onChildChanged,
  onChildMoved,
  onChildRemoved,
  onDisconnect,
  onValue,
  Query,
  Unsubscribe,
} from "firebase/database";
import {
  ActionsRef,
  addAction,
  addMember,
  enterRoom,
  exitRoom,
  ListReducerArg,
  MembersRef,
  moveAction,
  moveMember,
  removeAction,
  removeMember,
  RoomsRef,
  ThunkResult,
  updateAction,
  updateMember,
  UserState,
  UserStateUpdate,
  ValueReducerArg,
} from "../RoomSync";

// ---- Realtime DBへのリスナーを設定する関数群 ---- //

/**
 * ルーム情報の同期を開始する
 * @param roomId ルームID
 * @returns dispatch関数
 */
export const startRoomDBSync = (roomId: string): ThunkResult => {
  return (dispatch: any) => {
    if (roomId == "") return;
    dispatch(
      _startValueDBSync("rooms", child(RoomsRef(), roomId), enterRoom, exitRoom)
    );
  };
};

/**
 * ルーム情報の同期を終了する
 * @returns dispatch関数
 */
export const stopRoomDBSync = (): ThunkResult => {
  return (dispatch: any) => {
    dispatch(_stopValueDBSync("rooms"));
  };
};

/**
 * メンバーリストの同期を開始する
 * @param roomId ルームID
 * @returns dispatch用関数
 */
export const startMembersDBSync = (roomId: string): ThunkResult => {
  return (dispatch: any) => {
    if (roomId == "") return;
    dispatch(
      _startListDBSync(
        "members",
        child(MembersRef(), roomId),
        addMember,
        updateMember,
        moveMember,
        removeMember
      )
    );
  };
};

/**
 * メンバーリストの同期を停止する
 * @returns dispatch用関数
 */
export const stopMembersDBSync = (): ThunkResult => {
  return (dispatch: any) => {
    dispatch(_stopListDBSync("members"));
  };
};

/**
 * 接続切断時にユーザ状態をセットする
 * @param roomId ルームID
 * @param userId ユーザID
 * @param value セットするユーザ状態
 * @returns なし
 */
export const setUserStateOnDisconnect = async (roomId: string, userId: string, value: UserState) => {
  if(userId == "") return;
  await _setValueOnDisconnect(child(MembersRef(), `${roomId}/${userId}`), value);
};

/**
 * 接続切断時にユーザ状態を更新する
 * @param roomId ルームID
 * @param userId ユーザID
 * @param value 更新するユーザ状態
 * @returns なし
 */
export const updateUserStateOnDisconnect = async (roomId: string, userId: string, value: UserStateUpdate) => {
  if(userId == "") return;
  await _updateOnDisconnect(child(MembersRef(), `${roomId}/${userId}`), value);
};

/**
 * 接続切断時にユーザ状態を削除する
 * @param roomId ルームID
 * @param userId ユーザID
 * @returns なし
 */
export const removeUserStateOnDisconnect = async (roomId: string, userId: string) => {
  if(userId == "") return;
  await _removeOnDisconnect(child(MembersRef(), `${roomId}/${userId}`));
};

/**
 * 接続切断時に優先度を使用してユーザ状態をセットする
 * @param roomId ルームID
 * @param userId ユーザID
 * @param value 設定するユーザ状態
 * @param priority 優先度
 * @returns なし
 */
export const setUserStateWithPriorityOnDisconnect = async (roomId: string, userId: string, value: UserState, priority: string | number | null) => {
  if(userId == "") return;
  await _setWithPriorityOnDisconnect(child(MembersRef(), `${roomId}/${userId}`), value, priority);
};

/**
 * 接続切断時にユーザ状態を変化させるリスナーを全て削除する
 * @param roomId ルームID
 * @param userId ユーザID
 * @returns なし
 */
export const cancelUserStateOnDisconnect = async (roomId: string, userId: string, ) => {
  if(userId == "") return;
  await _cancelOnDisconnect(child(MembersRef(), `${roomId}/${userId}`));
};

/**
 * アクションリストの同期を開始する
 * @param roomId ルームID
 * @returns dispatch用関数
 */
export const startActionsDBSync = (roomId: string): ThunkResult => {
  return (dispatch: any) => {
    if (roomId == "") return;
    dispatch(
      _startListDBSync(
        "actions",
        child(ActionsRef(), roomId),
        addAction,
        updateAction,
        moveAction,
        removeAction
      )
    );
  };
};

/**
 * アクションリストの同期を停止する
 * @returns dispatch用関数
 */
export const stopActionsDBSync = (): ThunkResult => {
  return (dispatch: any) => {
    dispatch(_stopListDBSync("actions"));
  };
};

// ---- Value Typeのリスナーを設定する関数群 ---- //

type _valueReducerFunc = ActionCreatorWithPayload<ValueReducerArg<any>>;
type _valueRemoveReducerFunc = ActionCreatorWithoutPayload;

/**
 * 単一データの同期をcallbackKeyに紐づけて開始する
 * @param callbackKey コールバックキー
 * @param syncRef 同期先参照
 * @param reducerFunc 変更適用Reducer
 * @param removeReducerFunc 削除Reducer
 * @returns dispatch用関数
 */
const _startValueDBSync = (
  callbackKey: string,
  syncRef: Query,
  reducerFunc: _valueReducerFunc,
  removeReducerFunc?: _valueRemoveReducerFunc
): ThunkResult => {
  return (dispatch: any) => {
    _setCallBackToSyncSingleData(callbackKey, syncRef, (ss: DataSnapshot) => {
      const data = ss.val();
      if (data && ss.key) {
        const roomData = {
          id: ss.key,
          data: { ...data },
        };
        dispatch(reducerFunc(roomData));
      } else {
        if (removeReducerFunc) dispatch(removeReducerFunc());
      }
    });
  };
};

const _stopValueDBSync = (callbackKey: string): ThunkResult => {
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
const _startListDBSync = (
  callbackKey: string,
  syncRef: Query,
  addedFunc: _listReducerFunc,
  updatedFunc: _listReducerFunc,
  movedFunc: _listReducerFunc,
  removedFunc: _listRemoveReducerFunc
): ThunkResult => {
  return (dispatch: any) => {
    _setCallBackToSyncListData(
      callbackKey,
      syncRef,
      // childAddedCB
      (ss: DataSnapshot, previousChildName?: string | null) => {
        const data = ss.val();
        if (data && ss.key) {
          dispatch(
            addedFunc({
              id: ss.key,
              data: { ...data },
              previousChildName: previousChildName,
            })
          );
        }
      },
      // childchangedCB
      (ss: DataSnapshot) => {
        const data = ss.val();
        if (data && ss.key) {
          dispatch(
            updatedFunc({
              id: ss.key,
              data: { ...data },
            })
          );
        }
      },
      // childMovedCB
      (ss: DataSnapshot, previousChildName?: string | null) => {
        const data = ss.val();
        if (data && ss.key) {
          dispatch(
            movedFunc({
              id: ss.key,
              data: { ...data },
              previousChildName: previousChildName,
            })
          );
        }
      },
      // childRemovedCB
      (ss: DataSnapshot) => {
        const data = ss.val();
        if (data && ss.key) {
          dispatch(removedFunc(ss.key));
        }
      }
    );
  };
};

/**
 * 指定したcallbackKeyに設定したリストデータの同期を停止する
 * @param callbackKey コールバックキー
 * @returns dispatch用関数
 */
const _stopListDBSync = (callbackKey: string): ThunkResult => {
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
const _setCallBackToSyncSingleData = (
  callbackKey: string,
  query: Query,
  valueCB: any
) => {
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
 * @param callbackKey コールバックキー
 * @param query データベースクエリ
 * @param childAddedCB 追加時のコールバック関数
 * @param childChangedCB 更新時のコールバック関数
 * @param childMovedCB 移動時のコールバック関数
 * @param childRemovedCB 削除時のコールバック関数
 */
const _setCallBackToSyncListData = (
  callbackKey: string,
  query: Query,
  childAddedCB?: any,
  childChangedCB?: any,
  childMovedCB?: any,
  childRemovedCB?: any
) => {
  if (childAddedCB)
    _setCallBack(callbackKey + "/added", query, onChildAdded, childAddedCB);
  if (childChangedCB)
    _setCallBack(
      callbackKey + "/changed",
      query,
      onChildChanged,
      childChangedCB
    );
  if (childMovedCB)
    _setCallBack(callbackKey + "/moved", query, onChildMoved, childMovedCB);
  if (childRemovedCB)
    _setCallBack(
      callbackKey + "/removed",
      query,
      onChildRemoved,
      childRemovedCB
    );
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

const _setValueOnDisconnect = async (ref: DatabaseReference, value: any) => {
  await onDisconnect(ref).set(value);
};

const _updateOnDisconnect = async (ref: DatabaseReference, value: any) => {
  await onDisconnect(ref).update(value);
};

const _removeOnDisconnect = async (ref: DatabaseReference) => {
  await onDisconnect(ref).remove();
};

const _setWithPriorityOnDisconnect = async (ref: DatabaseReference, value: any, priority: string | number | null) => {
  await onDisconnect(ref).setWithPriority(value, priority);
};

const _cancelOnDisconnect = async (ref: DatabaseReference) => {
  await onDisconnect(ref).cancel();
};

/**
 * コールバック削除関数リスト
 */
const unsubscribes: { [key: string]: Unsubscribe } = {};

type listenerSetFunc =
  | typeof onChildAdded
  | typeof onChildChanged
  | typeof onChildMoved
  | typeof onChildRemoved
  | typeof onValue;

/**
 * 指定したcallbackKeyにコールバックを設定
 * @param callbackKey コールバックの保存キー
 * @param query データベースクエリ
 * @param setCBFunc コールバック設定関数
 * @param callback コールバック関数
 */
const _setCallBack = (
  callbackKey: string,
  query: Query,
  setCBFunc: listenerSetFunc,
  callback: any
) => {
  if (callbackKey in unsubscribes) {
    unsubscribes[callbackKey]();
  }
  unsubscribes[callbackKey] = setCBFunc(query, callback);
};

/**
 * 指定したQuery・EventTypeのコールバックを削除
 * @param callbackKey コールバックの保存キー
 */
const _unsubscribe = (callbackKey: string) => {
  if (callbackKey in unsubscribes) {
    unsubscribes[callbackKey]();
    delete unsubscribes[callbackKey];
  }
};
