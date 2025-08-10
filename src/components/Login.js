import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const Login = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClickShowPassword = () => {
    setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('https://cms-backend-dah2.onrender.com/api/customer/signin', {
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('user_data', JSON.stringify(res.data.user));
      
      navigate(res.data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 450, 
      mx: 'auto', 
      mt: { xs: 4, md: 8 }, 
      p: 3,
      boxShadow: theme.shadows[3],
      borderRadius: 2,
      backgroundColor: 'background.paper'
    }}>
      <Typography variant="h5" component="div" align="center" gutterBottom sx={{ fontWeight: 600 }}>
        Welcome Back
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
        Sign in to your account
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="email"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={formData.showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Link component={RouterLink} to="/forgot-password" color="text.secondary">
            Forgot password?
          </Link>
        </Box>
        
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
          size="large"
          sx={{ mt: 3, py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </form>

      <Divider sx={{ my: 3 }} />

      <Typography align="center" color="text.secondary">
        Don't have an account?{' '}
        <Link component={RouterLink} to="/signup" color="primary" sx={{ fontWeight: 500 }}>
          Create one
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;