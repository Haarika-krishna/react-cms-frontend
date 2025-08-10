import React from 'react';
import { TextField, Box, Typography, Paper } from '@mui/material';

const ImageEditor = ({ props, onUpdate }) => {
  return (
    <Box>
      <TextField
  label="Image URL"
  value={props.src || ''}
  onChange={(e) => onUpdate({ ...props, src: e.target.value })}
  fullWidth
  margin="normal"
  helperText={
    <span>
      Paste a <strong>direct</strong> image URL (.jpg/.png). 
      <br />
      <a 
        href="https://www.labnol.org/google-images-direct-link-22094" 
        target="_blank"
        style={{ fontSize: '0.75rem' }}
      >
        How to get Google Images direct links
      </a>
     </span>
    }
    />
      
      {/* Image Preview */}
      {props.src && (
        <Paper elevation={0} sx={{ 
          p: 2, 
          mt: 2, 
          mb: 3,
          border: '1px dashed #ccc',
          textAlign: 'center'
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Image Preview
          </Typography>
          <Box
            component="img"
            src={props.src}
            alt="Preview"
            sx={{ 
              maxWidth: '100%', 
              maxHeight: 200,
              display: 'block',
              margin: '0 auto'
            }}
            onError={(e) => {
              e.target.style.display = 'none'; // Hide broken images
            }}
          />
          {!props.src.startsWith('http') && (
            <Typography color="error" variant="caption">
              Note: This may not display correctly until saved
            </Typography>
          )}
        </Paper>
      )}

      <TextField
        label="Alt Text"
        value={props.alt || ''}
        onChange={(e) => onUpdate({ ...props, alt: e.target.value })}
        fullWidth
        margin="normal"
        helperText="Important for accessibility"
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