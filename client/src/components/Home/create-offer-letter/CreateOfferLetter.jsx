import { Box, Typography } from "@mui/material";
import React from "react";

function CreateOfferLetter() {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(124, 122, 122, 0.88)",
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          width: "20px",
          height: "20px",
        }}
      ></Box>
      <Box sx={{}}>
        <Typography>Create Offer Letter</Typography>
      </Box>
    </Box>
  );
}

export default CreateOfferLetter;
