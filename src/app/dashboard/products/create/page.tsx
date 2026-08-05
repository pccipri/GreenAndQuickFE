"use client"

import { ChangeEvent, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import { Alert, TextField, Button, Stack, MenuItem, Typography } from '@mui/material';
import { addProduct } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import { getShopByOwner } from "@/services/shopService";
import { useAuth } from "@/contexts/AuthProvider";
import { notify } from "@/utils/toast";

const AddProduct: FC = () => {
    const t = useTranslations('AddProductForm');
    const router = useRouter();
    const { user } = useAuth();

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
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Array<{ _id: string; name: string }>>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [shopLoading, setShopLoading] = useState(true);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        setImageFiles(files);
    };

    const buildProductFormData = (): FormData => {
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

        imageFiles.forEach((file) => formData.append('images', file));
        return formData;
    };

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
        if (!user) {
            return;
        }

        const loadShop = async () => {
            try {
                const shop = await getShopByOwner(user.id);
                if (shop) {
                    setForm((prev) => ({ ...prev, shopId: shop._id ?? shop.id ?? '' }));
                    setError(null);
                } else {
                    setForm((prev) => ({ ...prev, shopId: '' }));
                    setError(t('errorNoShop'));
                }
            } catch {
                setForm((prev) => ({ ...prev, shopId: '' }));
                setError(t('errorShopLookupFailed'));
            } finally {
                setShopLoading(false);
            }
        };

        void loadShop();
    }, [user]);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!form.name.trim()) {
            setError(t('errorNameRequired'));
            return;
        }

        if (!form.description.trim()) {
            setError(t('errorDescriptionRequired'));
            return;
        }

        if (!form.shopId.trim()) {
            setError(t('errorShopRequired'));
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

        try {
            await addProduct(form.shopId, buildProductFormData());

            notify(t('createSuccess'), 'success');
            router.push('/dashboard/products');
        } catch (err: any) {
            setError(err.message || t('createFailed'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.addProductContainer}>
            <h1 className={styles.addProductTitle}>{t('title')}</h1>
            <form className={styles.addProductForm} onSubmit={handleSubmit}>
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
                        placeholder={t('namePlaceholder')}
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
                        placeholder={t('descriptionPlaceholder')}
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
                        helperText={shopLoading ? t('loadingShop') : (form.shopId ? t('shopAutoAssigned') : t('errorNoShop'))}
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
                        placeholder={t('pricePlaceholder')}
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
                        placeholder={t('stockPlaceholder')}
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
                        placeholder={t('reducedPricePlaceholder')}
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
                        placeholder={t('lowStockThresholdPlaceholder')}
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

                    <label htmlFor="productImages" className={styles.formLabel}>
                        {t('images')}
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
                    {imageFiles.length > 0 ? (
                        <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                            {t('imagesSelected', { count: imageFiles.length })}
                        </Typography>
                    ) : null}
                </div>

                <Stack direction="row" spacing={2}>
                    <Button type="submit" className={styles.formButton} variant="contained" disabled={submitting}>
                        {submitting ? t('creating') : t('submit')}
                    </Button>
                    <Button variant="outlined" onClick={() => router.push('/dashboard/products')}>
                        {t('cancel')}
                    </Button>
                </Stack>
            </form>
        </div>
    );
};

export default AddProduct;