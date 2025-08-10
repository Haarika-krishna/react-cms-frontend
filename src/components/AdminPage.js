import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Button, 
  Container, 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Grid,
  Avatar,
  useTheme
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as PreviewIcon,
  Folder as PageIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Transparent container styling
const TransparentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(4),
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
}));

const TransparentListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: 'translateY(-2px)'
  }
}));

function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [savedPages, setSavedPages] = useState([]);

  useEffect(() => {
    const pages = JSON.parse(localStorage.getItem('cmsPages') || '[]');
    setSavedPages(pages);
  }, []);

  function getHeaderTitle(sections) {
    const headerSection = sections?.find(section => section.type === 'header');
    return headerSection?.props?.title || 'Untitled Page';
  }

  const handleDelete = (id) => {
    const updatedPages = savedPages.filter(page => page.id !== id);
    localStorage.setItem('cmsPages', JSON.stringify(updatedPages));
    setSavedPages(updatedPages);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      padding: theme.spacing(4),
      color: 'white'
    }}>
      <Container maxWidth="lg">
        <TransparentPaper>

          {/* Show Dashboard Title + Create Button only on /admin */}
          {location.pathname === '/admin' && (
            <Box textAlign="center" mb={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
                Admin Dashboard
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate('/builder')}
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
                Create New Page
              </Button>
            </Box>
          )}

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TransparentPaper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Total Pages
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  {savedPages.length}
                </Typography>
              </TransparentPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TransparentPaper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Last Activity
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  {savedPages.length > 0 ? 
                    new Date(savedPages[0].id).toLocaleDateString() : 'N/A'}
                </Typography>
              </TransparentPaper>
            </Grid>
          </Grid>

          {/* Pages List */}
          {savedPages.length > 0 ? (
            <Box>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
              >
                <PageIcon sx={{ mr: 2 }} /> Your Pages
              </Typography>
              
              <List sx={{ width: '100%' }}>
                {savedPages.map((page) => (
                  <React.Fragment key={page.id}>
                    <TransparentListItem
                      secondaryAction={
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            onClick={() => navigate(`/preview/${page.id}`)}
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            <PreviewIcon />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            onClick={() => handleDelete(page.id)}
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      }
                    >
                      <Avatar sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        mr: 3,
                        width: 48,
                        height: 48
                      }}>
                        <PageIcon />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {getHeaderTitle(page?.config?.pages[0]?.sections)}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Created: {new Date(page.id).toLocaleString()}
                          </Typography>
                        }
                        sx={{ color: 'white' }}
                      />
                    </TransparentListItem>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          ) : (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" gutterBottom>
                No pages created yet
              </Typography>
              {location.pathname === '/admin' && (
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/builder')}
                  sx={{
                    mt: 2,
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)'
                    }
                  }}
                >
                  Create First Page
                </Button>
              )}
            </Box>
          )}
        </TransparentPaper>
      </Container>
    </Box>
  );
}

export default AdminPage;
