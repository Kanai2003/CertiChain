import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const IconBox = ({ icon, text, onClick }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "10rem",
        height: "10rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "rgba(124, 122, 122, 0.18)",
        backdropFilter: "blur(10px)",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: "5rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h6"
        align="center"
        color={"white"}
        fontWeight={"bold"}
      >
        {text}
      </Typography>
    </Paper>
  );
};

export default IconBox;
