import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Typography variant="body2" align="center" sx={{ opacity: 0.9 }}>
        © {new Date().getFullYear()} LowCode CMS. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;