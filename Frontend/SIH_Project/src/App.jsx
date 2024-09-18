
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.jsx';
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignupPage'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<><Navbar/> <SignUpPage/></>}/>
        <Route path='/sign-in' element = {<><Navbar/> <LoginPage/></>} />

<Route path='/landing' element={<><Navbar/><LandingPage/></>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
