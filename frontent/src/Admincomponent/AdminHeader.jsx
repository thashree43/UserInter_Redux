import { Nav, NavDropdown,Navbar,Container } from "react-bootstrap"
import { FaSignInAlt,  } from "react-icons/fa"
import { toast } from "react-toastify"
import { useAdminlogoutMutation} from "../Adminslice/adminapislice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {adminlogout} from "../Adminslice/adminauthslice"

const Adminheader = ()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [alogout] = useAdminlogoutMutation()
    const {adminInfo } = useSelector((state)=>state.admin)

    const admindata = adminInfo?.admindata
    const  handlesubmit = async()=>{
        try {
             await alogout().unwrap()
            dispatch(adminlogout())
            navigate('/admin')
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand>ADMIN INTER</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                {adminInfo ? (
                  <>
                    <NavDropdown title={admindata.name} id='username'>
        
                      <NavDropdown.Item onClick={handlesubmit}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link href='/admin'>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    )
}

export default Adminheader