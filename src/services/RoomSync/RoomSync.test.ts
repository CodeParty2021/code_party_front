import { child, ref } from "firebase/database";
import reducer, {
  RoomState,
  RoomInfo,
  UserState,
  UserAction,
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
} from "./RoomSync";

jest.mock("firebase/database");

const refMock = ref as jest.Mock;
const childMock = child as jest.Mock;

refMock.mockImplementation((ref: any, path: string) => path);
childMock.mockImplementation((ref: any, path: string) => `${ref}/${path}`);

const initialState: RoomState = {
  id: undefined,
  isEntered: false,
  info: undefined,
  members: {},
  sortedKeysOfMembers: [],
  actions: {},
  sortedKeysOfActions: [],
};

const roomId = "room id";
const roomInfo: RoomInfo = {
  name: "room name",
  host: "userid1",
  status: "waiting",
};
const user1: UserState = {
  displayName: "user1",
  ready: false,
  status: "waiting",
};
const user2: UserState = {
  displayName: "user1",
  ready: true,
  status: "watching",
};
const action1: UserAction = {
  userId: "userid1",
  actionId: 0,
};
const action2: UserAction = {
  userId: "userid2",
  actionId: 1,
};

const enteredState: RoomState = {
  ...initialState,
  id: roomId,
  isEntered: true,
  info: { ...roomInfo },
};

describe("Test Cases for Reducers of RoomSync Service", () => {
  let state: RoomState;

  beforeEach(() => {
    state = { ...initialState };
  });

  it("enterRoom", () => {
    state = { ...initialState };
    expect(
      reducer(
        state,
        enterRoom({
          id: roomId,
          data: roomInfo,
        })
      )
    ).toEqual({
      ...enteredState,
    });
  });

  it("exitRoom", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));
    expect(reducer(state, exitRoom())).toEqual(initialState);
  });

  it("addMember", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));

    state = reducer(
      state,
      addMember({
        id: "userid1",
        data: { ...user1 },
        previousChildName: null,
      })
    );
    expect(state).toEqual({
      ...enteredState,
      members: {
        userid1: { ...user1 },
      },
      sortedKeysOfMembers: ["userid1"],
    });

    state = reducer(
      state,
      addMember({
        id: "userid2",
        data: { ...user2 },
        previousChildName: "userid1",
      })
    );
    expect(state).toEqual({
      ...enteredState,
      members: {
        userid1: { ...user1 },
        userid2: { ...user2 },
      },
      sortedKeysOfMembers: ["userid1", "userid2"],
    });
  });

  it("updateMember", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));
    state = reducer(
      state,
      addMember({
        id: "userid1",
        data: { ...user1 },
        previousChildName: null,
      })
    );
    expect(
      reducer(
        state,
        updateMember({
          id: "userid1",
          data: {
            displayName: "updated name",
            ready: false,
            status: "watching",
          },
        })
      )
    ).toEqual({
      ...enteredState,
      members: {
        userid1: {
          displayName: "updated name",
          ready: false,
          status: "watching",
        },
      },
      sortedKeysOfMembers: ["userid1"],
    });
  });

  it("moveMember", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));
    state = reducer(
      state,
      addMember({
        id: "userid1",
        data: { ...user1 },
        previousChildName: null,
      })
    );
    state = reducer(
      state,
      addMember({
        id: "userid2",
        data: { ...user2 },
        previousChildName: "userid1",
      })
    );
    expect(
      reducer(
        state,
        moveMember({
          id: "userid2",
          data: { ...user2 },
          previousChildName: null,
        })
      )
    ).toEqual({
      ...enteredState,
      members: {
        userid1: { ...user1 },
        userid2: { ...user2 },
      },
      sortedKeysOfMembers: ["userid2", "userid1"],
    });
  });

  it("removeMember", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));
    state = reducer(
      state,
      addMember({
        id: "userid1",
        data: { ...user1 },
        previousChildName: null,
      })
    );
    state = reducer(
      state,
      addMember({
        id: "userid2",
        data: { ...user2 },
        previousChildName: null,
      })
    );
    expect(reducer(state, removeMember("userid1"))).toEqual({
      ...enteredState,
      members: {
        userid2: { ...user2 },
      },
      sortedKeysOfMembers: ["userid2"],
    });
  });

  it("addAction", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));

    state = reducer(
      state,
      addAction({
        id: "actionid1",
        data: { ...action1 },
        previousChildName: null,
      })
    );
    expect(state).toEqual({
      ...enteredState,
      actions: {
        actionid1: { ...action1 },
      },
      sortedKeysOfActions: ["actionid1"],
    });

    state = reducer(
      state,
      addAction({
        id: "actionid2",
        data: { ...action2 },
        previousChildName: "actionid1",
      })
    );
    expect(state).toEqual({
      ...enteredState,
      actions: {
        actionid1: { ...action1 },
        actionid2: { ...action2 },
      },
      sortedKeysOfActions: ["actionid1", "actionid2"],
    });
  });

  it("updateAction", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));
    state = reducer(
      state,
      addAction({
        id: "actionid1",
        data: { ...action1 },
        previousChildName: null,
      })
    );
    expect(
      reducer(
        state,
        updateAction({
          id: "actionid1",
          data: {
            userId: "updated user id",
            actionId: 2,
          },
        })
      )
    ).toEqual({
      ...enteredState,
      actions: {
        actionid1: {
          userId: "updated user id",
          actionId: 2,
        },
      },
      sortedKeysOfActions: ["actionid1"],
    });
  });

  it("moveAction", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));
    state = reducer(
      state,
      addAction({
        id: "actionid1",
        data: { ...action1 },
        previousChildName: null,
      })
    );
    state = reducer(
      state,
      addAction({
        id: "actionid2",
        data: { ...action2 },
        previousChildName: "actionid1",
      })
    );
    expect(
      reducer(
        state,
        moveAction({
          id: "actionid2",
          data: { ...action2 },
          previousChildName: null,
        })
      )
    ).toEqual({
      ...enteredState,
      actions: {
        actionid1: { ...action1 },
        actionid2: { ...action2 },
      },
      sortedKeysOfActions: ["actionid2", "actionid1"],
    });
  });

  it("removeAction", () => {
    state = reducer(state, enterRoom({ id: roomId, data: roomInfo }));
    state = reducer(
      state,
      addAction({
        id: "actionid1",
        data: { ...action1 },
        previousChildName: null,
      })
    );
    state = reducer(
      state,
      addAction({
        id: "actionid2",
        data: { ...action2 },
        previousChildName: "actionid1",
      })
    );
    expect(reducer(state, removeAction("actionid1"))).toEqual({
      ...enteredState,
      actions: {
        actionid2: { ...action2 },
      },
      sortedKeysOfActions: ["actionid2"],
    });
  });
});
