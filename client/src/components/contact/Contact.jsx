import { Box, styled, Typography, Link, Paper } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
    aria-hidden: true; /* Decorative background */
`;

const Wrapper = styled(Paper)(({ theme }) => ({
    maxWidth: '90%',
    width: 800,
    margin: `${theme.spacing(5)} auto`,
    padding: theme.spacing(4),
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
}));

const IconLink = styled(Link)(({ theme }) => ({
    margin: theme.spacing(1),
    verticalAlign: 'middle',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer', // Keeps it looking like a link
    color: 'black',
    '&:hover': {
        color: theme.palette.primary.main,
    },
    '& svg': {
        marginRight: theme.spacing(1),
        fontSize: '1.5rem',
    },
}));

const Contact = () => {
    return (
        <Box>
            <Banner aria-label="Background banner image" />
            <Wrapper>
                <Typography variant="h4" gutterBottom>
                    Get in Touch
                </Typography>
                <Typography variant="h6" sx={{ color: '#666', marginBottom: 2 }}>
                    Whether you’re interested in working with me or just want to say hello, I'd love to hear from you!
                </Typography>
                <Box>
                    {/* Removed href to prevent redirection */}
                    <IconLink>
                        <GitHub /> GitHub
                    </IconLink>
                    <IconLink>
                        <Instagram /> Instagram
                    </IconLink>
                    <IconLink>
                        <Email /> Email
                    </IconLink>
                </Box>
            </Wrapper>
        </Box>
    );
};

export default Contact;
