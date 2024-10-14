// import { useState } from 'react'
// import AxiosService from '../Common/ApiServices'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import {toast} from 'react-toastify'
// import { Card } from 'react-bootstrap';

// function ForgotPassword() {

//     let[email,setEmail]=useState(" ");

//     const validateEmail=async(e)=>{
//       e.preventDefault()
//         try {
//             let res= await AxiosService.post("/user/forget-password",{email})
//             console.log(res);
//             if(res.status===200){
//               toast.success(res.data.message)
//             }else
//             toast.error(error.response.data.message)
//             console.error(res.data.message);            
//         } catch (error) {
//           if (error.response.status === 401) {
//             // Token expired, display notification to the user
//             toast.error("Password reset link has expired. Please initiate the process again.");
//           } else {
//             toast.error(
//               error.response.data.message || "Error Occurred! Please try after some time"
//             );
//           }
//         }
//     }
//   return <>
//   <div className='container card-style-align mt-12'>
//    <Card className='card-style' border="dark">
//         <Card.Header>ForgotPassword</Card.Header>
//         <Card.Body>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control className='textbox' type="email" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)} />
//       </Form.Group>
//       <Button variant="dark" type="submit" onClick={(e)=>validateEmail(e)}>
//       submit
//     </Button>
//         </Card.Body>
//       </Card>
//    </div>
//   </>
// }

// export default ForgotPassword

import { useState } from 'react';
import AxiosService from '../Common/ApiServices';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const validateEmail = async (e) => {
        e.preventDefault();
        // Prevent the function from proceeding if email is empty
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
                toast.error("Password reset link has expired. Please initiate the process again.");
            } else {
                toast.error(error.response?.data?.message || "Error Occurred! Please try after some time.");
            }
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center mt-12">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
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
