import React, { memo, useState, useEffect, lazy, Suspense } from "react";
import {
  Grid,
  IconButton,
  Tooltip,
  Box,
  Drawer,
  Stack,
  Typography,
  TextField,
  Button,
  Backdrop,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import {
  Group,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../Components/styles/StyledComponents";
import AvatarCard from "../Components/shared/AvatarCard";
import { SampleChats, sampleUsers } from "../constants/samplData";
import UserItem from "../Components/shared/userItem";
import { useDeleteChatMutation, useGetChatDetailsQuery, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hoooks";
import { LayoutLoader } from "../Components/layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setisAddMember } from "../redux/reducers/additonal";

const AddMemberDialog = lazy(() =>
  import("../Components/dialogs/AddMemberDialog")
);
const ConfirmDeleteDialog = lazy(() =>
  import("../Components/dialogs/ConfirmDeleteDialogs")
);
const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const dispatch = useDispatch();
  const {isAddMember} = useSelector((state=>state.additional));

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useGetChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  const [RenameGroup,isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);
  // const members =
  const [removeMember,isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, SetIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState([]);
  // const addMemberSubmitHandler =()=>{
  //   addMembers("Adding member...",{members:selectedMembers,chatId})
  //     closeHandler();
  // }
  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);
  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setGroupNameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }
    return ()=>{
      setGroupName("");
      setGroupNameUpdatedValue("");
      SetIsEdit(false);
      setMembers([]);
    }
  }, [groupDetails.data]);
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  // const navigateBack = () => {
  //   navigate("/");
  // };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };
  const openAddHandler = () => {
    dispatch(setisAddMember(true));
    // console.log(isAddMember);
    // console.log("add member");
  };
  const updateGroupName = () => {
    SetIsEdit(false);
    // console.log("update");
    RenameGroup("Updating Group Name...",{chatId,name:groupNameUpdatedValue});
  };
  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    // console.log("delete group");
  };

  const closeconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
    // console.log("qdw");
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeconfirmDeleteHandler();
    navigate("/groups");
  };
  const removeMemberHandler = (userId) => {
    removeMember("Removing member...",{chatId,userId});
  };
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
    SetIsEdit(false);
    };
  }, [chatId]);

 

  

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "relative",
            // position: "absolute",
            // left: "-5rem",
            // top: "1rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            "&:hover": {
              bgcolor: "grey",
              color: "black",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  const GroupName = (
    <Stack
      marginLeft={"5rem"}
      direction={"row"}
      // alignItems={"center"}
      // justifyContent={"center"}
      spacing={"1rem"}
      padding={"2rem"}
      paddingLeft={"4rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton disabled={isLoadingGroupName} onClick={() => SetIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openconfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid
      height={"100vh"}
      sx={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-evenly",
      }}
      // width={"100vh"}
    >
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        height={"100vh"}
        bgcolor={"#f5f5f5"}
        position={"relative"}
        minWidth={"500px"}
        // marginLeft={"0.5rem"}
        // marginTop={"0.5rem"}
      >
        <GroupList Groups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "center",
          // alignItems: "center",
          // position: "relative",
          // padding: "1rem 3rem",
        }}

        // spacing={"1rem"}
      >
        {/* Gre detaiyyy */}
        <Stack direction="column" spacing={1} alignItems="center">
          {IconBtns}
          {groupName && (
            <>
              {GroupName}
              <Typography margin={"2rem"} alignSelf={""} variant="body1">
                Members
              </Typography>
              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem",
                }}
                spacing={"2rem"}
                // bgcolor={"bisque"}
                height={"43vh"}
                overflow={"auto"}
              >
                {/* {members} */}
                {isLoadingRemoveMember?<CircularProgress/>: members.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0 0.1rem rgba(0,0,0,0.05)",
                      padding: "0.5rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))}
                {/* {ButtonGroup} */}
              </Stack>
              {ButtonGroup}
               {/* <ButtonGroup/> */}
            </>
          )}
        </Stack>
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeconfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList w="50vw" Groups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", Groups = [], chatId }) => (
  <Stack width={w} height={"100vh"}>
    {Groups.length > 0 ? (
      Groups.map((group) => (
        <GroupListitem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);
const GroupListitem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups;
