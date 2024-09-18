import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import React, {useState, useEffect } from "react";
import PrivateRoute from './components/PrivateRoute.jsx';
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignupPage'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar'
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(0);
  const checkAuthenticated = async () => {
    // try {
    //   const res = await fetch("http://localhost:5000/authentication/verify", {
    //     method: "POST",
    //     headers: { jwt_token: localStorage.token }
    //   });

    //   const parseRes = await res.json();
    //   parseRes === 1 ? setIsAuthenticated(1) : parseRes===2 ? setIsAuthenticated(2) : setIsAuthenticated(0);
    // } catch (err) {
    //   console.error(err.message);
    // }
    if(localStorage.jwtToken){
      console.log("KEY FOUND!");
      setIsAuthenticated(1);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);


  return (
    <>
    {/* <Navbar/> */}
    <BrowserRouter>
      <Routes>
      {/* element={
              <>isAuthenticated == 1 ? (
                <Home/>
              ) : (
                <>{<Navbar/> <SignUpPage/>}</>
              )</>
            } */}
          <Route path="/"
            element={
              isAuthenticated == 1 ? (
                <Home />
              ) : (
                <SignUpPage/>
              )
            }
          />
          <Route path="/sign-in"
            element={
              isAuthenticated == 1 ? (
                <Home />
              ) : (
                <LoginPage/>
              )
            }
          />
        {/* <Route path='/' element = {<><Navbar/> <SignUpPage/></>}/>
        <Route path='/sign-in' element = {<><Navbar/> <LoginPage/></>} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App