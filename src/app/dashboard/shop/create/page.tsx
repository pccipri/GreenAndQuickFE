"use client"

import { Box, TextareaAutosize } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation'
import { addShop } from '@/services/shopService';
import { AddShopDTO } from '@/interfaces/Shop';
import { useAuth } from '@/contexts/AuthProvider';
import { notify } from '@/utils/toast';

const AddShop: FC = () => {
    const t = useTranslations('AddShopForm');
    const router = useRouter()
    const [shopData, setShopData] = useState<AddShopDTO>({
        name: '',
        owner: '',
        description: '',
        logo: '',
        coverImage: '',
        location: {
            street: '',
            city: '',
            county: '',
            country: '',
            zipcode: ''
        }
    })
    const { user, refresh } = useAuth()
    const createShop = async () => {
        if (user) {
            const response = await addShop({ ...shopData, owner: user.id })

            if (response) {
                try {
                    await refresh();
                } catch {
                    // The user can still continue after shop creation even if refresh fails.
                }
                notify('Shop created successfully', 'success')
                router.push("/")
            }

        }

    }

    const handlePropertyUpdate = (propertyName: keyof AddShopDTO, value: string) => {
        setShopData({ ...shopData, [propertyName]: value });
    }

    const handleLocationUpdate = (
        propertyName: keyof AddShopDTO['location'],
        value: string
    ) => {
        setShopData({
            ...shopData,
            location: {
                ...shopData.location,
                [propertyName]: value
            }
        });
    };

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
                    <div style={{ width: '70%', height: '100%', textAlign: 'center' }}>
                        <h2 style={{ margin: '1.5vw 0' }}>{t('title')}</h2>
                        <h6>{t('message')}</h6>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                                mt: 4
                            }}
                        >
                            <TextField
                                fullWidth
                                label={t('name')}
                                placeholder="John's Grocery"
                                id="name"
                                type={'text'}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate("name", e.target.value)
                                }}
                                sx={{ mb: 2, mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                label={t('description')}
                                placeholder={t('descriptionPlaceholder')}
                                id="description"
                                type={'text'}
                                multiline
                                minRows={4}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate("description", e.target.value)
                                }}
                                sx={{ mb: 2, mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                label={t('logo')}
                                placeholder="https://example.com/logo.png"
                                id="logo"
                                type={'text'}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate("logo", e.target.value)
                                }}
                                sx={{ mb: 2, mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                label={t('coverImage')}
                                placeholder="https://example.com/cover.png"
                                id="coverImage"
                                type={'text'}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate("coverImage", e.target.value)
                                }}
                                sx={{ mb: 2, mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                label={t('street')}
                                placeholder="123 Main St"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handleLocationUpdate("street", e.target.value)
                                }}
                                sx={{ mb: 2, mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                label={t('city')}
                                placeholder="Cluj-Napoca"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handleLocationUpdate("city", e.target.value)
                                }}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                label={t('county')}
                                placeholder="Cluj"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handleLocationUpdate("county", e.target.value)
                                }}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                label={t('country')}
                                placeholder="Romania"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handleLocationUpdate("country", e.target.value)
                                }}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                label={t('zipcode')}
                                placeholder="430000"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handleLocationUpdate("zipcode", e.target.value)
                                }}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Button onClick={createShop} variant="contained" fullWidth style={{ marginTop: '2vw', marginBottom: '2vw' }}>
                            {t('submit')}
                        </Button>
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

export default AddShop;