"use client"

import { FC } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const CreateGroup: FC = () => {
    const t = useTranslations('ManageGroupForm');


    // Sample data for the country autocomplete
    const countries = [
        { id: 1, name: "Romania" },
        { id: 2, name: "Germany" },
        { id: 3, name: "The Netherlands" },
        { id: 4, name: "France" },
        { id: 5, name: "Italy" },
    ];

    // Sample data for the county autocomplete
    const counties = [
        { id: 1, name: "Cluj" },
        { id: 2, name: "Maramures" },
        { id: 3, name: "Timis" },
        { id: 4, name: "Iasi" },
        { id: 5, name: "Constanta" },
    ];

    // Sample data for the city autocomplete
    const cities = [
        { id: 1, name: "Cluj-Napoca" },
        { id: 2, name: "Baia Mare" },
        { id: 3, name: "Timisoara" },
        { id: 4, name: "Iasi" },
        { id: 5, name: "Constanta" },
    ];

    return (
        <>
            <div className={styles.addGroupContainer}>
                <h1 className={styles.addGroupTitle}>{t('createGroup')}</h1>
                <form className={styles.addGroupForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="groupName" className={styles.formLabel}>
                            {t('groupName')}
                        </label>
                        <TextField
                            id="groupName"
                            variant="outlined"
                            placeholder={t("groupNamePlaceholder")}
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />
                        <label htmlFor="groupDescription" className={styles.formLabel}>
                            {t('groupDescription')}
                        </label>
                        <TextField
                            id="groupDescription"
                            variant="outlined"
                            placeholder={t("groupDescriptionPlaceholder")}
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <h3 className={styles.formSubtitle}>{t('groupAddress')}</h3>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <label htmlFor="groupStreet" className={styles.formLabel}>
                                        {t("groupStreet")}
                                    </label>
                                    <TextField
                                        id="groupStreet"
                                        variant="outlined"
                                        placeholder={t("groupStreetPlaceholder")}
                                        fullWidth
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <label htmlFor="groupCity" className={styles.formLabel}>
                                        {t("groupCity")}
                                    </label>
                                    <Autocomplete
                                        options={cities}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                id="groupCity"
                                                variant="outlined"
                                                placeholder={t("selectCity")}
                                                fullWidth
                                            />
                                        )}
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <label htmlFor="groupCounty" className={styles.formLabel}>
                                        {t("groupCounty")}
                                    </label>
                                    <Autocomplete
                                        options={counties}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                id="groupCounty"
                                                variant="outlined"
                                                placeholder={t("selectCounty")}
                                                fullWidth
                                            />
                                        )}
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <label htmlFor="groupCountry" className={styles.formLabel}>
                                        {t("groupCountry")}
                                    </label>
                                    <Autocomplete
                                        options={countries}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                id="groupCountry"
                                                variant="outlined"
                                                placeholder={t("selectCountry")}
                                                fullWidth
                                            />
                                        )}
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <label htmlFor="groupZipCode" className={styles.formLabel}>
                                        {t("groupZipCode")}
                                    </label>
                                    <TextField
                                        id="groupZipCode"
                                        variant="outlined"
                                        placeholder={t("groupZipCodePlaceholder")}
                                        slotProps={{ htmlInput: { maxLength: 10 } }}
                                        fullWidth
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                    </div>
                    <Button type="submit" className={styles.formButton} variant="contained">
                        {t('createBtn')}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default CreateGroup;