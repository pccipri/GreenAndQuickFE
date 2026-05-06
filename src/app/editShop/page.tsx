"use client"

import { FC, useState } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


const EditShop: FC = () => {
    const t = useTranslations('EditShopForm');

    const [category, setCategory] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    return (
        <>
            <div className={styles.editShopContainer}>
                <h1 className={styles.editShopTitle}>{t('title')}</h1>
                <form className={styles.editShopForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="shopName" className={styles.formLabel}>
                            {t('name')}
                        </label>
                        <TextField
                            id="shopName"
                            variant="outlined"
                            defaultValue="John's Grocery"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="shopDescription" className={styles.formLabel}>
                            {t('description')}
                        </label>
                        <TextField
                            id="shopDescription"
                            variant="outlined"
                            defaultValue="John's Grocery"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="shopOwner" className={styles.formLabel}>
                            {t('owner')}
                        </label>
                        <TextField
                            id="shopOwner"
                            variant="outlined"
                            defaultValue="John Doe"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="shopCategory" className={styles.formLabel}>
                            {t('category')}
                        </label>
                        <Select
                            labelId="shopCategory"
                            id="shopCategorySelect"
                            value={category}
                            onChange={handleChange}
                            sx={{ mt: 1, mb: 2 }}
                        >
                            <MenuItem value="Fruits">Fruits</MenuItem>
                            <MenuItem value="Vegetables">Vegetables</MenuItem>
                            <MenuItem value="Dairy">Dairy</MenuItem>
                        </Select>

                        <label htmlFor="shopAddDate" className={styles.formLabel}>
                            {t('addDate')}
                        </label>
                        <TextField
                            id="shopAddDate"
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

export default EditShop;