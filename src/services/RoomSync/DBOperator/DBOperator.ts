import { child, get, push, set, update } from "firebase/database";
import { User } from "services/user/user";
import { removeUndefinedFromObject } from "utils/RemoveUndefinedFromObject";
import {
  ActionsRef,
  EncodeRoomId,
  GenerateRoomId,
  MembersRef,
  RoomInfo,
  RoomInfoUpdate,
  RoomsRef,
  UserAction,
  UserActionUpdate,
  UserState,
  UserStateUpdate,
} from "../RoomSync";

/**
 * コンフリクトを避けるために生成できるIDの最大数
 */
const MAX_ID_ITERATION = 10;

// ---- Realtime DBへのset・update・push・removeファンクション群 ----- //

/**
 * ルーム情報を取得する
 * @param roomId ルームID
 * @returns ルーム情報
 */
export const getRoomAsync = async (roomId: string) => {
  if (roomId == "") return;

  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);

  //DBからGET
  const ss = await get(child(RoomsRef(), encodedRoomId));
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

  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);

  //DBからGET
  const ss = await get(child(child(MembersRef(), encodedRoomId), memberId));
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
 * ルーム内のメンバー数を取得する
 * @param roomId ルームID
 * @returns メンバー数
 */
export const getMemberCountAsync = async (roomId: string) => {
  if (roomId == "") return;

  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);

  //DBからGET
  const ss = await get(child(MembersRef(), encodedRoomId));
  const data = ss.val();

  //ルームが存在しない場合はundefined
  if (!data) return;

  const members = Object.entries(data);
  return members.length;
};

/**
 * ルーム情報を追加する
 * @param roomInfo ルーム情報
 * @returns IDとルーム情報
 */
export const pushRoomAsync = async (roomInfo: RoomInfo) => {
  let id: string | undefined = undefined;

  for (let i = 0; i < MAX_ID_ITERATION; i++) {
    const t_id = GenerateRoomId();
    const conflictedRoom = await getRoomAsync(t_id);
    if (conflictedRoom === undefined) {
      id = t_id;
      break;
    }
  }

  if (id === undefined) return;

  await set(child(RoomsRef(), id), roomInfo);
  return {
    key: id,
    data: roomInfo,
  };
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
  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);
  await update(child(RoomsRef(), encodedRoomId), roomInfo);
};

/**
 * ルームを削除し、ルームに関連付いたメンバー・アクション情報をすべて削除する
 * @param roomId ルームID
 */
export const destroyRoomAsync = async (roomId: string) => {
  if (roomId == "") return;
  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);
  await set(child(RoomsRef(), encodedRoomId), null);
  await set(child(MembersRef(), encodedRoomId), null);
  await set(child(ActionsRef(), encodedRoomId), null);
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
  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);
  await updateMemberAsync(encodedRoomId, user.id, userState);
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
  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);
  const updateData = removeUndefinedFromObject(userState);
  await update(child(MembersRef(), `${encodedRoomId}/${id}`), updateData);
};

/**
 * メンバーの削除をDBに送信する
 * @param roomId ルームID
 * @param id メンバーID（ユーザID）
 */
export const removeMemberAsync = async (roomId: string, id: string) => {
  if (roomId == "" || id == "") return;
  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);
  await set(child(MembersRef(), `${encodedRoomId}/${id}`), null);
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
  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);
  await push(child(ActionsRef(), encodedRoomId), userAction);
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
  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);
  await update(child(ActionsRef(), `${encodedRoomId}/${id}`), userAction);
};

/**
 * アクションの削除をDBに送信する
 * @param roomId ルームID
 * @param id アクションID
 */
export const removeActionAsync = async (roomId: string, id: string) => {
  if (roomId == "" || id == "") return;
  //roomIdはBase32なのでエンコードしてから使用する
  const encodedRoomId = EncodeRoomId(roomId);
  await set(child(ActionsRef(), `${encodedRoomId}/${id}`), null);
};
