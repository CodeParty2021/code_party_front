import { child, get, push, set, update } from "firebase/database";
import { User } from "services/user/user";
import {
  ActionsRef,
  MembersRef,
  RoomInfo,
  RoomInfoUpdate,
  RoomsRef,
  UserAction,
  UserActionUpdate,
  UserState,
  UserStateUpdate,
} from "../RoomSync";

// ---- Realtime DBへのset・update・push・removeファンクション群 ----- //

export const getRoomAsync = async (roomId: string) => {
  if (roomId == "") return;

  //DBからGET
  const ss = await get(child(RoomsRef, roomId));
  const data = ss.val();

  //データが存在しない場合はundefined
  if (!data) return;

  return {
    name: data.name,
    host: data.host,
    state: data.state,
  } as RoomInfo;
};

export const pushRoomAsync = async (roomInfo: RoomInfo) => {
  const dbRef = await push(RoomsRef, roomInfo);
  return dbRef;
};

/**
 * ルーム情報を更新する
 * @param roomId ルームID
 * @param roomInfo ルーム情報
 * @returns dispatch用関数
 */
export const updateRoomAsync = async (
  roomId: string,
  roomInfo: RoomInfoUpdate
) => {
  if (roomId == "") return;
  await update(child(RoomsRef, roomId), roomInfo);
};

/**
 * ルームを削除し、ルームに関連付いたメンバー・アクション情報をすべて削除する
 * @param roomId ルームID
 * @returns dispatch用関数
 */
export const destroyRoomAsync = async (roomId: string) => {
  if (roomId == "") return;
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
export const initMemberAsync = async (
  roomId: string,
  user: User,
  userState: UserState = { displayName: user.displayName, ready: false }
) => {
  await updateMemberAsync(roomId, user.id, userState);
};

/**
 * メンバーの更新をDBに送信する
 * @param roomId ルームID
 * @param id メンバーID（ユーザID）
 * @param userState メンバー情報
 * @returns dispatch用関数
 */
export const updateMemberAsync = async (
  roomId: string,
  id: string,
  userState: UserStateUpdate
) => {
  if (roomId == "" || id == "") return;
  await update(child(MembersRef, `${roomId}/${id}`), userState);
};

/**
 * メンバーの削除をDBに送信する
 * @param roomId ルームID
 * @param id メンバーID（ユーザID）
 * @returns dispatch用関数
 */
export const removeMemberAsync = async (roomId: string, id: string) => {
  if (roomId == "" || id == "") return;
  await set(child(MembersRef, `${roomId}/${id}`), null);
};

/**
 * アクションの追加をDBに送信する
 * @param roomId ルームID
 * @param userAction アクション情報
 * @returns dispatch用関数
 */
export const addActionAsync = async (
  roomId: string,
  userAction: UserAction
) => {
  if (roomId == "") return;
  await push(child(ActionsRef, roomId), userAction);
};

/**
 * アクションの更新をDBに送信する
 * @param roomId ルームID
 * @param id アクションID
 * @param userAction アクション情報
 * @returns dispatch用関数
 */
export const updateActionAsync = async (
  roomId: string,
  id: string,
  userAction: UserActionUpdate
) => {
  if (roomId == "" || id == "") return;
  await update(child(ActionsRef, `${roomId}/${id}`), userAction);
};

/**
 * アクションの削除をDBに送信する
 * @param roomId ルームID
 * @param id アクションID
 * @returns dispatch用関数
 */
export const removeActionAsync = async (roomId: string, id: string) => {
  if (roomId == "" || id == "") return;
  await set(child(ActionsRef, `${roomId}/${id}`), null);
};
