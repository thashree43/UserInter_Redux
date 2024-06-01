import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import Homescreen from './screens/Homescreen.jsx';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import Store from './store.jsx';
import Profile from './screens/profile.jsx';
import EditProfile from './screens/Editprofile.jsx';

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Homescreen />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
