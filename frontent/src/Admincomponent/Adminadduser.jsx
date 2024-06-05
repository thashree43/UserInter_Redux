import { Button, Col, Row } from "react-bootstrap"
import { Form } from "react-bootstrap"; 
import { Link, useNavigate } from "react-router-dom"
import Forms from "../components/Forms"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import {useAdminadduserMutation} from "../Adminslice/adminapislice"


const Adminadduser = () => {

    const navigate = useNavigate()
    const [Adminadduser] = useAdminadduserMutation()
    const {register,handleSubmit,formState:{errors}} = useForm({mode:'onTouched'})

    const onSubmit =async(data)=>{
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('image', data.image[0]); 
        try {
            const res = await Adminadduser(formData).unwrap()
            console.log(res,"the  data in the admin adduser side ");
            toast.success("user successfully added")
            navigate("/admin/admindashboard")
        } catch (error) {
            toast.error("failed to add user")
        }
    
    }
    const validateFile = (fileList) => {
        if (fileList.length === 0) return "Please upload an image";
        const file = fileList[0];
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/bmp',
          'image/tiff',
          'image/webp'
        ];
        return allowedTypes.includes(file.type) || "Only jpg, jpeg, png, gif, bmp, tiff, webp files are allowed";
      };
  return (
    <div className="register-background bg-slate-500">
      <Forms>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center mb-4">ADD USER</h1>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Name</Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="Your Name"
                {...register("name", { required: "Enter your name" })}
              />
              {errors.name && (
                <p className="text-xs m-2 text-red-600">{errors.name.message}</p>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Email</Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="example@gmail.com"
                {...register("email", {
                  required: "Enter your email",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs m-2 text-red-600">{errors.email.message}</p>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">Password</Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Enter your password",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/,
                    message: "Password must include at least one uppercase letter, one special character, one number, and be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-xs m-2 text-red-600">{errors.password.message}</p>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Image</Form.Label>
            <Col sm="10">
              <Form.Control
                type="file"
                {...register("image", {
                  validate: validateFile,
                })}
              />
            </Col>
          </Form.Group>
          <Row className="justify-content-center mb-6">
            <Col sm="2">
              <Button
                as="input"
                type="submit"
                value="Register"
                variant="success"
                className="bg-green-600"
              />
            </Col>
          </Row>
        </Form>
        <Row className="py-3">
          <Col>Already have an account? <Link to="/login">Dashboard</Link></Col>
        </Row>
      </Forms>
    </div>
  )
}

export default Adminadduser
