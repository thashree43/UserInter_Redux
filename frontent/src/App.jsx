import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './store';
import Userroute from './Routes/Userroute';
import Adminroute from './Routes/Adminroute';

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
