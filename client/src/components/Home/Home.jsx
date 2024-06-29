import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Typography } from '@mui/material'
import './fonts.css'
import EmployerLogin from './employer-login/EmployerLogin'
import EmployerSignup from './employer-signup/EmployerSignup.jsx/EmployerSignup'
// import CreateOfferLetter from './create-offer-letter/CreateOfferLetter'
import CandidateView from './candidate-view/CandidateView'
import RegistrationModal from './Auth/Register'
import LoginModal from './Auth/Login'

function Home() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <Box>
      <Navbar setIsLoginModalOpen={setIsLoginModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen} />
      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(/assets/bg.jpg)`,
          height: '100vh',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "70px",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              color: "#FFFFFF",
              fontFamily: "Irish Grover",
              textAlign: "center",
            }}
          >
            Welcome to <br />
            CertiChain
          </Typography>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: "bold",
              paddingTop: "15px",
            }}
          >
            A decentralised platform to generate and store all your Offer
            Letters securely.
          </Typography>
        </Box>
      </Box>
      <Box>
          <RegistrationModal isOpen={isRegisterModalOpen} setIsOpen={setIsRegisterModalOpen}/>
          <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen}/>
          <EmployerSignup />
          <EmployerLogin />
          <CandidateView />
      </Box>
    </Box>
  );
}

export default Home;
