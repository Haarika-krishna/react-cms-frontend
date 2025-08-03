import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import SectionBuilder from './components/SectionBuilder';
import PagePreview from './components/PagePreview'; // New component
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button ,Container} from '@mui/material';


const CMSInterface = ({ config, updateConfig, resetConfig }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    if (!config.pages[0].title) {
      alert('Please add a page title');
      return;
    }

    const savedPages = JSON.parse(localStorage.getItem('cmsPages') || '[]');
    const newPage = {
      id: Date.now(),
      title: config.pages[0].title,
      config: JSON.parse(JSON.stringify(config))
    };
    
    localStorage.setItem('cmsPages', JSON.stringify([...savedPages, newPage]));
    
    // Call resetConfig to clear the form
    if (typeof resetConfig === 'function') {
      resetConfig();
    }
    
    alert('Page saved successfully!');
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
        
        <Typography variant="h4" gutterBottom>Page Builder</Typography>
        
        <SectionBuilder 
          sections={config.pages[0].sections} 
          onUpdate={(sections) => {
            updateConfig(prev => ({
              ...prev,
              pages: [{
                ...prev.pages[0],
                sections
              }]
            }));
          }} 
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 3 }}
        >
          Save Page
        </Button>
      </Box>
    </Container>
  );
};


function App() {
  const defaultConfig = {
    theme: 'bootstrap',
    pages: [{
      path: '/',
      title: 'Home',
      sections: []
    }]
  };

  const [config, setConfig] = useState(JSON.parse(JSON.stringify(defaultConfig)));

  const resetConfig = () => {
    setConfig(JSON.parse(JSON.stringify(defaultConfig)));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/builder" element={
          <CMSInterface 
            config={config} 
            updateConfig={setConfig}
            resetConfig={resetConfig}
          />
        } />
        <Route path="/preview/:id" element={<PagePreview />} />
        <Route path="*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
export default App;