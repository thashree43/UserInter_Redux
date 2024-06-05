import { useState, useEffect } from 'react';
import { Form, Button, Image, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminupdateUserMutation } from "../Adminslice/adminapislice";
import { setSelectedUser } from '../Adminslice/adminauthslice';
const AdminEditProfile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
      mode: "onTouched"
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.admin);

  const [adminupdateUser] = useAdminupdateUserMutation();

  useEffect(() => {
      if (selectedUser) {
          setValue('name', selectedUser.name);
          setValue('email', selectedUser.email);
          setValue('image', selectedUser.image);
          setImagePreview(selectedUser.image);
      }
  }, [selectedUser, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (image) formData.append('image', image);
  
    try {
        const res = await adminupdateUser({ id: selectedUser._id, formData }).unwrap();
        console.log("the whole res may here", res);
        dispatch(setSelectedUser(res));
        console.log("sddfas");
        navigate('/admin/admindashboard');
        toast.success('Profile updated successfully'); // Display success toast
    } catch (err) {
        toast.error(err?.data?.message || err.error); // Display error toast
    }
  };
  

    return (
        <Container>
            <h1>Edit Profile</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        {...register('name', { required: "Enter your name" })}
                    ></Form.Control>
                    {errors.name && (
                        <p className="text-xs m-2 text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        {...register('email', {
                            required: "Enter your email",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Invalid email address"
                            }
                        })}
                    ></Form.Control>
                    {errors.email && (
                        <p className="text-xs m-2 text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </Form.Group>
                <Form.Group className='my-2' controlId='image'>
                    <Form.Label>Profile Image</Form.Label>
                    {imagePreview && (
                        <Image src={imagePreview} roundedCircle className="my-3"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                    )}
                    <Form.Control
                        type='file'
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    ></Form.Control>
                    {errors.image && (
                        <p className="text-xs m-2 text-red-600">
                            {errors.image.message}
                        </p>
                    )}
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>
                    Update
                </Button>
            </Form>
        </Container>
    );
};

export default AdminEditProfile;
