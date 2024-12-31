import react from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import aboutimg from './ban3.jpg';


const Banner = styled(Box)({
    background: `url(${aboutimg}) no-repeat center center`, // Center the background image
    backgroundSize: 'cover', // Cover the entire area of the div
    width: '100%',
    height: '50vh', // Control the height of the banner
    minHeight: '300px', // Ensures that the banner is not too short on larger screens
    backgroundPosition: 'center',
});
const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: '800px',  // Restricting the maximum width for better readability
    margin: 'auto',
    textAlign: 'center',  // Centers the text
    backgroundColor: '#fff',  // Optional: for contrasting background
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',  // Soft shadow
}));

const IntroText = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),  // Adds spacing below the paragraph
}));



const CustomLink = styled(Link)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    color: '#333',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
    gap: theme.spacing(1),
}));
const About = () => {

    return (
        <Box>
            <Banner />
            <Container>
                <IntroText variant="h5">
                    Welcome to WRITE & RISE, a vibrant community where knowledge and passion meet. My name is Abhishek, and I founded this blog to create a space for individuals like you to share insights, ideas, and inspire one another. Whether you’re looking to explore complex tech solutions or simple life hacks, you’ll find a diverse range of topics here, including tech, travel, lifestyle, and more. Join us in building a world where every story matters and every voice can be heard.
                </IntroText>

            </Container>
        </Box>
    )
}

export default About;