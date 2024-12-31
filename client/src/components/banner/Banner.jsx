import { styled, Box, Typography } from '@mui/material';
import bannerimg from './banner2.jpg';

const Image = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url(${bannerimg}) center/cover no-repeat`, // Ensures the image covers the area
    backgroundColor: '#000' // Fallback or additional styling
}));

const Heading = styled(Typography)`
    font-size: 70px;
    color: #000000; // Adjusted for better visibility against likely dark backgrounds
    line-height: 1;
    text-shadow: 2px 2px 8px rgb(0, 0, 0); // Optional: Adds a subtle shadow for better legibility
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    color:rgb(0, 0, 0); // Light grey for a subtle contrast
    padding: 5px; // Adds padding for visual separation
    // background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background for legibility
    
`;

const Banner = () => {
    return (
        <Image>
            <Heading>WRITE & RISE</Heading>
            <SubHeading>Empower Your Words, Elevate Your World</SubHeading>
        </Image>
    )
}

export default Banner;
