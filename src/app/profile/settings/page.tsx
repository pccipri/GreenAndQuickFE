"use client"

import { FC, useEffect, useState } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from "@mui/material/Button";

import Switch from '@mui/material/Switch';
import { authAPI } from "@/lib/tokenManager";
import { notify } from "@/utils/toast";
import { useAuth } from "@/contexts/AuthProvider";

type NotificationPreferences = {
    orderStatusUpdates: boolean;
    contentUpdates: boolean;
    restockAlerts: boolean;
    newRecipeAlerts: boolean;
    lowStockAlerts: boolean;
}

const UserPreferences: FC = () => {
    const t = useTranslations('UserPreferences');
    const { refresh } = useAuth();

    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
        orderStatusUpdates: true,
        contentUpdates: true,
        restockAlerts: true,
        newRecipeAlerts: true,
        lowStockAlerts: true,
    });

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const { data } = await authAPI.get('/users/me');
                const profile = data?.user ?? data;
                const preferences = profile?.preferences as Record<string, any> | null | undefined;
                const notifications = preferences?.notificationPreferences ?? {};

                setLanguage((preferences?.language as string) || 'en');
                setNotificationPreferences({
                    orderStatusUpdates: notifications.orderStatusUpdates ?? true,
                    contentUpdates: notifications.contentUpdates ?? true,
                    restockAlerts: notifications.restockAlerts ?? true,
                    newRecipeAlerts: notifications.newRecipeAlerts ?? true,
                    lowStockAlerts: notifications.lowStockAlerts ?? true,
                });
            } catch {
                notify('Failed to load preferences', 'error');
            } finally {
                setLoading(false);
            }
        }

        fetchPreferences();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    }

    const updateNotificationPreference = (field: keyof NotificationPreferences, value: boolean) => {
        setNotificationPreferences((prev) => ({ ...prev, [field]: value }));
    }

    const savePreferences = async () => {
        setSaving(true);
        try {
            await authAPI.patch('/users/me', {
                preferences: {
                    language,
                    notificationPreferences,
                },
            });

            await refresh();
            notify('Preferences updated successfully', 'success');
        } catch {
            notify('Failed to save preferences', 'error');
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center">Loading preferences...</div>;
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
                    control={<Switch checked={notificationPreferences.orderStatusUpdates} onChange={(e) => updateNotificationPreference('orderStatusUpdates', e.target.checked)} />}
                    label={t('orderStatus')}
                />
                <p className={styles.helper}>{t('orderStatusHelper')}</p>

                <FormControlLabel
                    control={<Switch checked={notificationPreferences.contentUpdates} onChange={(e) => updateNotificationPreference('contentUpdates', e.target.checked)} />}
                    label={t('contentUpdates')}
                />
                <p className={styles.helper}>{t('contentUpdatesHelper')}</p>

                <FormControlLabel
                    control={<Switch checked={notificationPreferences.restockAlerts} onChange={(e) => updateNotificationPreference('restockAlerts', e.target.checked)} />}
                    label={t('restock')}
                />
                <p className={styles.helper}>{t('restockHelper')}</p>

                <FormControlLabel
                    control={<Switch checked={notificationPreferences.newRecipeAlerts} onChange={(e) => updateNotificationPreference('newRecipeAlerts', e.target.checked)} />}
                    label={t('newRecipe')}
                />
                <p className={styles.helper}>{t('newRecipeHelper')}</p>

                <FormControlLabel
                    control={<Switch checked={notificationPreferences.lowStockAlerts} onChange={(e) => updateNotificationPreference('lowStockAlerts', e.target.checked)} />}
                    label={t('lowStock')}
                />
                <p className={styles.helper}>{t('lowStockHelper')}</p>

                <Button variant="contained" className={styles.saveBtn} onClick={savePreferences} disabled={saving}>
                    {saving ? 'Saving...' : t('saveChanges')}
                </Button>
            </div>
        </>
    );
};

export default UserPreferences;