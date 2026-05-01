"use client"

import { FC, useState } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import TextField from '@mui/material/TextField';
import NumberField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const EditProduct: FC = () => {
    const t = useTranslations('EditProductForm');



    return (
        <>
            <div className={styles.editProductContainer}>
                <h1 className={styles.editProductTitle}>{t('title')}</h1>
                <form className={styles.editProductForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="productName" className={styles.formLabel}>
                            {t('name')}
                        </label>
                        <TextField
                            id="productName"
                            variant="outlined"
                            defaultValue="Tomatoes"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <label htmlFor="productShop" className={styles.formLabel}>
                            {t('shop')}
                        </label>
                        <TextField
                            id="productShop"
                            variant="outlined"
                            defaultValue="John's Grocery"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <label htmlFor="productPrice" className={styles.formLabel}>
                            {t('price')}
                        </label>
                        <NumberField
                            id="productPrice"
                            defaultValue="5.99"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <label htmlFor="productAddDate" className={styles.formLabel}>
                            {t('addDate')}
                        </label>
                        <TextField
                            id="productAddDate"
                            variant="outlined"
                            defaultValue="02.05.2026"
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

export default EditProduct;