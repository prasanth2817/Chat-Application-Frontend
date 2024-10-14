// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useAuthContext } from '../Context/AuthContext';
// import AxiosService from '../Common/ApiServices';
// import Spinner from "react-bootstrap/Spinner";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const { setIsLoggedIn } = useAuthContext();
//     const navigate = useNavigate();

//     const validateLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const res = await AxiosService.post("/user/login", { email, password });
//             if (res.status === 200) {
//                 toast.success(res.data.message);
//                 Storage.setItem("token", res.data.token);
//                 setIsLoggedIn(true);
//                 navigate("/");
//             }
//         } catch (error) {
//             toast.error(error.response.data.message || "Error Occurred! Please try after some time.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen text-center">
//                 <h4 className="mb-4">Validating user credentials! Please wait...</h4>
//                 <Spinner animation="border" role="status" />
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-4 flex flex-col items-center">
//             <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
//                 <h2 className="text-2xl font-bold mb-4">Login Page</h2>
//                 <form onSubmit={validateLogin} className="space-y-4">
//                     <div>
//                         <label className="block text-gray-700">Email address</label>
//                         <input 
//                             type="email" 
//                             placeholder="Enter email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-200"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-200"
//                         />
//                     </div>
//                     <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
//                         Login
//                     </button>
//                 </form>
//                 <div className="mt-4 text-gray-600">
//                     <p className="text-sm">New User? <Link to="/signUp" className="text-cyan-600">Click here</Link></p>
//                     <p className="text-sm mt-2">Forgot Password? <Link to="/forgot-password" className="text-cyan-600">Click here</Link></p>
//                 </div>
//             </div>
//             <div className="mt-8 text-center">
//                 <h4 className="text-xl font-bold">For admin login</h4>
//                 <p>Email: admin123@gmail.com</p>
//                 <p>Password: admin@123</p>
//             </div>
//         </div>
//     );
// }

// export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/UseLogin";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='text'
							placeholder='Enter your Email'
							className='w-full input input-bordered h-10'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
