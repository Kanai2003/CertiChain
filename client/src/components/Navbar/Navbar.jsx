import React from "react";
import { Box, Typography, Button } from "@mui/material";

function Navbar({ setIsRegisterModalOpen, setIsLoginModalOpen}) {
  const user = 0;


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "rgba(124, 122, 122, 0.88)",
        position: "fixed",
        top: "0",
        width: "100%",
        color: "#ffffff",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: "bolder",
            paddingLeft: "20px",
            cursor: "pointer",
          }}
        >
          CertiChain
        </Typography>
      </Box>

      <Box
        sx={{
          marginRight: "10px",
        }}
      >
        {["Home", "About", "Contact Us"].map((item, key) => (
          <Button
            sx={{
              color: "#FFFFFF",
              fontSize: "14px",
              marginLeft: "10px",
              fontWeight: "600",
              transition: ".3s",
              "&:hover": {
                color: "black",
                display: {
                  transform: "translateY(-2px)",
                },
              },
            }}
          >
            {item}
          </Button>
        ))}
        {user ? (
          <Button
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "600",
              marginLeft: "10px",
              transition: ".3s",
              marginRight: "30px",
              "&:hover": {
                backgroundColor: "gray",
                color: "#ffffff",
                display: {
                  transform: "translateY(-5px)",
                },
              },
            }}
            variant="contained"
          >
            LOGOUT
          </Button>
        ) : (
          <>
          <Button
            variant="contained"
            onClick={() => setIsLoginModalOpen(true)}
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "600",
              marginLeft: "10px",
              transition: ".3s",
              marginRight: "30px",
              "&:hover": {
                backgroundColor: "gray",
                color: "white",
                display: {
                  transform: "translateY(-5px)",
                },
              },
            }}
          >
            LOGIN
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsRegisterModalOpen(true)}
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: "600",
              transition: ".3s",
              marginRight: "30px",
              "&:hover": {
                backgroundColor: "gray",
                color: "white",
                display: {
                  transform: "translateY(-5px)",
                },
              },
            }}
          >
            Register
          </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
