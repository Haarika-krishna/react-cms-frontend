import React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';

const ProjectShowcase = () => {
  const images = {
    student: '/images/Student.webp',
    professional: '/images/Professional.jpg'
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
        Create Without Limits
      </Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        gap: 4,
        flexDirection: { xs: 'column', md: 'row' } // Stack on mobile, row on desktop
      }}>
        {/* Student Card */}
        <Paper elevation={3} sx={{
          flex: 1,
          minWidth: 0, // Important for flex items to shrink properly
          p: 3,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h5" gutterBottom>
            For Students
          </Typography>
          <Box
            component="img"
            src={images.student}
            alt="Student project"
            onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Student+Image'}
            sx={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: '4px',
              mb: 2,
              flexGrow: 1
            }}
          />
          <Button variant="contained" fullWidth>
            START STUDENT PROJECT
          </Button>
        </Paper>

        {/* Professional Card */}
        <Paper elevation={3} sx={{
          flex: 1,
          minWidth: 0, // Important for flex items to shrink properly
          p: 3,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h5" gutterBottom>
            For Professionals
          </Typography>
          <Box
            component="img"
            src={images.professional}
            alt="Professional project"
            onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Professional+Image'}
            sx={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: '4px',
              mb: 2,
              flexGrow: 1
            }}
          />
          <Button variant="contained" fullWidth>
            START PROFESSIONAL PROJECT
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProjectShowcase;