import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Adminhome = () => {
    const { adminInfo } = useSelector((state) => state.admin);
    const adminData = adminInfo?.admindata; // Access the nested admindata object
    console.log("the admindata by adminInfo ==", adminData);

    return (
        <div className='py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-45 bg-yellow-200'>
                    <div>
                        <h1>Welcome, {adminData?.name}!</h1>
                        <p>
                            You are logged in. <br /> Your email id is {adminData?.email}
                        </p>
                    </div>
                    <div className="mt-4 w-full flex justify-center">
                        <Link to='/admin/admindasboard'>
                    <Button className="flex items-center bg-white border hover:bg-indigo-500 hover:text-white transition duration-500  border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        GO TO DASHBOARD</Button>
                        </Link>
                    </div>
                    
                </Card>
            </Container>
        </div>
    );
};

export default Adminhome;