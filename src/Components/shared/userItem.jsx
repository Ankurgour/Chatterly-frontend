import React, { memo } from "react";
import { Avatar, IconButton, Stack, Typography,ListItem } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Remove as RemoveIcon } from "@mui/icons-material";
import { transformImage } from "../../lib/features";


const userItem = ({ user, handler, handlerIsLoading,isAdded=false,styling={} }) => {
  const { name, _id, avatar } = user;
  console.log(_id,name,isAdded);
  return (
    <ListItem >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
        
        
      >
        <Avatar src={transformImage(avatar)} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <IconButton size="small" sx={{bgcolor: isAdded?"error.main":"primary.main",color:"white","&:hover":{
            bgcolor:isAdded?"error.dark":"primary.dark",
        }}} onClick={() => handler(_id)} disabled={handlerIsLoading}>

        {isAdded? <RemoveIcon/>:<AddIcon />}
          
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(userItem);
