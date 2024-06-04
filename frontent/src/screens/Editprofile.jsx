import  { useState, useEffect } from 'react';
import { Form, Button, Image, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slice/userapiSlice';
import { setCredentials } from '../slice/authSlice.js';

const EditProfile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: "onTouched"
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser, ] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setValue('name', userInfo.name);
      setValue('email', userInfo.email);
      setValue('image', userInfo.image)
      setImagePreview(userInfo.image);
    }
  }, [userInfo, setValue]);

  // const handleImage = (event) => {
  //   const file = event.target.files[0];
  //   console.log('iam image', file)
  //   setImage(file);
  //   console.log('setter,', image)
  //   setImagePreview(URL.createObjectURL(file));
  // };

  // const validateFile = (fileList) => {
  //   if (fileList.length === 0) return "Please upload an image";
  //   const file = fileList[0];
  //   const allowedTypes = [
  //     'image/jpeg',
  //     'image/png',
  //     'image/gif',
  //     'image/bmp',
  //     'image/tiff',
  //     'image/webp'
  //   ];
  //   return allowedTypes.includes(file.type) || "Only jpg, jpeg, png, gif, bmp, tiff, webp files are allowed";
  // };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    console.log('image.................', image)
    console.log('setVlIma', data.image)
    if (image) formData.append('image', image);

    try {
      const res = await updateUser(formData).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <h1>Edit Profile</h1>
      <Form onSubmit={handleSubmit(onSubmit)} >
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
            // {...register('image', {
            //   validate: validateFile
            // })}
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

export default EditProfile;
