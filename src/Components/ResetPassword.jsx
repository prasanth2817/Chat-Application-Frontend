// import { useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Card from 'react-bootstrap/Card';
// import AxiosService from '../Common/ApiServices';
// import { toast } from 'react-toastify';
// import { useNavigate , useParams} from 'react-router-dom';


// function ResetPassword() {

//   let[newpassword,setNewpassword]=useState("")
//   let[confirmpassword,setConfirmpassword]=useState("")
//   const navigate= useNavigate()
//   let {token}= useParams();

//   const validatePassword=async(e)=>{
//     e.preventDefault()
//     try {
//       let res = await AxiosService.post("/user/reset-password",{
//         token,
//         newpassword: newpassword,
//         confirmpassword: confirmpassword,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     if(res.status===200){
//       toast.success(res.data.message)
//       navigate("/")
//     }
//     } catch (error) {
//       toast.error(error.response.data.message || "Error Occoured! Please try after some time")
//     }
    
//   }
//   return (
// <div className='container card-style-align'>
//   <Card className='card-style' style={{ width: '32rem' }}>
//         <Card.Header>Reset Password</Card.Header>
//         <Card.Body>
//         <Form >
//       <Form.Group className="mb-3" controlId="formBasicNewPassword">
//         <Form.Label>New Password</Form.Label>
//         <Form.Control className='textbox' type="password" placeholder="New Password"  onChange={(e)=>setNewpassword(e.target.value)} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
//         <Form.Label>Confirm Password</Form.Label>
//         <Form.Control className='textbox' type="password" placeholder="Confirm Password"  onChange={(e)=>setConfirmpassword(e.target.value)} />
//       </Form.Group>
//       <br />
//       <Button variant="dark" type="submit" onClick={(e)=>validatePassword(e)}>
//         Submit
//       </Button>
//     </Form>    
//         </Card.Body>
//       </Card>
//       </div>
//   )
// }

// export default ResetPassword

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosService from '../Common/ApiServices';
import { toast } from 'react-toastify';

function ResetPassword() {
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const validatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await AxiosService.post("/user/reset-password", {
        token,
        newpassword,
        confirmpassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error Occurred! Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Reset Password</h2>
        <form onSubmit={validatePassword}>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring"
              placeholder="New Password"
              onChange={(e) => setNewpassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
