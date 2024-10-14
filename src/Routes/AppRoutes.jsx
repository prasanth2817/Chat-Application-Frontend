import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "../Components/CreateUser";
import Login from "../Components/LoginPage";
import ForgotPassword from "../Components/ForgotPassword";
import ResetPassword from "../Components/ResetPassword";
import Home from "../Components/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

function AppRoutes() {
  const { authUser } = useAuthContext();
  return (
    <>
    <Routes> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/signUp" element={<SignUp />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path='/home' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      <Route path="/" element={<Login />} />
    </Routes>
    <Toaster />
    </>
  );
}

export default AppRoutes;