"use client"

import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChangeEvent, FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation'
import { addShop, validateCui } from '@/services/shopService';
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
    const [submitting, setSubmitting] = useState(false);
    const [validatingCui, setValidatingCui] = useState(false);
    const [cuiValidated, setCuiValidated] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const buildShopFormData = (ownerId: string): FormData => {
        const formData = new FormData();
        formData.append('name', shopData.name.trim());
        formData.append('owner', ownerId);
        formData.append('description', shopData.description?.trim() ?? '');
        formData.append('cui', shopData.cui?.trim() ?? '');
        formData.append('nrRegCom', shopData.nrRegCom?.trim() ?? '');
        formData.append('location', JSON.stringify(shopData.location ?? {}));

        if (logoFile) {
            formData.append('logo', logoFile);
        } else if (typeof shopData.logo === 'string' && shopData.logo.trim()) {
            formData.append('logo', shopData.logo.trim());
        }

        if (coverImageFile) {
            formData.append('coverImage', coverImageFile);
        } else if (typeof shopData.coverImage === 'string' && shopData.coverImage.trim()) {
            formData.append('coverImage', shopData.coverImage.trim());
        }

        return formData;
    };

    const handleFileChange = (field: 'logo' | 'coverImage', event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        if (field === 'logo') {
            setLogoFile(file);
        } else {
            setCoverImageFile(file);
        }
    };

    const validateShopCui = async () => {
        if (!shopData.cui?.trim()) {
            setError(t('cuiValidationRequired'));
            return;
        }

        setValidatingCui(true);
        setError(null);

        try {
            await validateCui(shopData.cui.trim());
            setCuiValidated(true);
            notify(t('cuiValidated'), 'success');
        } catch (err: any) {
            setCuiValidated(false);
            const message = err?.message?.toLowerCase() ?? '';
            const fallbackMessage = message.includes('duplicate') || message.includes('already')
                ? t('cuiDuplicateMessage')
                : t('cuiValidationRequired');
            setError(fallbackMessage);
        } finally {
            setValidatingCui(false);
        }
    };

    const createShop = async (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        if (!user?.id) {
            setError(t('errorSigninRequired'));
            return;
        }

        if (!shopData.name?.trim()) {
            setError(t('errorNameRequired'));
            return;
        }

        if (!shopData.description?.trim()) {
            setError(t('errorDescriptionRequired'));
            return;
        }

        if (!shopData.cui?.trim()) {
            setError(t('cuiValidationRequired'));
            return;
        }

        if (!shopData.nrRegCom?.trim()) {
            setError(t('nrRegComRequired'));
            return;
        }

        if (!cuiValidated) {
            setError(t('cuiValidationRequired'));
            return;
        }

        if (!shopData.location?.city?.trim() || !shopData.location?.country?.trim()) {
            setError(t('errorCityCountryRequired'));
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const response = await addShop(buildShopFormData(user.id));

            if (response) {
                try {
                    await refresh();
                } catch {
                    // The user can still continue after shop creation even if refresh fails.
                }
                notify(t('createSuccess'), 'success');
                router.push('/dashboard');
            }
        } catch (err: any) {
            const message = err?.message?.toLowerCase() ?? '';
            const fallbackMessage = message.includes('duplicate') || message.includes('already')
                ? t('shopDuplicateMessage')
                : (err.message || t('createFailed'));
            setError(fallbackMessage);
        } finally {
            setSubmitting(false);
        }
    }

    const handlePropertyUpdate = (propertyName: keyof AddShopDTO, value: string) => {
        if (propertyName === 'cui') {
            setCuiValidated(false);
        }
        setShopData({ ...shopData, [propertyName]: value });
    }

    const handleLocationUpdate = (
        propertyName: keyof NonNullable<AddShopDTO['location']>,
        value: string
    ) => {
        setShopData((prev) => ({
            ...prev,
            location: {
                street: prev.location?.street ?? '',
                city: prev.location?.city ?? '',
                county: prev.location?.county ?? '',
                country: prev.location?.country ?? '',
                zipcode: prev.location?.zipcode ?? '',
                [propertyName]: value,
            }
        }));
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
                            component="form"
                            onSubmit={createShop}
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                                mt: 4
                            }}
                        >
                            {error ? (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            ) : null}
                            <TextField
                                fullWidth
                                label={t('name')}
                                placeholder={t('namePlaceholder')}
                                id="name"
                                type={'text'}
                                required
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

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, mt: 2 }}>
                                <TextField
                                    fullWidth
                                    label={t('cui')}
                                    id="cui"
                                    type={'text'}
                                    required
                                    value={shopData.cui ?? ''}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    onChange={(e) => {
                                        handlePropertyUpdate('cui', e.target.value)
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    onClick={validateShopCui}
                                    disabled={validatingCui || !shopData.cui?.trim()}
                                >
                                    {validatingCui ? t('validatingCui') : t('validateCui')}
                                </Button>
                            </Stack>

                            {cuiValidated ? (
                                <Typography color="success.main" sx={{ mb: 1 }}>
                                    {t('cuiValidated')}
                                </Typography>
                            ) : null}

                            <TextField
                                fullWidth
                                label={t('nrRegCom')}
                                id="nrRegCom"
                                type={'text'}
                                required
                                value={shopData.nrRegCom ?? ''}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate('nrRegCom', e.target.value)
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
                                required
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

                            <Stack direction="column" spacing={1} sx={{ mb: 2, mt: 2, textAlign: 'left' }}>
                                <label htmlFor="shopLogoUpload">{t('logo')}</label>
                                <Button component="label" variant="outlined">
                                    {t('uploadLogo')}
                                    <input
                                        id="shopLogoUpload"
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(event) => handleFileChange('logo', event)}
                                    />
                                </Button>
                                {logoFile ? <Typography variant="caption">{logoFile.name}</Typography> : null}
                            </Stack>

                            <Stack direction="column" spacing={1} sx={{ mb: 2, mt: 2, textAlign: 'left' }}>
                                <label htmlFor="shopCoverUpload">{t('coverImage')}</label>
                                <Button component="label" variant="outlined">
                                    {t('uploadCover')}
                                    <input
                                        id="shopCoverUpload"
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(event) => handleFileChange('coverImage', event)}
                                    />
                                </Button>
                                {coverImageFile ? <Typography variant="caption">{coverImageFile.name}</Typography> : null}
                            </Stack>

                            <TextField
                                fullWidth
                                label={t('street')}
                                placeholder={t('streetPlaceholder')}
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
                                placeholder={t('cityPlaceholder')}
                                required
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
                                placeholder={t('countyPlaceholder')}
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
                                placeholder={t('countryPlaceholder')}
                                required
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
                                placeholder={t('zipcodePlaceholder')}
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

                            <Button type="submit" variant="contained" fullWidth disabled={submitting || validatingCui} style={{ marginTop: '2vw', marginBottom: '2vw' }}>
                                {submitting ? <CircularProgress size={20} color="inherit" /> : t('submit')}
                            </Button>
                        </Box>
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
                        <h2>{t('message')}</h2>
                        <br />
                        <h6>{t('descriptionPlaceholder')}</h6>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default AddShop;