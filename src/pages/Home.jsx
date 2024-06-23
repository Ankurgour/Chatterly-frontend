import React from 'react'
import AppLayout from '../Components/layout/AppLayout'
import { Typography,Box } from '@mui/material';
import { lightbluegrey } from '../constants/color';

const Home = () => {
   
  return (
    <Box marginTop={".5rem"} bgcolor={lightbluegrey} height={"100%"}>
   <Typography p={"2rem"} variant='h4' textAlign={"center"}>Select a Friend to chat</Typography>
   </Box>
  )
}

export default AppLayout()(Home);
