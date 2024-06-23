// import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
// import React, { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setisFileMenu,
//   setuploadingLoader,
// } from "../../redux/reducers/additonal";
// import {
//   Image as ImageIcon,
//   AudioFile as AudioIcon,
//   VideoFile as VideoIcon,
//   UploadFile as UploadIcon,
// } from "@mui/icons-material";
// import toast from "react-hot-toast";
// import { useSendAttachmentsMutation } from "../../redux/api/api";

// const FileMenu = ({ anchorEl,chatId}) => {
//   const { isFileMenu } = useSelector((state) => state.additional);
//   const dispatch = useDispatch();
//   const [sendAttachments] = useSendAttachmentsMutation();
//   const closeHandler = () => {
//     dispatch(setisFileMenu(false));
//   };
//   const imageRef = useRef(null);
//   const audioRef = useRef(null);
//   const videoRef = useRef(null);
//   const fileRef = useRef(null);
//   const selectRef = (ref) => {
//     ref.current?.click();
//   };
//   const fileChangeHandler = async(e, key) => {
//     const files = Array.from(e.target.files);
//     if (files.length <= 0) return;
//     if (files.length > 5)
//       return toast.error(`You can send only 5 ${key} at a time`);

//     dispatch(setuploadingLoader(true));
//     const toastId = toast.loading(`Sending ${key}...`);
//     closeHandler();

//     try {
//       const myForm = new FormData();
//       myForm.append("chatId",chatId);
//       files.forEach(file => myForm.append("files", file));
//       const res = await sendAttachments(myForm);

//       if(res.data)toast.success(`${key} sent successfully`,{
//         id:toastId
//       });
//       else toast.error(`Failed to send ${key}`,{id:toastId});
//     } catch (error) {
//       console.log("error sending",error);
//       toastId.error(error, { id: toastId });
//     } finally {
//       dispatch(setuploadingLoader(false));
//     }
//   };
//   return (
//     // <div style={{width:"10rem"}}>
//     <Menu
//       anchorEl={anchorEl}
//       open={isFileMenu}
//       onClose={closeHandler}
     
//     >
//       <MenuList>
//         <MenuItem onClick={() => selectRef(imageRef)}>
//           <Tooltip title="Image">
//             <ImageIcon />
//           </Tooltip>
//           <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
//           <input
//             type="file"
//             multiple
//             accept="image/png, image/jpeg, image/gif"
//             style={{ display: "none" }}
//             onChange={(e) => fileChangeHandler(e, "Images")}
//             ref={imageRef}
//           />
//         </MenuItem>
//         <MenuItem onClick={() => selectRef(audioRef)}>
//           <Tooltip title="Audio">
//             <AudioIcon />
//           </Tooltip>
//           <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
//           <input
//             type="file"
//             multiple
//             accept="audio/mpeg, audio/wav"
//             style={{ display: "none" }}
//             onChange={(e) => fileChangeHandler(e, "Audios")}
//             ref={audioRef}
//           />
//         </MenuItem>
//         <MenuItem onClick={() => selectRef(videoRef)}>
//           <Tooltip title="Video">
//             <VideoIcon />
//           </Tooltip>
//           <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
//           <input
//             type="file"
//             multiple
//             accept="video/mp4, video/webm, video/ogg"
//             style={{ display: "none" }}
//             onChange={(e) => fileChangeHandler(e, "Videos")}
//             ref={videoRef}
//           />
//         </MenuItem>

//         <MenuItem onClick={() => selectRef(fileRef)}>
//           <Tooltip title="File">
//             <UploadIcon />
//           </Tooltip>
//           <ListItemText style={{ marginLeft: "0.5rem" }}>Files</ListItemText>
//           <input
//             type="file"
//             multiple
//             accept="*"
//             style={{ display: "none" }}
//             onChange={(e) => fileChangeHandler(e, "Files")}
//             ref={fileRef}
//           />
//         </MenuItem>
//       </MenuList>
//     </Menu>
//     // </div>
//   );
// };

// export default FileMenu;

import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setisFileMenu,
  setuploadingLoader,
} from "../../redux/reducers/additonal";
import {
  Image as ImageIcon,
  AudioFile as AudioIcon,
  VideoFile as VideoIcon,
  UploadFile as UploadIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorEl, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.additional);
  const dispatch = useDispatch();
  const [sendAttachments] = useSendAttachmentsMutation();
  
  const closeHandler = () => {
    dispatch(setisFileMenu(false));
  };

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const selectRef = (ref) => {
    ref.current?.click();
  };

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    console.log(files);
    if (files.length <= 0) return;
    if (files.length > 5)
      return toast.error(`You can send only 5 ${key} at a time`);

    dispatch(setuploadingLoader(true));
    const toastId = toast.loading(`Sending ${key}...`);
    closeHandler();

    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach(file => myForm.append("files", file));
      // console.log(myForm);
      const res = await sendAttachments(myForm);
      // console.log(res)
      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });
    } catch (error) {
      console.log("error sending", error);
      toast.error(error.message, { id: toastId });
    } finally {
      dispatch(setuploadingLoader(false));
    }
  };

  return (
    <div style={{ width: "10rem" }}>
      <Menu
        anchorEl={anchorEl}
        open={isFileMenu}
        onClose={closeHandler}
      >
        <MenuList>
          <MenuItem onClick={() => selectRef(imageRef)}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>
          <MenuItem onClick={() => selectRef(audioRef)}>
            <Tooltip title="Audio">
              <AudioIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>
          <MenuItem onClick={() => selectRef(videoRef)}>
            <Tooltip title="Video">
              <VideoIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(fileRef)}>
            <Tooltip title="File">
              <UploadIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Files</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default FileMenu;

