"use client";

import { FC, useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import Cookies from 'js-cookie';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';


const COOKIE_NAME = 'cookie';

const CookieConsentModal: FC = () => {
    const [open, setOpen] = useState(false);    // For opening and closing the modal

    useEffect(() => {
        const consent = Cookies.get(COOKIE_NAME);
        if (!consent) {
            setOpen(true);
        }
    }, []);

    const handleAccept = () => {
        // Create/update a cookie that expires in a year
        Cookies.set(COOKIE_NAME, 'true', { expires: 365 });
        setOpen(false);
    };

    const handleDecline = () => {
        Cookies.set(COOKIE_NAME, 'false', { expires: 365 });
        setOpen(false);
    };

    return (
        <>
            <CookieConsent
                style={{ display: 'none' }} // Hides the default CookieConsent banner from the package so the custom MUI modal can be used instead
                enableDeclineButton
                cookieName={COOKIE_NAME}
            />

            <Modal open={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        color: 'black',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        outline: 'none',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Cookies Consent 🍪
                    </Typography>
                    <Typography variant="body2" mb={3}>
                        We use our own and third-party cookies to personalize content and to analyze web traffic.
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={handleAccept}>
                            Accept
                        </Button>
                        <Button variant="outlined" onClick={handleDecline}>
                            Decline
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default CookieConsentModal;