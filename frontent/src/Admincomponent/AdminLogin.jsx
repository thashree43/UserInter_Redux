// import Forms from "../components/Forms"
// import {Form,Row,Col,Button} from "react-bootstrap"
// import { useForm } from "react-hook-form"
// import {useDispatch,useSelector} from "react-redux"
// import { useNavigate } from "react-router" 
// import {Link} from "react-router-dom"
// import { useEffect } from "react";
// import {useAdminloginMutation} from "../Adminslice/adminapislice"
// import {setadminlogin} from "../Adminslice/adminauthslice"
// import { toast } from "react-toastify"


// const AdminLogin =()=>{

//     const {register,handleSubmit,formState:{errors}} = useForm({mode:'onTouched'})
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [adminlogin ] = useAdminloginMutation();
//     const {adminInfo} = useSelector((state)=>state.admin)

//     useEffect(()=>{
//         if(adminInfo){
//             navigate('/adminhome')
//         }
//     },[navigate,adminInfo])
 
//     const onSubmit = async(data)=>{
//         try {
//             const res = await adminlogin(data).unwrap();
//             dispatch(setadminlogin({...res}));
//             toast.success("admin successfully logined in ");
//             navigate('/adminhome')
//         } catch (error) {
//             toast.error(error.data.message || error.error)
//         }
//     }

//     return(
//         <div className="login-background bg-slate-500">
//         <Forms>
//           <Form  onSubmit={handleSubmit(onSubmit)}>
//             <h1 className="text-center mb-4">Login Form</h1>
//             <Form.Group as={Row} className="mb-3">
//               <Form.Label column sm="2">Email</Form.Label>
//               <Col sm="10">
//                 <Form.Control
//                   placeholder="example@gmail.com"
//                   {...register('email', {
//                     required: 'Enter email',
//                     pattern: {
//                       value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                       message: 'Invalid email address',
//                     },
//                   })}
//                 />
//                 {errors.email && (
//                   <p className="text-xs m-2 text-red-600">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </Col>
//             </Form.Group>
  
//             <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
//               <Form.Label column sm="2">Password</Form.Label>
//               <Col sm="10">
//                 <Form.Control
//                   type="password"
//                   placeholder="Password"
//                   {...register('password', {
//                     required: 'Enter the password',
//                     pattern: {
//                       value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/,
//                       message: 'Password must include at least one uppercase letter, one special character, one number, and be at least 8 characters long',
//                     },
//                   })}
//                 />
//                 {errors.password && (
//                   <p className="text-xs m-2 text-red-600">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </Col>
//             </Form.Group>
  
//             <Row className="justify-content-center mb-6">
//               <Col sm="2">
//                 <Button
//                   as="input"
//                   type="submit"
//                   value="Login"
//                   variant="success"
//                   className="bg-green-600"
//                 />
//               </Col>
//             </Row>
//           </Form>
  
//           <Row className="py-3">
//             <Col>
//               Return to user? <Link to="/login">User Login</Link>
//             </Col>
//           </Row>
//         </Forms>
//       </div>
//     )
// }

// export default AdminLogin