import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../store/actions/authActions"; // Only import login action here
import { BASE_URL } from "../../../constant"; // Corrected import path for constants

const LoginModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) || false;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        },
      );

      setSuccess(response.data.message);
      setFormData({
        email: "",
        password: "",
      });

      // Dispatch login action with user data (if needed)
      dispatch(login(response.data.data.user));

      setTimeout(() => {
        setSuccess(null);
        setIsOpen(false);
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: ".3s ease-in-out",
          width: "400px",
          backgroundColor: "rgba(124, 122, 122, 0.68)",
          backdropFilter: "blur(10px)",
          boxShadow: "24px",
          padding: "40px",
          borderRadius: "2px",
          maxHeight: "80vh",
          color: "#FFFFFF",
        }}
      >
        <Typography variant="h6" textAlign={"center"}>
          Login to your account
        </Typography>
        <hr width="80%" />
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
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: "#ffffff" }, // Placeholder color
            }}
            InputProps={{
              style: { color: "#ffffff" }, // Input text color
            }}
            sx={{
              border: "2px solid #ffffff",
              borderRadius: "5px",
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: "#ffffff" }, // Placeholder color
            }}
            InputProps={{
              style: { color: "#ffffff" }, // Input text color
            }}
            sx={{
              border: "2px solid #ffffff",
              borderRadius: "5px",
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
