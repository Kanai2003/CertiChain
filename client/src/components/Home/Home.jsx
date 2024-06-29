import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "./fonts.css";
import EmployerLogin from "./employer-login/EmployerLogin";
import EmployerSignup from "./employer-signup/EmployerSignup.jsx/EmployerSignup";
import CandidateView from "./candidate-view/CandidateView";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RegistrationModal from "./Auth/Register";
import LoginModal from "./Auth/Login";
import { login, logout } from "../../store/actions/authActions"; // Adjust path as per your project structure
import CreateOfferLetterModal from "./OfferLetter/CreateOfferLetter";
import IconBox from "./IconBox";

function Home() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOfferLetterModalOpen, setIsOfferLetterModalOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user); // Add this line to get user data
  console.log("User Data", user);

  const handleLogin = (user) => {
    dispatch(login(user));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: `url(/assets/bg.jpg)`,
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Navbar
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "120px",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#FFFFFF",
            fontFamily: "Irish Grover",
            textAlign: "center",
          }}
          variant="h2"
        >
          Welcome{" "}
          {isLoggedIn ? <span style={{ color: "blue" }}>{user.name}</span> : ""}{" "}
          to <br />
          <span style={{ color: "blue" }}>CertiChain</span>
        </Typography>
        <Typography
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            paddingTop: "15px",
          }}
          variant="h6"
        >
          A decentralised platform to generate and store all your Offer Letters
          securely.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        {isLoggedIn ? (
          user.role === "organization" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "50%",
                marginY: "20px",
              }}
            >
              <IconBox
                icon={
                  <CreateIcon sx={{ fontSize: 60, color: "primary.main" }} />
                }
                text="Create Offer Letter"
                onClick={() => setIsOfferLetterModalOpen(true)}
              />
              <IconBox
                icon={
                  <VisibilityIcon
                    sx={{ fontSize: 60, color: "primary.main" }}
                  />
                }
                text="View asigned Offer Letters"
                onClick={() => console.log("View all the offer letters")}
              />
            </Box>
          ) : (
            <IconBox
              icon={<CreateIcon sx={{ fontSize: 60, color: "primary.main" }} />}
              text="View Offer Letters"
              onClick={() => console.log("View all the offer letters")}
            />
          )
        ) : (
          // Login and Signup Box
          <Box>Login and Signup Box</Box>
        )}
      </Box>
      <Box>
        <RegistrationModal
          isOpen={isRegisterModalOpen}
          setIsOpen={setIsRegisterModalOpen}
        />
        <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
        <CreateOfferLetterModal
          open={isOfferLetterModalOpen}
          handleClose={setIsOfferLetterModalOpen}
        />
      </Box>
    </Box>
  );
}

export default Home;
