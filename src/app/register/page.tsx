"use client"

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { registerUser } from '@/services/authService';
import { useRouter } from 'next/navigation'
import { AddUserDTO } from '@/interfaces/User';
import { notify } from '@/utils/toast';

const Register: FC = () => {
    const t = useTranslations('Register');
    const locale = useLocale();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    const router = useRouter()
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState<AddUserDTO>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        preferredLanguage: locale as 'en' | 'ro',
    })

    const loginWithGoogle = () => {
        const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;
        if (googleAuthUrl) {
            router.push(googleAuthUrl)
        }
    }

    const createUser = async () => {
        if (isSubmitting) return;

        if (
            !userData.firstName.trim() ||
            !userData.lastName.trim() ||
            !userData.username.trim() ||
            !userData.email.trim() ||
            !userData.password.trim()
        ) {
            notify(t("validationError"), "error")
            return
        }

        if (userData.password !== confirmPassword) {
            notify(t("passwordMismatch"), "error")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await registerUser(userData)

            if (response) {
                notify(t("successMessage"), "success")
                const encodedEmail = encodeURIComponent(userData.email)
                router.replace(`/verify-email?email=${encodedEmail}`)
            }
        } catch (error: any) {
            notify(error.message || t("registrationFailed"), "error")
        } finally {
            setIsSubmitting(false)
        }

    }

    const handlePropertyUpdate = (propertyName: keyof AddUserDTO, value: string) => {
        setUserData({ ...userData, [propertyName]: value });
    }

    return (
        <>
            <Container
                maxWidth={false}
                sx={{
                    minHeight: '100vh',
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
                    <div style={{ width: '70%', minHeight: '100vh', textAlign: 'center' }}>
                        <h2 style={{ margin: '1.5vw 0' }}>{t("title")}</h2>
                        <h6>{t("subtitle")}</h6>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                                mt: 6
                            }}
                        >
                            <TextField
                                fullWidth
                                label={t("firstName")}
                                placeholder={t("firstNamePlaceholder")}
                                id="firstName"
                                type={'text'}
                                required
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate("firstName", e.target.value)
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <TextField
                                fullWidth
                                label={t("lastName")}
                                placeholder={t("lastNamePlaceholder")}
                                id="lastName"
                                type={'text'}
                                required
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate("lastName", e.target.value)
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <TextField
                                fullWidth
                                label={t("username")}
                                placeholder={t("usernamePlaceholder")}
                                id="username"
                                type={'text'}
                                required
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate("username", e.target.value)
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <TextField
                                fullWidth
                                label={t("email")}
                                placeholder={t("emailPlaceholder")}
                                id="email"
                                type={'email'}
                                required
                                onChange={(e) => {
                                    handlePropertyUpdate("email", e.target.value)
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
                                label={t("password")}
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t("passwordPlaceholder")}
                                id="password"
                                required
                                onChange={(e) => {
                                    handlePropertyUpdate("password", e.target.value)
                                }}
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
                                helperText="Password must be at least 8 characters long"
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <TextField
                                fullWidth
                                label={t("confirmPassword")}
                                value={confirmPassword}
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder={t("confirmPasswordPlaceholder")}
                                id="confirm-password"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }}
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
                        <Button onClick={createUser} disabled={isSubmitting} variant="contained" fullWidth style={{ marginTop: '4vw', marginBottom: '2vw' }}>{isSubmitting ? t("register") : t("register")}</Button>
                        <Button variant="outlined" onClick={loginWithGoogle} disabled={isSubmitting} fullWidth style={{ marginBottom: '2vw' }}>{t("continueWithGoogle")}</Button>
                        <p>{t("alreadyHaveAccount")}</p><Button href="/login">{t("logIn")}</Button>
                    </div>
                </div>

                <div style={{
                    minHeight: '100vh',
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