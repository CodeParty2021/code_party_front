import { child, get, push, set, update } from "firebase/database";
import { User } from "services/user/user";
import { removeUndefinedFromObject } from "utils/RemoveUndefinedFromObject";
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

/**
 * ルーム情報を取得する
 * @param roomId ルームID
 * @returns ルーム情報
 */
export const getRoomAsync = async (roomId: string) => {
  if (roomId == "") return;

  //DBからGET
  const ss = await get(child(RoomsRef(), roomId));
  const data = ss.val();

  //データが存在しない場合はundefined
  if (!data) return;

  //ルーム情報にキャスト
  const roomInfo: RoomInfo = {
    name: data.name,
    host: data.host,
    status: data.status,
    analyzingResult: data.analyzingResult,
  };

  //チェック
  if (!roomInfo.name || !roomInfo.host || !roomInfo.status) return;

  return roomInfo;
};

/**
 * メンバー情報を取得する
 * @param roomId ルームID
 * @param memberId メンバーID
 * @returns メンバー情報
 */
export const getMemberAsync = async (roomId: string, memberId: string) => {
  if (roomId == "" || memberId == "") return;

  //DBからGET
  const ss = await get(child(child(MembersRef(), roomId), memberId));
  const data = ss.val();

  //データが存在しない場合はundefined
  if (!data) return;

  //メンバー情報にキャスト
  const member: UserState = {
    displayName: data.displayName,
    picture: data.picture,
    ready: data.ready,
    status: data.status,
    codeId: data.codeId,
  };

  //チェック
  if (
    member.displayName === undefined ||
    // pictureはundefined許容
    member.ready === undefined ||
    member.status === undefined
    // codeIdはundefined許容
  )
    return;

  return member;
};

/**
 * ルーム情報を追加する
 * @param roomInfo ルーム情報
 * @returns DB上のルームへの参照
 */
export const pushRoomAsync = async (roomInfo: RoomInfo) => {
  const dbRef = await push(RoomsRef(), roomInfo);
  return dbRef;
};

/**
 * ルーム情報を更新する
 * @param roomId ルームID
 * @param roomInfo ルーム情報
 */
export const updateRoomAsync = async (
  roomId: string,
  roomInfo: RoomInfoUpdate
) => {
  if (roomId == "") return;
  await update(child(RoomsRef(), roomId), roomInfo);
};

/**
 * ルームを削除し、ルームに関連付いたメンバー・アクション情報をすべて削除する
 * @param roomId ルームID
 */
export const destroyRoomAsync = async (roomId: string) => {
  if (roomId == "") return;
  await set(child(RoomsRef(), roomId), null);
  await set(child(MembersRef(), roomId), null);
  await set(child(ActionsRef(), roomId), null);
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
  userState: UserState = {
    displayName: user.displayName,
    picture: user.picture,
    status: "waiting",
    ready: false,
  }
) => {
  await updateMemberAsync(roomId, user.id, userState);
};

/**
 * メンバーの更新をDBに送信する
 * @param roomId ルームID
 * @param id メンバーID（ユーザID）
 * @param userState メンバー情報
 */
export const updateMemberAsync = async (
  roomId: string,
  id: string,
  userState: UserStateUpdate
) => {
  if (roomId == "" || id == "") return;
  const updateData = removeUndefinedFromObject(userState);
  await update(child(MembersRef(), `${roomId}/${id}`), updateData);
};

/**
 * メンバーの削除をDBに送信する
 * @param roomId ルームID
 * @param id メンバーID（ユーザID）
 */
export const removeMemberAsync = async (roomId: string, id: string) => {
  if (roomId == "" || id == "") return;
  await set(child(MembersRef(), `${roomId}/${id}`), null);
};

/**
 * アクションの追加をDBに送信する
 * @param roomId ルームID
 * @param userAction アクション情報
 */
export const addActionAsync = async (
  roomId: string,
  userAction: UserAction
) => {
  if (roomId == "") return;
  await push(child(ActionsRef(), roomId), userAction);
};

/**
 * アクションの更新をDBに送信する
 * @param roomId ルームID
 * @param id アクションID
 * @param userAction アクション情報
 */
export const updateActionAsync = async (
  roomId: string,
  id: string,
  userAction: UserActionUpdate
) => {
  if (roomId == "" || id == "") return;
  await update(child(ActionsRef(), `${roomId}/${id}`), userAction);
};

/**
 * アクションの削除をDBに送信する
 * @param roomId ルームID
 * @param id アクションID
 */
export const removeActionAsync = async (roomId: string, id: string) => {
  if (roomId == "" || id == "") return;
  await set(child(ActionsRef(), `${roomId}/${id}`), null);
};
