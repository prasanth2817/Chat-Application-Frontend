import { useState } from "react";
import AxiosService from "../Common/ApiServices";
import { toast } from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const validateEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      let res = await AxiosService.post("/user/forget-password", { email });
      setEmail("");
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setEmail("");
      if (error.response?.status === 401) {
        toast.error(
          "Password reset link has expired. Please initiate the process again."
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Error Occurred! Please try after some time."
        );
      }
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center mt-12">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={validateEmail} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
