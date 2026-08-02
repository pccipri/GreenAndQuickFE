"use client"

import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import { Alert, Box, TextField, Button, Stack, CircularProgress, MenuItem, Typography } from '@mui/material';
import { getProductById, updateProduct } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import { notify } from "@/utils/toast";

const EditProduct: FC = () => {
    const t = useTranslations('EditProductForm');
    const router = useRouter();
    const params = useParams<{ id?: string | string[] }>();
    const productId = useMemo(() => {
        if (Array.isArray(params?.id)) {
            return params.id[0];
        }

        return params?.id;
    }, [params?.id]);

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        reducedPrice: '',
        stock: '',
        lowStockThreshold: '',
        isAvailable: 'true',
        category: '',
        shopId: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Array<{ _id: string; name: string }>>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

    useEffect(() => {
        let active = true;

        const loadCategories = async () => {
            try {
                const data = await getCategories();
                if (active) {
                    setCategories(data);
                }
            } catch {
                if (active) {
                    setCategories([]);
                }
            } finally {
                if (active) {
                    setCategoriesLoading(false);
                }
            }
        };

        void loadCategories();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (!productId) {
            setError(t('errorMissingId'));
            setLoading(false);
            return;
        }

        const loadProduct = async () => {
            try {
                const product = await getProductById(productId);
                if (!product) {
                    setError(t('errorNotFound'));
                    return;
                }

                setForm({
                    name: product.name || '',
                    description: product.description || '',
                    price: product.price?.toString() || '',
                    reducedPrice: product.reducedPrice?.toString() || '',
                    stock: product.stock?.toString() || '',
                    lowStockThreshold: product.lowStockThreshold?.toString() || '',
                    isAvailable: product.isAvailable === false ? 'false' : 'true',
                    category: product.category || '',
                    shopId: product.shopId || product.shop || '',
                });
                setExistingImages(product.imageUrls ?? (product.imageUrl ? [product.imageUrl] : []));
            } catch (err: any) {
                setError(err.message || t('errorLoadFailed'));
            } finally {
                setLoading(false);
            }
        };

        void loadProduct();
    }, [productId]);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        setNewImageFiles(files);
    };

    const removeExistingImage = (imageUrl: string) => {
        setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
        setImagesToDelete((prev) => (prev.includes(imageUrl) ? prev : [...prev, imageUrl]));
    };

    const buildPatchFormData = (): FormData => {
        const formData = new FormData();
        formData.append('name', form.name.trim());
        formData.append('description', form.description.trim());
        formData.append('price', String(Number(form.price)));
        formData.append('isAvailable', String(form.isAvailable === 'true'));

        if (form.reducedPrice) {
            formData.append('reducedPrice', String(Number(form.reducedPrice)));
        }

        if (form.stock) {
            formData.append('stock', String(Number(form.stock)));
        }

        if (form.lowStockThreshold) {
            formData.append('lowStockThreshold', String(Number(form.lowStockThreshold)));
        }

        if (form.category) {
            formData.append('category', form.category);
        }

        if (form.shopId) {
            formData.append('shopId', form.shopId);
        }

        formData.append('imagesToKeep', JSON.stringify(existingImages));
        formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
        newImageFiles.forEach((file) => formData.append('images', file));

        return formData;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!productId) {
            return;
        }

        if (!form.name.trim()) {
            setError(t('errorNameRequired'));
            return;
        }

        if (!form.description.trim()) {
            setError(t('errorDescriptionRequired'));
            return;
        }

        const price = Number(form.price);
        if (Number.isNaN(price) || price < 0) {
            setError(t('errorPriceInvalid'));
            return;
        }

        if (form.reducedPrice) {
            const reducedPrice = Number(form.reducedPrice);
            if (Number.isNaN(reducedPrice) || reducedPrice < 0 || reducedPrice > price) {
                setError(t('errorReducedPriceInvalid'));
                return;
            }
        }

        if (form.stock && Number(form.stock) < 0) {
            setError(t('errorStockNegative'));
            return;
        }

        if (form.lowStockThreshold && Number(form.lowStockThreshold) < 0) {
            setError(t('errorLowStockThresholdNegative'));
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await updateProduct(productId, buildPatchFormData());

            notify(t('updateSuccess'), 'success');
            router.push('/dashboard/products');
        } catch (err: any) {
            setError(err.message || t('updateFailed'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.editProductContainer}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={styles.editProductContainer}>
            <h1 className={styles.editProductTitle}>{t('title')}</h1>
            <form className={styles.editProductForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    {error ? (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    ) : null}

                    <label htmlFor="productName" className={styles.formLabel}>
                        {t('name')}
                    </label>
                    <TextField
                        id="productName"
                        variant="outlined"
                        fullWidth
                        value={form.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                        required
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="productDescription" className={styles.formLabel}>
                        {t('description')}
                    </label>
                    <TextField
                        id="productDescription"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={3}
                        value={form.description}
                        onChange={(event) => handleChange('description', event.target.value)}
                        required
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="productShop" className={styles.formLabel}>
                        {t('shop')}
                    </label>
                    <TextField
                        id="productShop"
                        variant="outlined"
                        fullWidth
                        value={form.shopId}
                        slotProps={{ input: { readOnly: true } }}
                        helperText={form.shopId ? t('shopLocked') : t('shopMissing')}
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="productCategory" className={styles.formLabel}>
                        {t('category')}
                    </label>
                    <TextField
                        id="productCategory"
                        variant="outlined"
                        select
                        fullWidth
                        value={form.category}
                        onChange={(event) => handleChange('category', event.target.value)}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        <MenuItem value="">{t('none')}</MenuItem>
                        {categoriesLoading ? (
                            <MenuItem value="" disabled>
                                {t('loadingCategories')}
                            </MenuItem>
                        ) : (
                            categories.map((category) => (
                                <MenuItem key={category._id} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))
                        )}
                    </TextField>

                    <label htmlFor="productPrice" className={styles.formLabel}>
                        {t('price')}
                    </label>
                    <TextField
                        id="productPrice"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                        fullWidth
                        value={form.price}
                        onChange={(event) => handleChange('price', event.target.value)}
                        required
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="productStock" className={styles.formLabel}>
                        {t('stock')}
                    </label>
                    <TextField
                        id="productStock"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: '1' } }}
                        fullWidth
                        value={form.stock}
                        onChange={(event) => handleChange('stock', event.target.value)}
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="productReducedPrice" className={styles.formLabel}>
                        {t('reducedPrice')}
                    </label>
                    <TextField
                        id="productReducedPrice"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                        fullWidth
                        value={form.reducedPrice}
                        onChange={(event) => handleChange('reducedPrice', event.target.value)}
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="productLowStockThreshold" className={styles.formLabel}>
                        {t('lowStockThreshold')}
                    </label>
                    <TextField
                        id="productLowStockThreshold"
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: '1' } }}
                        fullWidth
                        value={form.lowStockThreshold}
                        onChange={(event) => handleChange('lowStockThreshold', event.target.value)}
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="productAvailability" className={styles.formLabel}>
                        {t('availability')}
                    </label>
                    <TextField
                        id="productAvailability"
                        variant="outlined"
                        select
                        fullWidth
                        value={form.isAvailable}
                        onChange={(event) => handleChange('isAvailable', event.target.value)}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        <MenuItem value="true">{t('available')}</MenuItem>
                        <MenuItem value="false">{t('unavailable')}</MenuItem>
                    </TextField>

                    <label className={styles.formLabel}>{t('existingImages')}</label>
                    {existingImages.length === 0 ? (
                        <Typography variant="body2" sx={{ mt: 1, mb: 2 }} color="text.secondary">
                            {t('noExistingImages')}
                        </Typography>
                    ) : (
                        <Stack spacing={1} sx={{ mt: 1, mb: 2 }}>
                            {existingImages.map((imageUrl) => (
                                <Box key={imageUrl} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                                    <Typography variant="caption" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {imageUrl}
                                    </Typography>
                                    <Button color="error" size="small" onClick={() => removeExistingImage(imageUrl)}>
                                        {t('remove')}
                                    </Button>
                                </Box>
                            ))}
                        </Stack>
                    )}

                    <label htmlFor="productImages" className={styles.formLabel}>
                        {t('newImages')}
                    </label>
                    <Button component="label" variant="outlined" sx={{ mt: 1, mb: 1 }}>
                        {t('uploadImages')}
                        <input
                            id="productImages"
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={handleImagesChange}
                        />
                    </Button>
                    {newImageFiles.length > 0 ? (
                        <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                            {t('newImagesSelected', { count: newImageFiles.length })}
                        </Typography>
                    ) : null}
                </div>

                <Stack direction="row" spacing={2}>
                    <Button type="submit" className={styles.formButton} variant="contained" disabled={submitting}>
                        {submitting ? t('saving') : t('submit')}
                    </Button>
                    <Button variant="outlined" onClick={() => router.push('/dashboard/products')}>
                        {t('cancel')}
                    </Button>
                </Stack>
            </form>
        </div>
    );
};

export default EditProduct;