import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Admincomponent/AdminLogin';
import Adminhome from '../Admincomponent/Adminhome';
import Adminheader from '../Admincomponent/AdminHeader';
import Admindashboard from '../Admincomponent/Admindashboard';
import AdminEditProfile from '../Admincomponent/AdminEditProfile';
import Adminadduser from '../Admincomponent/Adminadduser';

const Adminroute = () => {
  return (
    <>
      <Adminheader/>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path="/adminhome" element={<Adminhome/>}/>
        <Route path='/admindashboard' element={<Admindashboard/>}/>
        <Route path='/admin_editprofile/:id' element={<AdminEditProfile/>}/>
        <Route path='/adminadduser' element={<Adminadduser/>}/>
      </Routes>
    </>
  );
}

export default Adminroute;
