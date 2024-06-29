import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

import { BASE_URL } from '../../../constant';

const roles = ['organization', 'candidate'];

const RegistrationModal = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        return setError('Passwords do not match');
      }
      const response = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
        withCredentials: true
      });

      setSuccess(response.data.message);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        role: '',
        address: '',
        password: '',
        confirmPassword: ''
      });

      setTimeout(() => {
        setSuccess(null);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: '.3s ease-in-out',
        width: '400px',
        backgroundColor: "rgba(124, 122, 122, 0.68)",
        backdropFilter: 'blur(10px)',
        boxShadow: '24px',
        padding: '40px',
        borderRadius: '2px',
        height: '80vh',
        overflow: 'auto',
        color: '#FFFFFF'
      }}>
        <Typography variant="h6" textAlign={'center'}>
          Create an Account
        </Typography>
        <hr width='80%' />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: '#ffffff' } // Placeholder color
            }}
            InputProps={{
              style: { color: '#ffffff' } // Input text color
            }}
            sx={{
              border: '2px solid #ffffff',
              borderRadius: '5px'
            }}
          />
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
              style: { color: '#ffffff' } // Placeholder color
            }}
            InputProps={{
              style: { color: '#ffffff' } // Input text color
            }}
            sx={{
              border: '2px solid #ffffff',
              borderRadius: '5px'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mobile"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: '#ffffff' } // Placeholder color
            }}
            InputProps={{
              style: { color: '#ffffff' } // Input text color
            }}
            sx={{
              border: '2px solid #ffffff',
              borderRadius: '5px'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: '#ffffff' } // Placeholder color
            }}
            InputProps={{
              style: { color: '#ffffff' } // Input text color
            }}
            sx={{
              border: '2px solid #ffffff',
              borderRadius: '5px'
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: '#ffffff' } // Placeholder color
            }}
            InputProps={{
              style: { color: '#ffffff' } // Input text color
            }}
            sx={{
              border: '2px solid #ffffff',
              borderRadius: '5px'
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
              style: { color: '#ffffff' } // Placeholder color
            }}
            InputProps={{
              style: { color: '#ffffff' } // Input text color
            }}
            sx={{
              border: '2px solid #ffffff',
              borderRadius: '5px'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: '#ffffff' } // Placeholder color
            }}
            InputProps={{
              style: { color: '#ffffff' } // Input text color
            }}
            sx={{
              border: '2px solid #ffffff',
              borderRadius: '5px'
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
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default RegistrationModal;