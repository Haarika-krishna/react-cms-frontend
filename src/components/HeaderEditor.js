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
    <Box>
      <TextField
        label="Header Title"
        value={props.title || ''}
        onChange={(e) => onUpdate({ ...props, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Logo URL"
        value={props.logo || ''}
        onChange={(e) => onUpdate({ ...props, logo: e.target.value })}
        fullWidth
        margin="normal"
      />
      
      <Typography variant="subtitle2" mt={2}>Navigation Links</Typography>
      {props.navLinks?.map((link, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
          <TextField
            label="Label"
            value={link.label}
            onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
          />
          <TextField
            label="URL"
            value={link.url}
            onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
          />
          <IconButton onClick={() => removeLink(index)}>
            <RemoveIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button onClick={addLink} startIcon={<AddIcon />} size="small">
        Add Link
      </Button>
    </Box>
  );
};

export default HeaderEditor;