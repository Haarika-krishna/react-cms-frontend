import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

const componentMap = {
  header: ({ title, logo, navLinks }) => (
    <header style={{ backgroundColor: 'black', padding: '1rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{title}</Typography>
        {logo && <img src={logo} alt="Logo" height="40" />}
        <nav>
          {navLinks?.map((link, i) => (
            <Button key={i} href={link.url}>{link.label}</Button>
          ))}
        </nav>
      </Box>
    </header>
  ),
  content: ({ heading, text, buttons }) => (
    <section style={{ padding: '2rem 0' }}>
      <Typography variant="h5" gutterBottom>{heading}</Typography>
      <Typography paragraph>{text}</Typography>
      {buttons?.map((btn, i) => (
        <Button key={i} href={btn.link} variant="contained" sx={{ mr: 2 }}>
          {btn.text}
        </Button>
      ))}
    </section>
  ),
  image: ({ src, alt, caption }) => (
    <figure style={{ textAlign: 'center', margin: '2rem 0' }}>
      <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
      {caption && <figcaption><Typography variant="caption">{caption}</Typography></figcaption>}
    </figure>
  ),
  footer: ({ copyrightText, links }) => (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '1rem' }}>
      <Box display="flex" justifyContent="space-between">
        <Typography>{copyrightText}</Typography>
        <div>
          {links?.map((link, i) => (
            <Button key={i} href={link.url} color="inherit">{link.label}</Button>
          ))}
        </div>
      </Box>
    </footer>
  )
};

const PageRenderer = ({ config }) => {
  const page = config.pages[0]; // For now, using first page only

  return (
    <Container maxWidth="lg">
      {page.sections.map((section, index) => {
        const Component = componentMap[section.type];
        return Component ? <Component key={index} {...section.props} /> : null;
      })}
    </Container>
  );
};

export default PageRenderer;