import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hoooks.jsx";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setisSearch } from "../../redux/reducers/additonal";
import UserItem from "../shared/userItem";
const Search = () => {
  const search = useInputValidation("");
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.additional);
  const user = useSelector((state) => state.auth);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest,isLoadingSendRequest] = useAsyncMutation(useSendFriendRequestMutation)
  const [users, setUsers] = useState([]);
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...",{userId:id},)
  };
  const SearchCloseHandler = () => {
    dispatch(setisSearch(false));
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={SearchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
