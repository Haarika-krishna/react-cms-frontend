import React from 'react';
import { Typography } from '@mui/material';
import { TextField, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FooterEditor = ({ props, onUpdate }) => {
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...props.links];
    updatedLinks[index][field] = value;
    onUpdate({ ...props, links: updatedLinks });
  };

  const addLink = () => {
    onUpdate({
      ...props,
      links: [...(props.links || []), { label: '', url: '' }]
    });
  };

  const removeLink = (index) => {
    const updatedLinks = props.links.filter((_, i) => i !== index);
    onUpdate({ ...props, links: updatedLinks });
  };

  return (
    <Box>
      <TextField
        label="Copyright Text"
        value={props.copyrightText || ''}
        onChange={(e) => onUpdate({ ...props, copyrightText: e.target.value })}
        fullWidth
        margin="normal"
      />
      
      <Typography variant="subtitle2" mt={2}>Footer Links</Typography>
      {props.links?.map((link, index) => (
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

export default FooterEditor;