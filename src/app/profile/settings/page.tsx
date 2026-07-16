"use client"

import { FC, useState } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from "@mui/material/Button";

import Switch from '@mui/material/Switch';

const UserPreferences: FC = () => {
    const t = useTranslations('UserPreferences');

    const [language, setLanguage] = useState('en');

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    }

    return (
        <>
            <div className={styles.parentContainer}>
                <h2 className={styles.title}>{t('title')}</h2>

                <h3 className={styles.label}>{t('language')}</h3>

                <FormControl className={styles.languageField}>
                    <Select
                        id="language-select"
                        value={language}
                        onChange={handleChange}
                    >
                        <MenuItem value="en">{t('english')}</MenuItem>
                        <MenuItem value="ro">{t('romanian')}</MenuItem>
                    </Select>
                </FormControl>

                <h3 className={styles.label}>{t('notifications')}</h3>

                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label={t('orderStatus')}
                />
                <p className={styles.helper}>{t('orderStatusHelper')}</p>

                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label={t('contentUpdates')}
                />
                <p className={styles.helper}>{t('contentUpdatesHelper')}</p>

                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label={t('restock')}
                />
                <p className={styles.helper}>{t('restockHelper')}</p>

                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label={t('newRecipe')}
                />
                <p className={styles.helper}>{t('newRecipeHelper')}</p>

                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label={t('lowStock')}
                />
                <p className={styles.helper}>{t('lowStockHelper')}</p>

                <Button variant="contained" className={styles.saveBtn}>
                    {t('saveChanges')}
                </Button>
            </div>
        </>
    );
};

export default UserPreferences;