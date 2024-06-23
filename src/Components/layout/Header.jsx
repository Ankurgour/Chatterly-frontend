import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { bluegrey } from "../../constants/color";
import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config.js";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setisMobileMenuFriend,
  setisNewGroup,
  setisNotifications,
  setisSearch,
} from "../../redux/reducers/additonal.js";
import { resetNotificationCount } from "../../redux/reducers/chat.js";
// import Search from "../specific/Search";

const Search = lazy(() => import("../specific/Search"));
const Notification = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearch, isNotifications,isNewGroup } = useSelector(
    (state) => state.additional
  );
  const { notificationCount } = useSelector((state) => state.chat);


  const handleMobile = () => {
    dispatch(setisMobileMenuFriend(true));
  };
  const openSearchDialog = () => {
    dispatch(setisSearch(true));
  };
  const addHandle = () => {
    // console.log("search");
    dispatch(setisNewGroup(true));
  };
  const openNotification = () => {
    dispatch(setisNotifications(true));
    dispatch(resetNotificationCount());
  };
  const LogoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToGroups = () => navigate("/groups");
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"3.5rem"} margin={"0rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: bluegrey,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chatterly
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={addHandle}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroups}
              />
              <IconBtn
                title={"Notifications"}
                icon={<Notifications />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={LogoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search />
        </Suspense>
      )}
      {isNotifications && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? <Badge badgeContent={value} color="error">{icon}</Badge> : icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
