import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { CodeType, useFetchCodes } from "hooks/CodeAPIHooks/useFetchCodes";
import { UserState, UserAction } from "services/RoomSync/RoomSync";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { User } from "services/user/user";

export type IResponse = {
  user: User | null;
  roomInfo: {
    roomId: string;
    invitationLink: string;
    host: UserState;
    memberKeys: string[];
    members: { [id: string]: UserState };
    actionKeys: string[];
    actions: { [id: string]: UserAction };
  };
  isHost: boolean;
  status?: "waiting" | "watching";
  ready: boolean;

  readyBtnHandler: () => void;
  readyBtnDisabled: boolean;
  exitBtnHandler: () => void;
  startBtnDisabled: boolean;
  startBtnHandler: () => void;
  isCopyBtnClicked: boolean;
  invitationBtnHandler: () => void;
  kickUserHandler: (userId: string) => void;
  code: {
    codes: CodeType[];
    loading: boolean;
  };
  selectedCode: CodeType | null;
  onChangeSelectedCode: (code: CodeType) => void;
  onStartToEditCode: () => void;
  showCodeSelectModal: boolean;
  openCodeSelectModal: () => void;
  closeCodeSelectModal: () => void;
};

export const useWaitingRoomState = (): IResponse => {
  const {
    room,
    isHost,
    updateRoomInfo,
    updateMember,
    updateOtherMember,
    exitRoom,
  } = useRoomSync();
  const { data: codes = [], loading } = useFetchCodes();
  const [preRoomStatus, setPreRoomStatus] = useState<"waiting" | "watching">(
    "watching"
  );
  const [selectedCode, setSelectedCode] = useState<CodeType | null>(null);
  const [ready, setReady] = useState(false);
  const [readyBtnDisabled, setReadyBtnDisabled] = useState(true);
  const [startBtnDisabled, setStartBtnDisabled] = useState(true);
  const [isCopyBtnClicked, setIsCopyBtnClicked] = useState(false);
  let { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dummyUser: UserState = {
    displayName: "",
    status: "disconnect",
    ready: false,
  };

  const modalOn = useMemo(
    () => (searchParams.get("modal") === "on" ? true : false),
    []
  );

  // ユーザ状態を更新
  useEffect(() => {
    updateMember({
      status: "waiting",
    });
  }, []);

  // DB上で退出処理が完了したら退出
  useEffect(() => {
    if (!room.isEntered) {
      navigate("/room-match");
    }
  }, [room.isEntered]);

  // 準備ボタンの有効化
  useEffect(() => {
    //コードが選択されたら準備完了ボタンを押せるようにする
    if (selectedCode != null) {
      setReadyBtnDisabled(false);
    }
  }, [selectedCode]);

  // ルームステータスがwaitingからwatchingになったら観戦画面に遷移
  useEffect(() => {
    if (room.info) {
      if (preRoomStatus == "waiting" && room.info.status == "watching") {
        navigate("/room-match/result");
      }
      setPreRoomStatus(room.info?.status);
    }
  }, [room.info?.status]);

  // ready状態をDBに反映
  useEffect(() => {
    updateMember({
      ready: ready,
      codeId: selectedCode ? selectedCode.id : "",
    });
  }, [ready]);

  // クエリパラメータにmodal=onを渡されたらモーダルを表示
  useEffect(() => {
    if (modalOn) {
      setShowCodeSelectModal(true);
    }
  }, [modalOn]);

  // ホストの処理
  useEffect(() => {
    if (isHost) {
      if (room.info && room.info.status == "waiting") {
        // 全員が準備完了になったら開始ボタンを有効にする
        let newDisabled = false;
        for (let key of Object.keys(room.members)) {
          if (!room.members[key].ready) {
            newDisabled = true;
            break;
          }
        }
        setStartBtnDisabled(newDisabled);
      }
      // 全員がWaitingRoomに返ってきたらroomの状態をwaitingに更新する
      let newRoomStatus: "waiting" | "watching" = "waiting";
      for (let key of Object.keys(room.members)) {
        if (room.members[key].status == "watching") {
          newRoomStatus = "watching";
        }
      }
      if (newRoomStatus == "waiting" && room.info?.status == "watching") {
        updateRoomInfo({
          status: "waiting",
          analyzingResult: null,
        });
      }
    }
  }, [room.members, isHost]);

  // kick処理 member.status = kickingの場合そのユーザをキックする
  useEffect(() => {
    if (user) {
      for (let key of Object.keys(room.members)) {
        if (room.members[key].status == "kicking" && user.id == key) {
          exitRoom();
        }
      }
    }
  }, [room.members]);

  // ---- イベントハンドラ ---- //

  const _readyBtnHandler = () => {
    setReady(!ready);
  };

  const _exitBtnHandler = () => {
    exitRoom();
  };

  const _startBtnHandler = () => {
    updateRoomInfo({
      status: "watching",
    });
  };

  const _onChangeSelectedCode = (code: CodeType) => {
    setSelectedCode(code);
  };

  const _onStartToEditCode = () => {
    if (selectedCode) {
      navigate(`/free-coding/${selectedCode.id}/selectCode`);
    }
  };

  //invitationURLのコピーボタン
  const _invitationBtnHandler = () => {
    if (room.invitationLink) {
      navigator.clipboard.writeText(room.invitationLink).then(() => {
        setIsCopyBtnClicked(true);
      });
    }
  };
  const _kickUserBtnHandler = (userId: string) => {
    updateOtherMember(userId, { status: "kicking" });
  };

  //モーダル表示非表示
  const [showCodeSelectModal, setShowCodeSelectModal] =
    useState<boolean>(false);
  const openCodeSelectModal = () => {
    setShowCodeSelectModal(true);
  };
  const closeCodeSelectModal = () => {
    setShowCodeSelectModal(false);
  };

  return {
    user: user,
    roomInfo: {
      roomId: room.id ? room.id : "",
      invitationLink: room.invitationLink ? room.invitationLink : "",
      host:
        room.info && room.info.host in room.members
          ? room.members[room.info.host]
          : dummyUser,
      memberKeys: room.sortedKeysOfMembers,
      members: room.members,
      actionKeys: room.sortedKeysOfActions,
      actions: room.actions,
    },
    isHost: isHost,
    status: room.info?.status,
    ready: ready,
    readyBtnHandler: _readyBtnHandler,
    readyBtnDisabled: readyBtnDisabled,
    exitBtnHandler: _exitBtnHandler,
    startBtnDisabled: startBtnDisabled,
    startBtnHandler: _startBtnHandler,
    isCopyBtnClicked: isCopyBtnClicked,
    invitationBtnHandler: _invitationBtnHandler,
    kickUserHandler: _kickUserBtnHandler,
    code: {
      codes: codes,
      loading: loading,
    },
    selectedCode: selectedCode,
    onChangeSelectedCode: _onChangeSelectedCode,
    onStartToEditCode: _onStartToEditCode,
    showCodeSelectModal,
    openCodeSelectModal,
    closeCodeSelectModal,
  };
};
