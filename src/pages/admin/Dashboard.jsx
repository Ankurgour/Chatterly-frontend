import React from "react";
import AdminLayout from "../../Components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  Group as GroupIcon,
  Message as MessageIcon,
  NotificationsActive,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurvedButton,
  SearchField,
} from "../../Components/styles/StyledComponents";
import { DoughnutChart, LineChart } from "../../Components/specific/Charts";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { LayoutLoader } from "../../Components/layout/Loaders";
import { useErrors } from "../../hooks/hoooks";
const Dashboard = () => {
  const {loading,data,error} = useFetchData(`${server}/api/v1/admin/stats`,"dashboard-stats");
  const {stats} = data||{};
  useErrors([{
    isError:error,
    error:error,
  }]);
  const Appbar = (
    <Paper
      elevation={"3"}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsOutlined sx={{ fontSize: "3rem" }} />
        <SearchField type="text" placeholder="Search..." />
        <CurvedButton>Search</CurvedButton>
        <Box flexGrow={1}></Box>
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign="center"
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationsActive />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={stats?.UsersCount||0} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={stats?.TotalChatCount} Icon={<GroupIcon />} />
      <Widget title={"Messages"} value={stats?.MessagesCount} Icon={<MessageIcon />} />
    </Stack>
  );
  return loading?<LayoutLoader/>: (

    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack direction={{
          xs:"column",
          lg:"row"
        }} spacing="2rem" flexWrap="wrap" justifyContent={"center"} alignItems={{
          xs:"center",
          lg:"stretch",
        }}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "40rem",
              // height: "25rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
            <LineChart value={stats?.messagesChart||[1,2,12,6,22]}/>
          </Paper>

          <Paper
            elevation="3"
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              maxWidth: "25rem",
              
              // height: "25rem",
            }}
          >
            <DoughnutChart value={[stats?.TotalChatCount-stats?.groupsCount || 0,stats?.groupsCount|| 0]} labels={["Single Chats","Group Chats"]}/>

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon /> <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper elevation={3} sx={{
    padding:"2rem",
    margin:"2rem 0",
    borderRadius:"1.5rem",
    width:"20rem",
  }}>
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography sx={{
        color:"rgba(0,0,0,0.7)",
        borderRadius:"50%",
        border:"5px solid rgba(0,0,0,0.9)",
        width:"5rem",
        height:"5rem",
        display:"flex",
        justifyContent:"center",
        alignItems: "center",

      }}>{value}</Typography>
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
