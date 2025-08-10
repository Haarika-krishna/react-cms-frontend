import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button, useTheme } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const carouselItems = [
  {
    title: 'Powerful CMS Features',
    description: 'Build websites without coding',
    buttonText: 'Get Started'
  },
  {
    title: 'Easy Content Management', 
    description: 'Update your site effortlessly',
    buttonText: 'Learn More'
  },
  {
    title: 'Beautiful Templates',
    description: 'Professional designs ready to use',
    buttonText: 'View Templates'
  }
];

const HeroCarousel = () => {
  const theme = useTheme();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false, // Disabled center mode to fix side lines
    centerPadding: '0px',
    fade: true, // Optional: Adds fade transition between slides
    cssEase: 'linear'
  };

  return (
    <Box sx={{
      width: '100%',
      pt: '80px', // Matches navbar height
      pb: 8,
      mx: 'auto',
      maxWidth: '1200px',
      overflow: 'hidden', // Hides any overflow
      position: 'relative' // For proper positioning
    }}>
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <Box 
            key={index}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              height: { xs: '350px', md: '450px' },
              display: 'flex !important',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              px: 3,
              outline: 'none',
              borderRadius: '16px',
              mx: 0, // Removed horizontal margin
              mt: 4,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box sx={{ 
              maxWidth: '800px',
              px: { xs: 2, md: 4 },
              py: { xs: 4, md: 6 }
            }}>
              <Typography 
                variant="h3"
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  color: 'white',
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                {item.title}
              </Typography>
              <Typography 
                variant="h5"
                sx={{ 
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                {item.description}
              </Typography>
              <Button 
                variant="contained"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {item.buttonText}
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroCarousel;