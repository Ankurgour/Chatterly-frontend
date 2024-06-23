import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AdminLogin, getAdmin } from "../../redux/thunks/admin";
const divStyle = {
  background: 'rgb(238, 174, 202)',
  background: 'radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)',
  
};
// const isAdmin = true;
const adminLogin = () => {

  const {isAdmin}= useSelector((state)=>state.auth);
  const dispatch = useDispatch();
 const secretKey  = useInputValidation("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(AdminLogin(secretKey.value));
  }
  useEffect(()=>{
    dispatch(getAdmin())
  },[dispatch])
  if(isAdmin)return <Navigate to="/admin/dashboard" />
  return (
    <div style={divStyle}  >
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        // height: "100px",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          margin:1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
         
            <Typography variant="h5"> Admin Login</Typography>
            <form onSubmit={submitHandler}>
            
              <TextField
                required
                fullWidth
                label="Secret Key"
                type="password"
                margin="normal"
                variant="outlined"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
               Login
              </Button>
              
            </form>
        
         
      </Paper>
    </Container>
    </div>
  )
}

export default adminLogin;
