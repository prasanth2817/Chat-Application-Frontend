import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosService from "../Common/ApiServices";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AxiosService.post("/user/register", {
        fullName,
        userName,
        email,
        password,
      });
      if (res.status === 201) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error Occurred! Please try again later."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
      <div className="w-9/12 md:w-full max-w-sm p-6 rounded-lg shadow-xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h2 className="text-3xl font-semibold text-center text-gray-300">
          Sign <span className="text-blue-500 font-extrabold text-4xl">Up</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-base label-text">Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              onChange={(e) => setFullName(e.target.value)}
              className="w-full input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <label className="text-base label-text">User Name</label>
            <input
              type="text"
              placeholder="Enter User Name"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <label className="text-base label-text">Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <label className="text-base label-text">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div className="mt-8">
            <button className="btn btn-block btn-sm mt-2">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
