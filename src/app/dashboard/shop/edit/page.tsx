"use client"

import { ChangeEvent, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import { Alert, TextField, Select, MenuItem, Button, CircularProgress, Stack, SelectChangeEvent, Typography } from '@mui/material';
import { useAuth } from "@/contexts/AuthProvider";
import { AddShopDTO } from "@/interfaces/Shop";
import { getShopByOwner, updateShop } from "@/services/shopService";
import { notify } from "@/utils/toast";

const EditShop: FC = () => {
    const t = useTranslations('EditShopForm');
    const router = useRouter();
    const { user } = useAuth();

    const [shopId, setShopId] = useState<string | null>(null);
    const [shopData, setShopData] = useState<AddShopDTO>({
        name: '',
        description: '',
        logo: '',
        coverImage: '',
        location: {
            street: '',
            city: '',
            county: '',
            country: '',
            zipcode: '',
        },
    });
    const [active, setActive] = useState('Yes');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const buildShopFormData = (): FormData => {
        const formData = new FormData();
        formData.append('name', shopData.name.trim());
        formData.append('description', shopData.description?.trim() ?? '');
        formData.append('location', JSON.stringify(shopData.location ?? {}));

        if (logoFile) {
            formData.append('logo', logoFile);
        }

        if (coverImageFile) {
            formData.append('coverImage', coverImageFile);
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

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const loadShop = async () => {
            try {
                const shop = await getShopByOwner(user.id);
                if (!shop) {
                    setError(t('errorNoShopForAccount'));
                    return;
                }

                setShopId(shop._id ?? shop.id ?? null);
                setShopData({
                    name: shop.name || '',
                    description: shop.description || '',
                    logo: shop.logo || '',
                    coverImage: shop.coverImage || '',
                    cui: shop.cui || '',
                    nrRegCom: shop.nrRegCom || '',
                    location: shop.location ? { ...shop.location } : {
                        street: '',
                        city: '',
                        county: '',
                        country: '',
                        zipcode: '',
                    },
                });
                setActive(shop.isActive === false ? t('no') : t('yes'));
            } catch (err: any) {
                setError(err.message || t('errorLoadFailed'));
            } finally {
                setLoading(false);
            }
        };

        void loadShop();
    }, [user]);

    const handleChange = (event: SelectChangeEvent) => {
        setActive(event.target.value as string);
    };

    const handlePropertyUpdate = (propertyName: keyof AddShopDTO, value: string) => {
        setShopData((prev) => ({ ...prev, [propertyName]: value }));
    };

    const handleLocationUpdate = (propertyName: keyof NonNullable<AddShopDTO['location']>, value: string) => {
        setShopData((prev) => ({
            ...prev,
            location: {
                street: prev.location?.street ?? '',
                city: prev.location?.city ?? '',
                county: prev.location?.county ?? '',
                country: prev.location?.country ?? '',
                zipcode: prev.location?.zipcode ?? '',
                [propertyName]: value,
            },
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!shopId) {
            setError(t('errorNoShopId'));
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

        if (!shopData.location?.city?.trim() || !shopData.location?.country?.trim()) {
            setError(t('errorCityCountryRequired'));
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await updateShop(shopId, buildShopFormData());
            notify(t('updateSuccess'), 'success');
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || t('updateFailed'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.editShopContainer}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={styles.editShopContainer}>
            <h1 className={styles.editShopTitle}>{t('title')}</h1>
            <form className={styles.editShopForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    {error ? (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            {error}
                            <Button
                                size="small"
                                variant="outlined"
                                sx={{ ml: 2 }}
                                onClick={() => router.push('/dashboard/shop/create')}
                            >
                                {t('createShopAction')}
                            </Button>
                        </Alert>
                    ) : null}

                    <label htmlFor="shopName" className={styles.formLabel}>
                        {t('name')}
                    </label>
                    <TextField
                        id="shopName"
                        variant="outlined"
                        fullWidth
                        value={shopData.name}
                        onChange={(event) => handlePropertyUpdate('name', event.target.value)}
                        required
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="shopCui" className={styles.formLabel}>
                        {t('cui')}
                    </label>
                    <TextField
                        id="shopCui"
                        variant="outlined"
                        fullWidth
                        value={shopData.cui ?? ''}
                        disabled
                        helperText={t('protectedBusinessFields')}
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="shopNrRegCom" className={styles.formLabel}>
                        {t('nrRegCom')}
                    </label>
                    <TextField
                        id="shopNrRegCom"
                        variant="outlined"
                        fullWidth
                        value={shopData.nrRegCom ?? ''}
                        disabled
                        helperText={t('protectedBusinessFields')}
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="shopDescription" className={styles.formLabel}>
                        {t('description')}
                    </label>
                    <TextField
                        id="shopDescription"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={3}
                        value={shopData.description}
                        onChange={(event) => handlePropertyUpdate('description', event.target.value)}
                        required
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="shopLogo" className={styles.formLabel}>
                        {t('logo')}
                    </label>
                    <Stack direction="column" spacing={1} sx={{ mt: 1, mb: 2 }}>
                        <Button component="label" variant="outlined">
                            {t('uploadLogo')}
                            <input
                                id="shopLogo"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(event) => handleFileChange('logo', event)}
                            />
                        </Button>
                        {logoFile ? <Typography variant="caption">{logoFile.name}</Typography> : null}
                    </Stack>

                    <label htmlFor="shopCoverImg" className={styles.formLabel}>
                        {t('coverImage')}
                    </label>
                    <Stack direction="column" spacing={1} sx={{ mt: 1, mb: 2 }}>
                        <Button component="label" variant="outlined">
                            {t('uploadCover')}
                            <input
                                id="shopCoverImg"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(event) => handleFileChange('coverImage', event)}
                            />
                        </Button>
                        {coverImageFile ? <Typography variant="caption">{coverImageFile.name}</Typography> : null}
                    </Stack>

                    <label htmlFor="shopStreet" className={styles.formLabel}>
                        {t('street')}
                    </label>
                    <TextField
                        id="shopStreet"
                        variant="outlined"
                        fullWidth
                        value={shopData.location?.street ?? ''}
                        onChange={(event) => handleLocationUpdate('street', event.target.value)}
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="shopCity" className={styles.formLabel}>
                        {t('city')}
                    </label>
                    <TextField
                        id="shopCity"
                        variant="outlined"
                        fullWidth
                        value={shopData.location?.city ?? ''}
                        onChange={(event) => handleLocationUpdate('city', event.target.value)}
                        required
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="shopCountry" className={styles.formLabel}>
                        {t('country')}
                    </label>
                    <TextField
                        id="shopCountry"
                        variant="outlined"
                        fullWidth
                        value={shopData.location?.country ?? ''}
                        onChange={(event) => handleLocationUpdate('country', event.target.value)}
                        required
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="shopActive" className={styles.formLabel}>
                        {t('active')}
                    </label>
                    <Select
                        labelId="shopActive-label"
                        id="shopActive"
                        value={active}
                        label={t('active')}
                        onChange={handleChange}
                    >
                        <MenuItem value={t('yes')}>{t('yes')}</MenuItem>
                        <MenuItem value={t('no')}>{t('no')}</MenuItem>
                    </Select>
                </div>

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button type="submit" className={styles.formButton} variant="contained" disabled={submitting}>
                        {submitting ? t('saving') : t('submit')}
                    </Button>
                    <Button variant="outlined" onClick={() => router.push('/dashboard')}>
                        {t('cancel')}
                    </Button>
                </Stack>
            </form>
        </div>
    );
};

export default EditShop;