import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hoooks";
import { useDispatch, useSelector } from "react-redux";
import { setisNotifications } from "../../redux/reducers/additonal";
import toast from "react-hot-toast";


const Notifications = () => {
  const {isNotifications} = useSelector(state=>state.additional)
  const dispatch = useDispatch();
  const {isLoading,data,isError,error} = useGetNotificationsQuery();
  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);
const friendRequestHandler = async({ _id, accept }) => {
  dispatch(setisNotifications(false));
  await acceptRequest("Accetping...",{requestId:_id,accept});
};
const closeHandler = () => {
  dispatch(setisNotifications(false));
  // console.log("hi");
};
useErrors([{error,isError}]);
  return (
    <Dialog open={isNotifications} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
        {isLoading?(<Skeleton/>):(<>
          {data?.allRequests?.length > 0 ? (
          data?.allRequests?.map((i) => (
            <NotificationItem
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
              key={i._id}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Notifications</Typography>
        )}
        </>)}
      </Stack>
    </Dialog>
  );
};
const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
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
          {`${name} sent you a friend request`}
        </Typography>
        <Stack direction={{
          xs:"column",
          sm:"row",
        }}>
          <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
          <Button color="error" onClick={()=>handler({_id,accept:false})}>Reject</Button>

        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
