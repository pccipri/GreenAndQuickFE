"use client"

import { FC, useState } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


const EditShop: FC = () => {
    const t = useTranslations('EditShopForm');

    const [active, setActive] = useState('Yes');

    const handleChange = (event: SelectChangeEvent) => {
        setActive(event.target.value as string);
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

                        <label htmlFor="shopSlug" className={styles.formLabel}>
                            {t('slug')}
                        </label>
                        <TextField
                            id="shopSlug"
                            variant="outlined"
                            defaultValue="johns-grocery"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />


                        <label htmlFor="shopDescription" className={styles.formLabel}>
                            {t('description')}
                        </label>
                        <TextField
                            id="shopDescription"
                            variant="outlined"
                            defaultValue="A local grocery store offering fresh produce and daily essentials."
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="shopLogo" className={styles.formLabel}>
                            {t('logo')}
                        </label>
                        <TextField
                            id="shopLogo"
                            variant="outlined"
                            defaultValue="https://example.com/logo.png"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="shopCoverImg" className={styles.formLabel}>
                            {t('coverImage')}
                        </label>
                        <TextField
                            id="shopCoverImg"
                            variant="outlined"
                            defaultValue="https://example.com/cover.png"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="shopOwnerId" className={styles.formLabel}>
                            {t('ownerId')}
                        </label>
                        <TextField
                            id="shopOwnerId"
                            variant="outlined"
                            defaultValue="1"
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="shopLocation" className={styles.formLabel}>
                            {t('location')}
                        </label>
                        <TextField
                            id="shopLocation"
                            variant="outlined"
                            defaultValue="123 Main St, Anytown, USA, 40.6892, -74.0445"
                            fullWidth
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
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
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