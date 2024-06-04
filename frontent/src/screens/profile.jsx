import { useSelector } from 'react-redux';
import { Button, Image, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log('userInfo:',userInfo);

  const handleEdit = () => {
    navigate('/edit-profile');
  };

  return (
    <Container>
      <h1>Profile</h1>
      <div className="text-center mb-4">
        <Image
          src={userInfo.image}
          alt="profile"
          roundedCircle
          fluid
          className="mb-3"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      </div>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <Button onClick={handleEdit} variant="primary">Edit Profile</Button>
    </Container>
  );
};

export default Profile;
