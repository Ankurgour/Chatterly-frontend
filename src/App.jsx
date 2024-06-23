import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/auth/protectedRoute";
import { LayoutLoader } from "./Components/layout/Loaders";
import MessageComponent from "./Components/shared/MessageComponent";
// import { } from "@mui/icons-material";
import axios from "axios";
import { server } from "./constants/config.js";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFOund = lazy(() => import("./pages/NotFOund"));
const AdminLogin = lazy(() => import("./pages/admin/adminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin//UserManagement"));
const Messages = lazy(() => import("./pages/admin/MessageManagement"));
const ChatManagement = lazy(() => import("./pages/admin/chatManagment"));
import { userExists, userNotExists } from "./redux/reducers/auth.js";
import { useDispatch, useSelector } from "react-redux";
import {Toaster} from "react-hot-toast"
import { SocketProvider } from "./socket.jsx";

const App = () => {

  const {user,loader} = useSelector((state)=>state.auth);
  // console.log(user);
const dispatch = useDispatch();


  useEffect(() => {

    axios
      .get(`${server}/api/v1/user/profile`,{withCredentials:true})
      .then(({data}) =>dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  
// console.log(user);
  return loader?(<LayoutLoader/>): (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<SocketProvider><ProtectedRoute user={user} /></SocketProvider>}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
            {/* <Route path="*" element={<NotFOund />} /> */}
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/chats-management" element={<ChatManagement />} />
          <Route path="/admin/message-management" element={<Messages />} />

          <Route path="*" element={<NotFOund />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center"/>
    </BrowserRouter>
  );
};
export default App;
