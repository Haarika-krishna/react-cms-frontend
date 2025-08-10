import React from 'react';
import { Container, Box, Typography, Button,Paper, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../layout/Navbar';
import HeroCarousel from '../Carousel/HeroCarousel';
import ProjectShowcase from '../components/ProjectShowcase';
import Footer from '../layout/Footer';

// Gradient background container
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white'
}));

// Transparent content container
const TransparentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(4),
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  margin: theme.spacing(4, 0)
}));

const LandingPage = () => {
  const theme = useTheme();

  return (
    <GradientBackground>
      <Navbar transparent /> {/* Pass transparent prop if your Navbar supports it */}
      
      <HeroCarousel />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TransparentPaper>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome to Our Platform
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4 }}>
            Discover how our CMS can transform your workflow
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 25,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              Get Started
            </Button>
          </Box>
        </TransparentPaper>
      </Container>

      <ProjectShowcase gradient /> {/* Pass gradient prop if your component supports it */}
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TransparentPaper>
          <Typography variant="h4" align="center" gutterBottom>
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Add your feature cards here */}
          </Grid>
        </TransparentPaper>
      </Container>

      <Footer />
    </GradientBackground>
  );
};

export default LandingPage;