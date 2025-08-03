import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Select, 
  MenuItem, 
  IconButton, 
  Typography,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import HeaderEditor from './HeaderEditor';
import FooterEditor from './FooterEditor';
import ContentEditor from './ContentEditor';
import ImageEditor from './ImageEditor';

const SectionBuilder = ({ sections, onUpdate }) => {
  const [newSectionType, setNewSectionType] = useState('header');

  const sectionComponents = {
    header: HeaderEditor,
    footer: FooterEditor,
    content: ContentEditor,
    image: ImageEditor
  };

  const handleAddSection = () => {
    const newSection = {
      type: newSectionType,
      props: getDefaultProps(newSectionType)
    };
    onUpdate([...sections, newSection]);
  };

  const handleUpdateSection = (index, updatedProps) => {
    const updatedSections = [...sections];
    updatedSections[index].props = updatedProps;
    onUpdate(updatedSections);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    onUpdate(updatedSections);
  };

  const getDefaultProps = (type) => {
    switch (type) {
      case 'header':
        return { title: '', logo: '', navLinks: [] };
      case 'footer':
        return { copyrightText: '', links: [] };
      case 'content':
        return { heading: '', text: '', buttons: [] };
      case 'image':
        return { src: '', alt: '', caption: '' };
      default:
        return {};
    }
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <Select
            value={newSectionType}
            onChange={(e) => setNewSectionType(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="header">Header</MenuItem>
            <MenuItem value="footer">Footer</MenuItem>
            <MenuItem value="content">Content</MenuItem>
            <MenuItem value="image">Image</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Button 
            variant="contained" 
            onClick={handleAddSection}
            startIcon={<AddIcon />}
            fullWidth
          >
            Add Section
          </Button>
        </Grid>
      </Grid>

      {sections.length === 0 ? (
        <Box sx={{ 
          p: 3, 
          border: '1px dashed #ccc',
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Typography color="textSecondary">No sections added yet</Typography>
        </Box>
      ) : (
        sections.map((section, index) => {
          const SectionComponent = sectionComponents[section.type];
          return (
            <Box 
              key={index} 
              sx={{ 
                mb: 3, 
                p: 2, 
                border: '1px solid #eee', 
                borderRadius: 1,
                backgroundColor: '#fafafa'
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                  {section.type} Section
                </Typography>
                <IconButton 
                  onClick={() => handleRemoveSection(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <SectionComponent
                props={section.props}
                onUpdate={(updatedProps) => handleUpdateSection(index, updatedProps)}
              />
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default SectionBuilder;