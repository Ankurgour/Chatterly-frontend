import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
} from "../../constants/events.js";
import { ONLINE_USERS, REFETCH_CHATS } from "../../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hoooks";
import { getItemfromStorage } from "../../lib/features";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  setisDeleteMenu,
  setisMobileMenuFriend,
  setselectedDeleteChat,
} from "../../redux/reducers/additonal";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import { getSocket } from "../../socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import Title from "../shared/Title";
import Chatlist from "../specific/Chatlist";
import ProfileCard from "../specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const dispatch = useDispatch();
    const socket = getSocket();
    const navigate = useNavigate();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { isMobileMenuFriend } = useSelector((state) => state.additional);
    const { newMessageAlert } = useSelector((state) => state.chat);
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);
    useEffect(() => {
      getItemfromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
    }, [newMessageAlert]);
    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setisDeleteMenu(true));
      dispatch(setselectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };
    const { user } = useSelector((state) => state.auth);
    const handleMobileClose = () => dispatch(setisMobileMenuFriend(false));
    const newMessagesAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );
    const newRequestHandler = useCallback(() => {
      
      console.log(data);
      dispatch(incrementNotification());
    }, [dispatch]);
    const refetchHandler = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);
    const onlineUsersHandler = useCallback((data) => {
      setOnlineUsers(data);
    }, []);
    const eventArray = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchHandler,
      [ONLINE_USERS]: onlineUsersHandler,
    };
    useSocketEvents(socket, eventArray);
    return (
      <>
        <Title title="Chat App" />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenuFriend} onClose={handleMobileClose}>
            <Chatlist
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessageAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}
        <Grid container style={{ height: "calc(100vh - 4rem)" }}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", md: "block" },
            }}
            height="100%"
            mt={"0.5rem"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                newMessagesAlert={newMessageAlert}
                handleDeleteChat={handleDeleteChat}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height="100%">
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              // padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
              marginTop: "0.5rem",
            }}
            height="100%"
          >
            <ProfileCard user={user} />
          </Grid>
        </Grid>

        {/* <WrappedComponent {...props}/> */}
        {/* <div>Footer</div> */}
      </>
    );
  };
};

export default AppLayout;
