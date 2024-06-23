import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hoooks'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { setisAddMember } from '../../redux/reducers/additonal'
import UserItem from '../shared/userItem'


const AddMemberDialog = ({chatId}) => {
  // console.log(chatId);
    // const [members,setMembers] = useState(sampleUsers);
    const dispatch = useDispatch();
  const [selectedMembers,setSelectedMembers] = useState([]);
  const {isAddMember} = useSelector((state=>state.additional));
  const {isLoading,error,isError,data} = useAvailableFriendsQuery(chatId);
  const [addMembers,isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]);
  };

    const closeHandler=()=>{
        dispatch(setisAddMember(false));
    }
    const addMemberSubmitHandler =()=>{
      addMembers("Adding member...",{members:selectedMembers,chatId})
        closeHandler();
    }
    const errors = [{
      isError:isError,error:error}
    ]
  useErrors(errors);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        
        <Stack spacing={"1rem"}>
            {isLoading?<Skeleton/>:data?.friends?.length>0 ?( data?.friends?.map((user)=>(
                <UserItem key={user._id} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
            ))):<Typography textAlign={"center"}>No Friends</Typography>}
        </Stack>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"} ><Button  color='error' onClick={closeHandler}>Cancel</Button>
        <Button onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingAddMembers}>Submit Changes</Button></Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMemberDialog
