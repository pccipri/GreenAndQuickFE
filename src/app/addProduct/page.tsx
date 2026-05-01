"use client"

import { FC } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import TextField from '@mui/material/TextField';
import NumberField from '@mui/material/TextField';
import Button from "node_modules/@mui/material/esm/Button/Button";

const AddProduct: FC = () => {
    const t = useTranslations('AddProductForm');

    return (
        <>
            <div className={styles.addProductContainer}>
                <h1 className={styles.addProductTitle}>{t('title')}</h1>
                <form className={styles.addProductForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="productName" className={styles.formLabel}>
                            {t('name')}
                        </label>
                        <TextField
                            id="productName"
                            variant="outlined"
                            placeholder="e.g. Tomatoes"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <label htmlFor="productShop" className={styles.formLabel}>
                            {t('shop')}
                        </label>
                        <TextField
                            id="productShop"
                            variant="outlined"
                            placeholder="e.g. John's Grocery"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <label htmlFor="productPrice" className={styles.formLabel}>
                            {t('price')}
                        </label>
                        <NumberField
                            id="productPrice"
                            placeholder="e.g. 5.99"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />
                    </div>
                    <Button type="submit" className={styles.formButton} variant="contained">
                        {t('submit')}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default AddProduct;