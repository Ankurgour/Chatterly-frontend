import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import {Close as CloseIcon,ExitToApp as ExitToAppIcon,Menu as MenuIcon} from '@mui/icons-material'
import { useLocation,Link as LinkComponent, Navigate} from "react-router-dom"
// import { adminTabs } from '../../constants/route'
// import {Link} from '../../Components/styles/StyledComponents';
import { Dashboard as DashboardIcon,ManageAccounts as ManageAccountsIcon,Groups as GroupIcon,Message as MessageIcon,ExitToApp } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../redux/thunks/admin';

const Link = styled(LinkComponent)`
text-decoration: none;
border-radius:2rem;
padding:1rem 2rem;
color:black;
&:hover{
  ${'' /* color:rgba(0,0,0,0.54); */}
  color:green;
}
`;
 const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon/>
},
{
  name: "Users",
  path: "/admin/user-management",
  icon: <ManageAccountsIcon/>
},
{
  name: "Chats",
  path: "/admin/chats-management",
  icon: <GroupIcon/>
},
{
  name: "Messages",
  path: "/admin/message-management",
  icon: <MessageIcon/>
}
];


const Sidebar=({w="100%"})=>{
  const location = useLocation();
  const dispatch = useDispatch();
  const logouthandler=()=>{
    // console.log("logouthandler");
    dispatch(adminLogout());
  }
    return <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant='h5' textTransform={"uppercase"}>Admin</Typography>

      <Stack spacing={"1rem"}>
      {adminTabs.map((i)=>(
        <Link key={i.path} to={i.path} sx={location.pathname===i.path && {
          bgcolor:"black",
          color:"white"
        }}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          {i.icon}
          <Typography fontSize={"1.2rem"}>{i.name}</Typography>
          </Stack>
        </Link>
      ))}

      <Link onClick={logouthandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
         <ExitToAppIcon/>
          <Typography fontSize={"1.2rem"}>Logout</Typography>
          </Stack>
        </Link>
      

      </Stack>
    </Stack>
}

// const isAdmin = true
const AdminLayout = ({children}) => {
  const {isAdmin}= useSelector((state)=>state.auth);

  const [ismobile,SetIsMobile] = useState(false);
  const handleMobile=()=>{
    SetIsMobile(!ismobile);
  }
  const handleClose = ()=>{
    SetIsMobile(false);
  }
  if(!isAdmin) return <Navigate to='/admin'/>
  return (
    <Grid container minHeight={"100vh"}>
    <Box
    sx={{display:{xs:"block",md:"none"},
    position:"fixed",
    right:"1rem",
    top:"1rem",
    }}
    >
<IconButton onClick={handleMobile}>

{ismobile ? <CloseIcon/>:<MenuIcon />}
</IconButton>
    </Box>
      <Grid item md={4} lg={3}
      sx={{display:{
        xs:"none",
        md:"block",
      }}}
      >
        <Sidebar/>
      </Grid>
      <Grid
      item
      xs={12}
      md={8}
      lg={9}
      sx={{bgcolor:"#f5f5f5",}}
      >
      {children}

      </Grid>
      <Drawer open={ismobile} onClose={handleClose}>
      <Sidebar w="50vw"/>

      </Drawer>
    </Grid>
  )
}

export default AdminLayout;
