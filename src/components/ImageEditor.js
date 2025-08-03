import React from 'react';
import { TextField, Box } from '@mui/material';

const ImageEditor = ({ props, onUpdate }) => {
  return (
    <Box>
      <TextField
        label="Image URL"
        value={props.src || ''}
        onChange={(e) => onUpdate({ ...props, src: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Alt Text"
        value={props.alt || ''}
        onChange={(e) => onUpdate({ ...props, alt: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Caption"
        value={props.caption || ''}
        onChange={(e) => onUpdate({ ...props, caption: e.target.value })}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default ImageEditor;