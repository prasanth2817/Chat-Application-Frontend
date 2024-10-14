// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Card from 'react-bootstrap/Card';
// import AxiosService from '../Common/ApiServices';
// import { useNavigate } from 'react-router-dom';
// import {toast} from 'react-toastify'

// function SignUp() {
//     let[firstName,setFirstName]=useState("");
//     let[lastName,setLastName]=useState("");
//     let[email,setEmail]=useState("");
//     let[password,setPassword]=useState("");
//     const navigate= useNavigate();

//     const handleSubmit=async(e)=>{
//         e.preventDefault()
//         try {
//             const res= await AxiosService.post("/user/register",{firstName,lastName,email,password})
//             if(res.status===201){
//               navigate("/login")
//               toast.success(res.data.message);
//             } 
//         } catch (error) {
//             toast.error(error.res.data.message || "Error Occoured! Please try after some time")
//         }
        
//     }
    
//   return<>
//   <div className='container card-style-align'>
//   <Card className='card-style' style={{ width: '100%' }}>
//         <Card.Header>Sign Up</Card.Header>
//         <Card.Body>
//         <Form >
//       <Form.Group className="mb-3" controlId="formBasicFirstName">
//         <Form.Label>FirstName</Form.Label>
//         <Form.Control className='textbox' type="text" placeholder="Enter FirstName" onChange={(e)=>setFirstName(e.target.value)} />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicLastName">
//         <Form.Label>LastName</Form.Label>
//         <Form.Control className='textbox' type="text" placeholder="Enter LastName"  onChange={(e)=>setLastName(e.target.value)} />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control className='textbox' type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control className='textbox' type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
//       </Form.Group>
      
//       <Button variant="dark" type="submit" onClick={(e)=>handleSubmit(e)}>
//         Sign Up
//       </Button>
//     </Form>    
//         </Card.Body>
//       </Card>
//       </div>
//   </>
// }

// export default SignUp

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import AxiosService from '../Common/ApiServices';

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await AxiosService.post("/user/register", { firstName, lastName, email, password });
            if (res.status === 201) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.res?.data?.message || "Error Occurred! Please try again later.");
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email address</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
