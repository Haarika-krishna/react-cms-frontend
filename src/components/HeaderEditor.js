import React from 'react';
import { Typography } from '@mui/material';
import { TextField, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const HeaderEditor = ({ props, onUpdate }) => {
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...props.navLinks];
    updatedLinks[index][field] = value;
    onUpdate({ ...props, navLinks: updatedLinks });
  };

  const addLink = () => {
    onUpdate({
      ...props,
      navLinks: [...props.navLinks, { label: '', url: '' }]
    });
  };

  const removeLink = (index) => {
    const updatedLinks = props.navLinks.filter((_, i) => i !== index);
    onUpdate({ ...props, navLinks: updatedLinks });
  };

  return (
    <Box sx={{
      backgroundColor: 'transparent', // Fully transparent
      padding: 2,
      marginBottom: 2
    }}>
      <TextField
        label="Header Title"
        value={props.title || ''}
        onChange={(e) => onUpdate({ ...props, title: e.target.value })}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiInputBase-input': { color: 'black' },
          '& .MuiInputLabel-root': { color: 'black' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(0,0,0,0.23)' },
            '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.5)' }
          }
        }}
      />
      <TextField
        label="Logo URL"
        value={props.logo || ''}
        onChange={(e) => onUpdate({ ...props, logo: e.target.value })}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiInputBase-input': { color: 'black' },
          '& .MuiInputLabel-root': { color: 'black' }
        }}
      />
      
      <Typography variant="subtitle2" mt={2} sx={{ color: 'black' }}>
        Navigation Links
      </Typography>
      
      {props.navLinks?.map((link, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
          <TextField
            label="Label"
            value={link.label}
            onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
            sx={{
              '& .MuiInputBase-input': { color: 'black' },
              '& .MuiInputLabel-root': { color: 'black' }
            }}
          />
          <TextField
            label="URL"
            value={link.url}
            onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
            sx={{
              '& .MuiInputBase-input': { color: 'black' },
              '& .MuiInputLabel-root': { color: 'black' }
            }}
          />
          <IconButton onClick={() => removeLink(index)}>
            <RemoveIcon fontSize="small" sx={{ color: 'black' }} />
          </IconButton>
        </Box>
      ))}
      
      <Button 
        onClick={addLink} 
        startIcon={<AddIcon sx={{ color: 'black' }} />} 
        size="small"
        sx={{ 
          color: 'black',
          border: '1px solid rgba(0,0,0,0.5)',
          mt: 1
        }}
      >
        Add Link
      </Button>
    </Box>
  );
};

export default HeaderEditor;