import React from "react";
import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";
import { SampleChats } from "../../constants/samplData.js";
// import { CleaningServices } from "@mui/icons-material";
const Chatlist = ({
  w = "100%",
  chats =  SampleChats ,
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "1",
      count: 4,
    },
  ],
  handleDeleteChat,
}) => {
      return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        const { avatar,  _id, name, groupChat, members } = data;
    const avatarArray = Array.isArray(avatar) ? avatar : [];
    
        const newMessageAlert = newMessagesAlert.find(
          (mamba) => mamba.chatId === _id
        );
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );
        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatarArray}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default Chatlist;
