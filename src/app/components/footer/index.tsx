"use client"

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FC } from 'react';


const Footer: FC = () => {
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderTop: '1px solid #e0e0e0',
                py: 2,
                position: 'static',
                bottom: 0
            }}
            component="footer"
        >
            <Container maxWidth="lg">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid>
                        <Typography variant="body2" color="textSecondary">
                            © {new Date().getFullYear()} Green & Quick. All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid>
                        <Box display="flex" alignItems="center">
                            <Link href="https://facebook.com" target="_blank" rel="noopener" color="inherit">
                                <IconButton aria-label="Facebook" sx={{ color: 'text.secondary' }}>
                                    <FacebookIcon />
                                </IconButton>
                            </Link>
                            <Link href="https://instagram.com" target="_blank" rel="noopener" color="inherit">
                                <IconButton aria-label="Instagram" sx={{ color: 'text.secondary' }}>
                                    <InstagramIcon />
                                </IconButton>
                            </Link>
                            <Link href="https://x.com" target="_blank" rel="noopener" color="inherit">
                                <IconButton aria-label="X" sx={{ color: 'text.secondary' }}>
                                    <XIcon />
                                </IconButton>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer;