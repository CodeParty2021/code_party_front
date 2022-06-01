import { child, get, push, ref, set, update } from "firebase/database";
import { User } from "services/user/user";
import { RoomInfo, UserAction, UserState } from "../RoomSync";
import {
  getRoomAsync,
  pushRoomAsync,
  updateRoomAsync,
  destroyRoomAsync,
  initMemberAsync,
  updateMemberAsync,
  removeMemberAsync,
  addActionAsync,
  updateActionAsync,
  removeActionAsync,
  getMemberAsync,
} from "./DBOperator";

jest.mock("firebase/database");

const refMock = ref as jest.Mock;
const childMock = child as jest.Mock;
const getMock = get as jest.Mock;
const pushMock = push as jest.Mock;
const setMock = set as jest.Mock;
const updateMock = update as jest.Mock;

const user: User = {
  id: "userId",
  displayName: "user's name",
  email: "user@test.com",
  picture: "http://test.com/userpic.png",
  jwt: "usersjwt",
  isAnonymous: false,
};

const users: { [id: string]: UserState } = {
  userId: {
    displayName: "user's name",
    ready: true,
    status: "waiting",
  },
};

const actions: { [id: string]: UserAction } = {
  actionId: {
    actionId: 1,
    userId: "userId",
  },
};

const roomInfo: RoomInfo = {
  name: "room's name",
  host: "userId",
  status: "waiting",
};

describe("Test Cases for Reducers of DBOperator", () => {
  beforeEach(() => {
    refMock.mockImplementation((ref: any, path: string) => path);
    childMock.mockImplementation((ref: any, path: string) => {
      return `${ref}/${path}`;
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("test of getRoomAsync", () => {
    it("正常系", async () => {
      getMock.mockResolvedValue({
        val: () => roomInfo,
      });
      const result = await getRoomAsync("roomId");
      expect(getMock).toBeCalledTimes(1);
      expect(getMock).lastCalledWith("/RoomApp/rooms/roomId");
      expect(result).toEqual(roomInfo);
    });

    it("異常系１（DB上で値が見つからなかった場合）", async () => {
      getMock.mockResolvedValue({
        val: () => {},
      });
      const result = await getRoomAsync("roomId");
      expect(getMock).toBeCalledTimes(1);
      expect(result).toBeFalsy();
    });

    it("異常系２（roomIdが空文字列の場合）", async () => {
      const result = await getRoomAsync("");
      expect(getMock).toBeCalledTimes(0);
      expect(result).toBeFalsy();
    });
  });

  describe("test of getMemberAsync", () => {
    it("正常系", async () => {
      getMock.mockResolvedValue({
        val: () => users["userId"],
      });
      const result = await getMemberAsync("roomId", "userId");
      expect(getMock).toBeCalledTimes(1);
      expect(getMock).lastCalledWith("/RoomApp/members/roomId/userId");
      expect(result).toEqual(users["userId"]);
    });

    it("異常系１（DB上で値が見つからなかった場合）", async () => {
      getMock.mockResolvedValue({
        val: () => {},
      });
      const result = await getMemberAsync("roomId", "userId");
      expect(getMock).toBeCalledTimes(1);
      expect(result).toBeFalsy();
    });

    it("異常系２（Idが空文字列の場合）", async () => {
      const result = await getMemberAsync("", "");
      expect(getMock).toBeCalledTimes(0);
      expect(result).toBeFalsy();
    });
  });

  describe("test of pushRoomAsync", () => {
    it("正常系", async () => {
      pushMock.mockResolvedValue("reference");
      const result = await pushRoomAsync(roomInfo);
      expect(pushMock).toBeCalledTimes(1);
      expect(pushMock).lastCalledWith("/RoomApp/rooms", roomInfo);
      expect(result).toEqual("reference");
    });
  });

  describe("test of updateRoomAsync", () => {
    it("正常系", async () => {
      await updateRoomAsync("roomId", roomInfo);
      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).lastCalledWith("/RoomApp/rooms/roomId", roomInfo);
    });

    it("異常系１（roomIdが空文字列の場合）", async () => {
      await updateRoomAsync("", roomInfo);
      expect(updateMock).toBeCalledTimes(0);
    });
  });

  describe("test of destroyRoomAsync", () => {
    it("正常系", async () => {
      await destroyRoomAsync("roomId");
      expect(setMock).toBeCalledTimes(3);
      expect(setMock.mock.calls[0]).toEqual(["/RoomApp/rooms/roomId", null]);
      expect(setMock.mock.calls[1]).toEqual(["/RoomApp/members/roomId", null]);
      expect(setMock.mock.calls[2]).toEqual(["/RoomApp/actions/roomId", null]);
    });

    it("異常系１（roomIdが空文字列の場合）", async () => {
      await destroyRoomAsync("");
      expect(setMock).toBeCalledTimes(0);
    });
  });

  describe("test of initMemberAsync", () => {
    it("正常系", async () => {
      await initMemberAsync("roomId", user);
      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).lastCalledWith("/RoomApp/members/roomId/" + user.id, {
        displayName: user.displayName,
        ready: false,
        status: "waiting",
      });
    });

    it("異常系１（roomIdが空文字列の場合）", async () => {
      await initMemberAsync("", user);
      expect(updateMock).toBeCalledTimes(0);
    });
  });

  describe("test of updateMemberAsync", () => {
    it("正常系", async () => {
      await updateMemberAsync("roomId", "userId", users["userId"]);
      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).lastCalledWith(
        "/RoomApp/members/roomId/userId",
        users["userId"]
      );
    });

    it("異常系１（roomIdが空文字列の場合）", async () => {
      await updateMemberAsync("", "userId", users["userId"]);
      expect(updateMock).toBeCalledTimes(0);
    });

    it("異常系２（idが空文字列の場合）", async () => {
      await updateMemberAsync("roomId", "", users["userId"]);
      expect(updateMock).toBeCalledTimes(0);
    });
  });

  describe("test of removeMemberAsync", () => {
    it("正常系", async () => {
      await removeMemberAsync("roomId", "userId");
      expect(setMock).toBeCalledTimes(1);
      expect(setMock).lastCalledWith("/RoomApp/members/roomId/userId", null);
    });

    it("異常系１（roomIdが空文字列の場合）", async () => {
      await removeMemberAsync("", "userId");
      expect(setMock).toBeCalledTimes(0);
    });

    it("異常系２（idが空文字列の場合）", async () => {
      await removeMemberAsync("roomId", "");
      expect(setMock).toBeCalledTimes(0);
    });
  });

  describe("test of addActionAsync", () => {
    it("正常系", async () => {
      await addActionAsync("roomId", actions["actionId"]);
      expect(pushMock).toBeCalledTimes(1);
      expect(pushMock).lastCalledWith(
        "/RoomApp/actions/roomId",
        actions["actionId"]
      );
    });

    it("異常系１（roomIdが空文字列の場合）", async () => {
      await addActionAsync("", actions["actionId"]);
      expect(pushMock).toBeCalledTimes(0);
    });
  });

  describe("test of updateActionAsync", () => {
    it("正常系", async () => {
      await updateActionAsync("roomId", "actionId", actions["actionId"]);
      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).lastCalledWith(
        "/RoomApp/actions/roomId/actionId",
        actions["actionId"]
      );
    });

    it("異常系１（roomIdが空文字列の場合）", async () => {
      await updateActionAsync("", "actionId", actions["actionId"]);
      expect(setMock).toBeCalledTimes(0);
    });

    it("異常系２（idが空文字列の場合）", async () => {
      await updateActionAsync("roomId", "", actions["actionId"]);
      expect(setMock).toBeCalledTimes(0);
    });
  });

  describe("test of removeActionAsync", () => {
    it("正常系", async () => {
      await removeActionAsync("roomId", "actionId");
      expect(setMock).toBeCalledTimes(1);
      expect(setMock).lastCalledWith("/RoomApp/actions/roomId/actionId", null);
    });

    it("異常系１（roomIdが空文字列の場合）", async () => {
      await removeActionAsync("", "actionId");
      expect(setMock).toBeCalledTimes(0);
    });

    it("異常系２（idが空文字列の場合）", async () => {
      await removeActionAsync("roomId", "");
      expect(setMock).toBeCalledTimes(0);
    });
  });
});
