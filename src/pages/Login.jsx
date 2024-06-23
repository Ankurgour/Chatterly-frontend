import { useFileHandler, useInputValidation } from "6pp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../Components/styles/StyledComponents";
import { server } from "../constants/config.js";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/Validators";
import { bluegrey } from "../constants/color.js";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const divStyle = {
  //   background: "rgb(238, 174, 202)",
  //   background:
  //     "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
  // };
  const divStyle = {
    // background: "linear-gradient(to right, #a1c4fd, #c2e9fb)"
    background: bluegrey,
  };

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing up...");

    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  // const password = useStrongPassword();
  const password = useInputValidation("");
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div style={divStyle}>
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
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
            margin: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: {
              xs: "7rem",
              lg:"0rem",
              md: "0rem",
            },
            gap:"0.5rem"
         
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5" color={bluegrey} fontWeight={600}>
                Login
            </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Typography textAlign={"center"} m={"0.5rem"}>
                  OR
                </Typography>
                <Button
                  disabled={isLoading}
                  variant="text"
                  color="primary"
                  onClick={toggleLogin}
                  fullWidth
                  style={{ fontSize: "12px" }}
                >
                  Don't have an account? Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" color={bluegrey} fontWeight={600}>Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "0rem",
                  // height:"100vh"
                }}
                onSubmit={handleSignUp}
              >
                <Stack
                  position="relative"
                  width="8rem"
                  height="8rem"
                  margin="auto"
                  // mb="30px"
                >
                  <Avatar
                    sx={{
                      width: "85%",
                      height: "85%",
                      objectFit: "cover",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      postition: "absolute",
                      bottom: "-0.2rem",
                      right: "-2.4rem",
                      color: "white",
                      bgcolor: "rgb(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgb(0,0,0,0.7)",
                      },
                      width: "2rem",
                      height: "2rem",
                    }}
                    component="label"
                  >
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    margin={"1rem"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}
                <Button
                  // sx={{ marginTop: "1rem" }}
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                <Typography textAlign={"center"} m="1rem">
                  OR
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  onClick={toggleLogin}
                  fullWidth
                  disabled={isLoading}
                  sx={{
                  position: "relative",
                  bottom:"1rem"
                  }}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
