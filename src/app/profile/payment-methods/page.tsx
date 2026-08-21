"use client"

import { FC, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import CreditCard from "@/app/components/card";
import { getPaymentMethods, removePaymentMethod, setDefaultPaymentMethod } from "@/services/paymentMethodService";
import type { PaymentMethod } from "@/interfaces/Cart";
import { notify } from "@/utils/toast";

const PaymentMethods: FC = () => {
    const t = useTranslations('PaymentMethods');
    const router = useRouter();
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingMethodId, setUpdatingMethodId] = useState<string | null>(null);

    const loadMethods = async () => {
        try {
            setLoading(true);
            const data = await getPaymentMethods();
            setMethods(data);
        } catch (error: any) {
            notify(error.message || t('loadFailed'), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadMethods();
    }, []);

    const handleSetDefault = async (method: PaymentMethod) => {
        const methodId = method._id;
        if (!methodId || method.isDefault) {
            return;
        }

        try {
            setUpdatingMethodId(methodId);
            await setDefaultPaymentMethod(methodId);
            await loadMethods();
            notify(t('setDefaultSuccess'), 'success');
        } catch (error: any) {
            notify(error.message || t('setDefaultFailed'), 'error');
        } finally {
            setUpdatingMethodId(null);
        }
    };

    const handleRemoveMethod = async (method: PaymentMethod) => {
        const methodId = method._id;
        if (!methodId) {
            return;
        }

        const confirmed = window.confirm(t('removeConfirm'));
        if (!confirmed) {
            return;
        }

        try {
            setUpdatingMethodId(methodId);
            await removePaymentMethod(methodId);
            await loadMethods();
            notify(t('removeSuccess'), 'success');
        } catch (error: any) {
            notify(error.message || t('removeFailed'), 'error');
        } finally {
            setUpdatingMethodId(null);
        }
    };

    return (
        <>
            <div className={styles.paymentMethodsContainer}>
                <h2 className={styles.title}>{t('activeMethods')}</h2>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : methods.length === 0 ? (
                    <Box sx={{ py: 2 }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>{t('empty')}</Typography>
                        <Button variant="outlined" onClick={() => router.push('/addCard')}>
                            {t('addCard')}
                        </Button>
                    </Box>
                ) : (
                    <div className={styles.cardContainer}>
                        {methods.map((method) => (
                            <Box key={method._id ?? method.stripePaymentMethodId} className={styles.methodCard}>
                                {method.isDefault ? <Chip label={t('defaultBadge')} color="success" size="small" sx={{ mb: 1 }} /> : null}
                                <CreditCard
                                    type={method.brand || 'Card'}
                                    number={`•••• ${method.last4}`}
                                    name={t('savedCardName')}
                                    expiry={`${method.expiryMonth}/${String(method.expiryYear).slice(-2)}`}
                                    cvc="***"
                                />
                                <Stack direction="row" spacing={1} sx={{ mt: -2, mb: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        disabled={Boolean(updatingMethodId) || method.isDefault}
                                        onClick={() => handleSetDefault(method)}
                                    >
                                        {t('setDefault')}
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="error"
                                        size="small"
                                        disabled={Boolean(updatingMethodId)}
                                        onClick={() => handleRemoveMethod(method)}
                                    >
                                        {t('remove')}
                                    </Button>
                                </Stack>
                            </Box>
                        ))}
                    </div>
                )}

                <h2 className={styles.title}>{t('addNewMethod')}</h2>
                <Button variant="outlined" type="button" onClick={() => router.push('/addCard')}>
                    {t('addCard')}
                </Button>
            </div>
        </>
    );
};

export default PaymentMethods;