import React from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import aboutimg from './ban3.jpg';

// Styled components
const Banner = styled(Box)(({ theme }) => ({
    background: `url(${aboutimg}) no-repeat center center`, // Center the background image
    backgroundSize: 'cover', // Cover the entire area of the div
    width: '100%',
    height: '50vh', // Control the height of the banner
    minHeight: '300px', // Ensures that the banner is not too short on larger screens
    position: 'relative', // Allows for overlay content if needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff', // Text color on the banner
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a dark overlay for better text visibility
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)', // Adds a dark overlay
        zIndex: 1,
    },
    zIndex: 2, // Ensures text stays above the overlay
}));

const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: '800px', // Restricting the maximum width for better readability
    margin: 'auto',
    textAlign: 'center', // Centers the text
    backgroundColor: '#fff', // Optional: for contrasting background
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)', // Soft shadow
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(-8), // Moves the container up slightly into the banner
    position: 'relative',
    zIndex: 3, // Keeps the container above the banner
}));

const IntroText = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2), // Adds spacing below the paragraph
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: '#333',
}));

const About = () => {
    return (
        <Box>
            {/* Banner Section */}
            <Banner>
                <Typography variant="h3" sx={{ position: 'relative', zIndex: 3 }}>
                    About Us
                </Typography>
            </Banner>

            {/* Content Section */}
            <Container>
                <IntroText variant="body1">
                    Welcome to <strong>WRITE & RISE</strong>, a vibrant community where knowledge and passion meet.
                    My name is <strong>Abhishek</strong>, and I founded this blog to create a space for individuals like you to share insights,
                    ideas, and inspire one another. Whether you’re looking to explore complex tech solutions or simple life hacks, you’ll find a
                    diverse range of topics here, including <strong>tech</strong>, <strong>travel</strong>, <strong>lifestyle</strong>, and more. 
                    Join us in building a world where every story matters and every voice can be heard.
                </IntroText>
            </Container>
        </Box>
    );
};

export default About;
