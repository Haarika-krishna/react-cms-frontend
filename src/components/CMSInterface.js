import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SectionBuilder from './SectionBuilder';

function CMSInterface({ config, updateConfig, resetConfig }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPageId, setCurrentPageId] = useState(null);

  useEffect(() => {
    if (location.state?.pageToEdit) {
      const { pageToEdit } = location.state;
      updateConfig(pageToEdit.config);
      setCurrentPageId(pageToEdit.id);
      setIsEditing(true);
    } else {
      // Reset to default if not editing
      resetConfig();
    }
  }, [location.state, updateConfig, resetConfig]);

  const handleSave = () => {
    const headerSection = config.pages[0].sections.find(
      section => section.type === 'header' && section.props?.title
    );
    
    const pageTitle = headerSection?.props?.title || 
                     config.pages[0].title || 
                     `Page ${new Date().toLocaleDateString()}`;

    const savedPages = JSON.parse(localStorage.getItem('cmsPages') || '[]');
    
    const updatedPages = savedPages.map(page => 
      page.id === currentPageId 
        ? { ...page, title: pageTitle, config: JSON.parse(JSON.stringify(config)) }
        : page
    );
    
    localStorage.setItem('cmsPages', JSON.stringify(updatedPages));
    resetConfig();
    navigate('/');
  };

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
        
        <Typography variant="h4" gutterBottom>
          {isEditing ? 'Edit Page' : 'Page Builder'}
        </Typography>
        
        <SectionBuilder 
          sections={config.pages[0].sections} 
          onUpdate={(sections) => updateConfig(prev => ({
            ...prev,
            pages: [{
              ...prev.pages[0],
              sections
            }]
          }))} 
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 3 }}
        >
          {isEditing ? 'Update Page' : 'Save Page'}
        </Button>
      </Box>
    </Container>
  );
}

export default CMSInterface;