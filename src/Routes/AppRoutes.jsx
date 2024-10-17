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
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default AppRoutes;
