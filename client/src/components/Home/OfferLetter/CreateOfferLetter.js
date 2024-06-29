import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function CreateOfferLetterModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    candidate: "",
    position: "",
    salary: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/offerLetter`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("Offer letter created:", response.data);

      setSuccess(response.data.message);
      setFormData({
        candidate: "",
        position: "",
        salary: "",
        date: "",
      });
      setTimeout(() => {
        setSuccess(null);
        handleClose(false);
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <Box sx={style}>
        <Typography variant="h6" textAlign={"center"} gutterBottom>
          CREATE OFFER LETTER
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Candidate Email"
            name="candidate"
            value={formData.candidate}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Job Title"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default CreateOfferLetterModal;
