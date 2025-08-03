import React from 'react';
import { TextField, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ContentEditor = ({ props, onUpdate }) => {
  const handleAddButton = () => {
    onUpdate({
      ...props,
      buttons: [...(props.buttons || []), { text: '', link: '' }]
    });
  };

  const handleButtonChange = (index, field, value) => {
    const updatedButtons = [...props.buttons];
    updatedButtons[index][field] = value;
    onUpdate({ ...props, buttons: updatedButtons });
  };

  return (
    <Box>
      <TextField
        label="Heading"
        value={props.heading || ''}
        onChange={(e) => onUpdate({ ...props, heading: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={props.text || ''}
        onChange={(e) => onUpdate({ ...props, text: e.target.value })}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      
      {props.buttons?.map((button, index) => (
        <Box key={index} display="flex" gap={1} mb={1}>
          <TextField
            label="Button Text"
            value={button.text}
            onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
          />
          <TextField
            label="Button Link"
            value={button.link}
            onChange={(e) => handleButtonChange(index, 'link', e.target.value)}
          />
        </Box>
      ))}
      <Button onClick={handleAddButton} startIcon={<AddIcon />} size="small">
        Add Button
      </Button>
    </Box>
  );
};

export default ContentEditor;