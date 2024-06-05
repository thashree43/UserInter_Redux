import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './store.jsx';
import Userroute from './Routes/Userroute.jsx';
import Adminroute from './Routes/Adminroute.jsx';

const App = () => {
  return (
    <Provider store={Store}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/*' element={<Userroute />} />
          <Route path='/admin/*' element={<Adminroute />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
