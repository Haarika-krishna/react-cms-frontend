import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import DownloadIcon from '@mui/icons-material/Download';

const JsonOutput = ({ config }) => {
  const jsonString = JSON.stringify(config, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    alert('JSON copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Generated JSON Configuration
      </Typography>
     <Paper elevation={3} sx={{ p: 2, mb: 2, overflowX: 'auto' }}>
  <pre style={{ margin: 0 }}>{jsonString}</pre>
</Paper>
      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleCopy}>
          Copy JSON
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleDownload}
          startIcon={<DownloadIcon />}
        >
          Download JSON
        </Button>
      </Box>
    </Box>
  );
};

export default JsonOutput;