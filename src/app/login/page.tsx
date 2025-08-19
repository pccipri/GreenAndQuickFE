"use client"

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FC, useState } from 'react';
import { LoginRequest } from '@/interfaces/Auth';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth';

const Login: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    const router = useRouter()
    const [userData, setUserData] = useState<LoginRequest>({
        usernameOrEmail: '',
        password: '',
    })
    const { signIn } = useAuth()
    const loginUser = async () => {
        const response = await signIn(userData)

        if (response) {
            router.push("/")
        }

    }

    const handlePropertyUpdate = (propertyName: keyof LoginRequest, value: string) => {
        setUserData({ ...userData, [propertyName]: value });
    }

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
                    backgroundPosition: 'center'
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
                    <div style={{ width: '70%', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1.5vw' }}>Log In</h2>
                        <h6>Welcome back! Please enter your details</h6>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                                mt: 6
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Username / Email"
                                placeholder="johndoe@gmail.com / johndoe"
                                id="username"
                                type={'text'}
                                onChange={(e) => {
                                    handlePropertyUpdate("usernameOrEmail", e.target.value)
                                }}
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
                                onChange={(e) => {
                                    handlePropertyUpdate("password", e.target.value)
                                }}
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
                        </Box>
                        <Button variant="contained" onClick={loginUser} fullWidth style={{ marginTop: '4vw', marginBottom: '2vw' }}>Log In</Button>
                        <p>Don&apos;t have an account yet?</p><Button href="/register">Register Now</Button>
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

export default Login;