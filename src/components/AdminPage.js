// AdminPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  IconButton
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function AdminPage() {
  const navigate = useNavigate();
  const [savedPages, setSavedPages] = useState([]);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = () => {
    const pages = JSON.parse(localStorage.getItem('cmsPages') || '[]');
    console.log('pages:',pages)
    setSavedPages(pages);
  };

  function getHeaderTitle(sections) {
    const headerSection = sections.find(section => section.type === 'header');
    if (headerSection && headerSection.props?.title) {
        return headerSection.props.title;
    }
    return 'No title found page';
}

  const handleDelete = (id) => {
    const updatedPages = savedPages.filter(page => page.id !== id);
    localStorage.setItem('cmsPages', JSON.stringify(updatedPages));
    loadPages(); // Refresh the list
  };

  // const handleEdit = (page) => {
  //   navigate('/builder', { state: { pageToEdit: page } });
  // };

  return (
    <Container maxWidth="lg">
      <Box my={4} textAlign="center">
        <Typography variant="h4" gutterBottom>CMS Admin Dashboard</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/builder')}
          sx={{ mt: 3, mb: 4 }}
        >
          Create New Page
        </Button>

        {savedPages.length > 0 && (
          <Box textAlign="left">
            <Typography variant="h6" gutterBottom>Saved Pages:</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {savedPages.map((page) => (
                <React.Fragment key={page.id}>
                  <ListItem 
                    alignItems="flex-start"
                    button
                    onClick={() => navigate(`/preview/${page.id}`)}
                  >
                    <ListItemText
                      primary={getHeaderTitle(page?.config?.pages[0]?.sections)}
                      secondary={`Created: ${new Date(page.id).toLocaleString()}`}
                    />
                    <ListItemSecondaryAction>
                      {/* <IconButton edge="end" onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(page);
                      }}>
                        <EditIcon />
                      </IconButton> */}
                      <IconButton edge="end" onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(page.id);
                      }}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default AdminPage;