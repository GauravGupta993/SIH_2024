import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.jsx';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignupPage';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import StudentLandingPage from './components/studentslanding.jsx'; // Add student landing page


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Navbar /> <SignUpPage /></>} />
        <Route path='/sign-in' element={<><Navbar /> <LoginPage /></>} />

        {/* Landing page based on role */}
        <Route path='/landing' element={<><LandingPage /></>} />
        <Route path='/studentslanding' element={<><StudentLandingPage /></>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
