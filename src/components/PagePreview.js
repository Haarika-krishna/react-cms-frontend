import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageRenderer from './PageRenderer'; // Import the PageRenderer

function PagePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageConfig, setPageConfig] = useState(null);

  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem('cmsPages') || '[]');
    const page = savedPages.find(p => p.id.toString() === id);
    if (page) {
      setPageConfig(page.config);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!pageConfig) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
          startIcon={<ArrowBackIcon />}
        >
          Back to Dashboard
        </Button>
        
        {/* Replace the JSON rendering with PageRenderer */}
        <PageRenderer config={pageConfig} />
      </Box>
    </Container>
  );
}

export default PagePreview;