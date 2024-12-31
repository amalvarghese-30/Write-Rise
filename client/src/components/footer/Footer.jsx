import React from 'react';
import { Box, Container, Grid, Typography, Link, TextField, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
    return (
        <Box component="footer" sx={{ background: 'linear-gradient(180deg, rgba(36, 36, 36, 1) 0%, rgba(20, 20, 20, 1) 100%)', color: 'white', mt: 5, py: 3 }}>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                            WRITE & RISE
                        </Typography>
                        <Typography>
                            Dive into the world of blogging with us. Share, learn, and grow with our community.diate notification of latest videos.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                            Office
                        </Typography>
                        <Typography>ITPL Road, Whitefield, Bangalore, Karnataka, PIN 560066, India</Typography>
                        <Link href="mailto:avinashdm@outlook.com" color="inherit">avinashdm@outlook.com</Link><br />
                        <Link href="tel:+910123456789" color="inherit">+91 – xxxxxxxxxx</Link>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                            Links
                        </Typography>
                        <Link href="/" color="inherit">Home</Link><br />
                        <Link href="/services" color="inherit">Services</Link><br />
                        <Link href="/about" color="inherit">About Us</Link><br />
                        <Link href="/features" color="inherit">Features</Link><br />
                        <Link href="/contacts" color="inherit">Contacts</Link>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                            Newsletter
                        </Typography>
                        <TextField
                            variant="filled"
                            size="small"
                            placeholder="Enter your email id"
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <TwitterIcon />
                                    </IconButton>
                                ),
                                style: { color: '#fff' }
                            }}
                            sx={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}
                        />
                        <Box sx={{ mt: 2 }}   >
                            <IconButton><FacebookIcon /></IconButton>
                            <IconButton><TwitterIcon /></IconButton>
                            <IconButton><InstagramIcon /></IconButton>
                            <IconButton><PinterestIcon /></IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="gray" sx={{ mt: 3, textAlign: 'center' }}>
                    © 2021 WRITE & RISE - All Rights Reserved
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
