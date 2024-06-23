import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { chatnamecolor } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import renderAttachment from "./renderAttachment";
import {motion} from "framer-motion"
const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  // console.log(sender._id,user._id);
  const timeAgo = moment(createdAt).fromNow();
  return (
    // <div style={{ alignSelf: sameSender ? "flex-end" : "flex-start", 
    // backgroundColor:"white" , color: "black",borderRadius:"5px",padding:"0.5rem",width:"fit-content"
    // }}>
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender&&<Typography color={chatnamecolor} fontWeight={600} variant="caption">{sender.name}</Typography>}

      {content &&<Typography>{content}</Typography>}

      {/* {attachments} */}
      {attachments.length>0 && attachments.map((a,index)=>{
        const url = a.url;
        const file = fileFormat(url);

        return <Box key={index}><a href={url} target="_blank" download={true} style={{
            color: "black",

        }}>{renderAttachment({file,url})}</a></Box>
      })}
      <Typography variant="caption" color={"text.secondary"}>{timeAgo}</Typography>
      </motion.div>
  );
};

export default memo(MessageComponent);
