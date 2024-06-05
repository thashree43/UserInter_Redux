import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homescreen from '../screens/Homescreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/profile';
import EditProfile from '../screens/Editprofile';
import Header from '../components/Header';


const Userroute = () => {
    return (
        <>
         <Header />
            <Routes>
               
                <Route path='/' element={<Homescreen />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
            </>
    )
}

export default Userroute
