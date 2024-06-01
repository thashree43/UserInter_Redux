import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slice/authSlice';
import { useLogoutMutation } from "../slice/userapiSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutapicall] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutapicall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand>USER INTER</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href='/login'>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                  <Nav.Link href='/register'>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
