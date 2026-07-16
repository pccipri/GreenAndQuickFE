'use client'

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation'
import { notify } from '@/utils/toast';
import { requestPasswordReset } from '@/services/authService';
import { useTranslations } from 'next-intl';

const ForgotPassword: FC = () => {
    const t = useTranslations('ForgotPassword');
    const router = useRouter()
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const response = await requestPasswordReset({ email });
        setLoading(false);
        if (response) {
            notify("If an account with that email exists, a reset link has been sent.", "success");
            router.push("/login");
        }
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
                                label={t('email')}
                                placeholder="johndoe@gmail.com"
                                id="email"
                                type={'email'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                        </Box>
                        <Button variant="contained" onClick={handleSubmit} fullWidth style={{ marginTop: '4vw'}} disabled={loading}>
                            {loading ? t('sending') : t('send')}
                        </Button>
                        <p style={{ marginTop: '2vw' }}>{t('remember')}</p>
                        <Button href="/login">{t('back')}</Button>
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

export default ForgotPassword;