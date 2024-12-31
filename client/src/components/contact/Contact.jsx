
import { Box, styled, Typography, Link, Paper } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Paper)(({ theme }) => ({
    maxWidth: 800,
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
    color: 'black',
    '&:hover': {
        color: 'red',
    },
    '& svg': {
        marginRight: theme.spacing(1),
        fontSize: '1.5rem', // Adjust icon size
    }
}));

const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h4" gutterBottom>
                    Get in Touch
                </Typography>
                <Typography variant="h6" sx={{ color: '#666', marginBottom: 2 }}>
                    Whether you’re interested in working with me or just want to say hello, I'd love to hear from you!
                </Typography>
                <Box>
                    <IconLink href="https://github.com/kunaltyagi9" target="_blank">
                        <GitHub /> GitHub
                    </IconLink>
                    <IconLink href="https://www.instagram.com/codeforinterview/" target="_blank">
                        <Instagram /> Instagram
                    </IconLink>
                    <IconLink href="mailto:codeforinterview@gmail.com?Subject=Hello%20there!" target="_blank">
                        <Email /> Email
                    </IconLink>
                </Box>
            </Wrapper>
        </Box>
    );
}

export default Contact;