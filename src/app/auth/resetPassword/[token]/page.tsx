'use client'

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { notify } from '@/utils/toast';
import { resetPassword } from '@/services/authService';
import { useTranslations } from 'next-intl';

const ResetPassword: FC = () => {
    const t = useTranslations('ResetPassword');
    const params = useParams();
    const router = useRouter();
    const token = params?.token as string;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!token) {
            notify("Invalid reset link", "error");
            return;
        }
        if (!password || !confirmPassword) {
            notify("Please fill in all fields", "error");
            return;
        }
        if (password !== confirmPassword) {
            notify("Passwords do not match", "error");
            return;
        }
        setLoading(true);
        const response = await resetPassword({ token, password });
        setLoading(false);
        if (response) {
            notify("Password reset successfully", "success");
            router.push("/login");
        }
    }

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold text-red-600">❌ {t('invalid')}</h1>
                <p>{t('invalidMsg')}</p>
                <Button href="/login" variant="contained" style={{ marginTop: '2vw' }}>Back to Login</Button>
            </div>
        );
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
                        <h2 style={{ marginBottom: '1.5vw' }}>{t('title')}</h2>
                        <h6>{t('subtitle')}</h6>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                                mt: 6
                            }}
                        >
                            <TextField
                                fullWidth
                                label={t('password')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                label={t('confirmPassword')}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••••••••••••"
                                id="confirmPassword"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                        <Button variant="contained" onClick={handleSubmit} fullWidth style={{ marginTop: '4vw'}} disabled={loading}>
                            {loading ? t('resetting') : t('reset')}
                        </Button>
                        <Button href="/login" variant="outlined" fullWidth style={{ marginTop: '1vw', marginBottom: '2vw' }}>Back to Login</Button>
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
                    justifyContent: 'center',
                }}>
                    <h1 style={{ color: 'white', fontSize: '3vw' }}>Green Quick</h1>
                </div>
            </Container>
        </>
    );
}

export default ResetPassword;