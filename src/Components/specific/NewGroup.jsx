import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/samplData";
import UserItem from "../shared/userItem";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hoooks";
import { setisNewGroup } from "../../redux/reducers/additonal";
import toast from "react-hot-toast";
const NewGroup = () => {
  const {isNewGroup} = useSelector((state)=>state.additional)
  const groupName = useInputValidation("");
  const dispatch = useDispatch();
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  // console.log(data);
  const [newGroup,isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)
  const [selectedMembers, setSelectedMembers] = useState([]);
  const submitHandler = () => {
    if(!groupName.value)return toast.error("Group name is required");
    if(selectedMembers.length<2)
      return toast.error("Please select at least 2 members");
    //creating group
    newGroup("Creating new group...",{name:groupName.value,members:selectedMembers})

    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setisNewGroup(false))
  };
  const errors = [{isError, error}];
  useErrors(errors);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );

  };
  return (
    <Dialog  onClose={closeHandler} open={isNewGroup}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"20rem"} display={"flex"} justifyContent={"center"}>
        <DialogTitle textAlign={"center"} variant="h5">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
                // handlerIsLoading={isLoadingSendRequest}
              />
            ))
          )}
          <Stack direction={"row"} justifyContent={"space-evenly"}>
            <Button variant="text" color="error" size="large" onClick={closeHandler}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={submitHandler}
              disabled= {isLoadingNewGroup}
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
