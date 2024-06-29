import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import './fonts.css';
import EmployerLogin from './employer-login/EmployerLogin';
import EmployerSignup from './employer-signup/EmployerSignup.jsx/EmployerSignup';
import CandidateView from './candidate-view/CandidateView';
import RegistrationModal from './Auth/Register';
import LoginModal from './Auth/Login';
import { login, logout } from '../../store/actions/authActions'; // Adjust path as per your project structure

function Home() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user); // Add this line to get user data
  console.log("User Data",user);

  const handleLogin = (user) => {
    dispatch(login(user));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <Navbar setIsLoginModalOpen={setIsLoginModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen} />
      <Box
        sx={{
          width: '100%',
          backgroundImage: `url(/assets/bg.jpg)`,
          height: '100vh',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '70px',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontSize: '36px',
              color: '#FFFFFF',
              fontFamily: 'Irish Grover',
              textAlign: 'center',
            }}
          >
            Welcome to <br />
            CertiChain
          </Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 'bold',
              paddingTop: '15px',
            }}
          >
            A decentralised platform to generate and store all your Offer
            Letters securely.
          </Typography>
        </Box>
      </Box>
      <Box>
        {/* Pass isOpen and setIsOpen props to modals */}
        <RegistrationModal isOpen={isRegisterModalOpen} setIsOpen={setIsRegisterModalOpen} />
        <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
        {/* Render other components */}
        <EmployerSignup />
        <EmployerLogin />
        <CandidateView />
      </Box>
      
    </Box>
  );
}

export default Home;
