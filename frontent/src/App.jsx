
import Header from './components/Header.jsx'
import Homescreen from "./screens/Homescreen.jsx"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './screens/Login.jsx'
import Register from './screens/Register.jsx'
import Store from './store.jsx'
import {Provider} from 'react-redux'

const App = () => {
  return (
    <>
    <Provider store={Store}>
    <Header/>
    <Router>
      <Routes>
        <Route path='/' element={<Homescreen/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    </Provider>
    </>
  )
}

export default App
