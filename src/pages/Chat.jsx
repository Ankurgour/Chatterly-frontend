import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../Components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { bluegrey, lightbluegrey } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../Components/styles/StyledComponents";
import FileMenu from "../Components/dialogs/FileMenu";
import MessageComponent from "../Components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from '../constants/events.js'
import {
  useGetChatDetailsQuery,
  useGetOldMessagesQuery,
} from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { useErrors, useSocketEvents } from "../hooks/hoooks";
import { useInfiniteScrollTop } from "6pp";
import { setisFileMenu } from "../redux/reducers/additonal";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, START_TYPING, STOP_TYPING } from "../constants/events";
import { TypingLoader } from "../Components/layout/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const fileMenuRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = getSocket();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeOut = useRef(null);
  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessageChunk = useGetOldMessagesQuery({ chatId, page });
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunk?.data?.totalPage,
    page,
    setPage,
    oldMessageChunk.data?.message
  );
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessageChunk.isError, error: oldMessageChunk.error },
  ];
  useErrors(errors);
  // console.log(chatDetails);
  const members = chatDetails?.data?.chat?.members;
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if(typingTimeOut.current)clearTimeout(typingTimeOut.current);
    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING,{members, chatId});
      setIamTyping(false);
    }, [2000]);
  };
  const handleFileOpen = (e) => {
    dispatch(setisFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };
  useEffect(() => {
    socket.emit(CHAT_JOINED,{userId:user._id,members});
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
    socket.emit(CHAT_LEAVED,{userId:user._id,members})

    };
  }, [chatId]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages,userTyping]);
  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);
  const newMessagesHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const startTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      // console.log("typing...", data);
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      // console.log("stop typing...", data);
      setUserTyping(false);
    },
    [chatId]
  );
  const alertHandler = useCallback(
    (data) => {

      if(data.chatId!==chatId)return;
      const messageForAlert = {
        content:data.message,
        sender: {
          _id: "adsfg",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev)=>[...prev, messageForAlert]);
    },
    [chatId]
  );
  const eventArray = {
    [ALERT]: alertHandler,
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING]: startTypingHandler,
    [STOP_TYPING]: stopTypingHandler,
  };
  useSocketEvents(socket, eventArray);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={lightbluegrey}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages?.map((m) => (
          <MessageComponent key={m._id} message={m} user={user} />
        ))}
        {userTyping&& <TypingLoader/>}
        <div ref={bottomRef}/>
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          alignItems={"center"}
          padding={"1rem"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="type your message here"
            value={message}
            onChange={messageChangeHandler}
            
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: `${bluegrey}`,
              color: "white",
              marginLeft: "1rem",
              padding: "0.7rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            // onClick={submitHandler}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
