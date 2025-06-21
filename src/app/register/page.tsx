"use client"

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FC, Fragment, useState } from 'react';
import { useTranslations } from 'next-intl';

const Register: FC = () => {
     const t = useTranslations('Register');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    return (
        <>
            <Container
                maxWidth={false}
                sx={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundImage: 'url(./images/bgplaceholder.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div style={{
                    height: '100%',
                    width: '40%',
                    textAlign: 'left',
                    backgroundColor: 'white',
                    color: 'black',
                    opacity: 0.9,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ width: '70%', height: '90%', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1.5vw' }}>{t("register")}</h2>
                        <h6>Welcome to Green & Quick! Get started with an account</h6>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                                mt: 6
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Username"
                                placeholder="john_doe"
                                id="username"
                                type={'text'}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                placeholder="johndoe@gmail.com"
                                id="email"
                                type={'email'}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••••••••"
                                id="password"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••••••••••"
                                id="confirm-password"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                        </Box>
                        <Button variant="contained" fullWidth style={{ marginTop: '4vw', marginBottom: '2vw' }}>Register</Button>
                        <p>Already have an account?</p><Button href="/login">Log In</Button>
                    </div>
                </div>

                <div style={{
                    height: '100%',
                    width: '40%',
                    textAlign: 'left',
                    backgroundColor: 'green',
                    opacity: 0.9,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ width: '80%' }}>
                        <h2>Some lead text about how great our company is, or even our slogan</h2>
                        <br />
                        <h6>Smaller text</h6>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Register;