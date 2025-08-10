import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

const SignupDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://cms-backend-dah2.onrender.com/api/customer/signup',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.status === 'success') {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        }, 4000);
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle component="div">
        <Typography variant="h5" align="center">
          Create Account
        </Typography>
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {success ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                Registration successful! You can now log in.
              </Alert>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : null}

            <TextField
              required
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading || success}
              fullWidth
            />
            <TextField
              required
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading || success}
              fullWidth
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading || success}
              fullWidth
            />
            <TextField
              required
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading || success}
              error={formData.password !== formData.confirmPassword}
              helperText={
                formData.password !== formData.confirmPassword 
                  ? "Passwords don't match" 
                  : ""
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={onClose} 
            color="error"
            sx={{ mr: 'auto' }}
            disabled={loading || success}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            size="large"
            disabled={loading || success}
            sx={{
              backgroundColor: '#4361ee',
              '&:hover': {
                backgroundColor: '#3a56d4'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SignupDialog;