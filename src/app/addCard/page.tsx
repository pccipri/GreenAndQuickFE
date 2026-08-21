"use client";

import { FC, useMemo, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
    Box,
    Card,
    TextField,
    Typography,
    Button,
    Alert,
} from "@mui/material";

import CreditCard from "../components/card";
import { addPaymentMethod } from "@/services/paymentMethodService";
import { notify } from "@/utils/toast";

const AddCardForm: FC<{ returnTo: string }> = ({ returnTo }) => {
    const t = useTranslations('AddCard');
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [cardholderName, setCardholderName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) {
            setMessage(t('stripeNotReady'));
            return;
        }

        setSubmitting(true);
        setMessage(null);

        try {
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error(t('cardDetailsMissing'));
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: cardholderName || undefined,
                },
            });

            if (error || !paymentMethod?.id) {
                throw new Error(error?.message || t('invalidCardDetails'));
            }

            await addPaymentMethod(paymentMethod.id);
            notify(t('saveSuccess'), 'success');
            router.push(returnTo);
        } catch (error: any) {
            const nextMessage = error.message || t('saveFailed');
            setMessage(nextMessage);
            notify(nextMessage, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CreditCard
                type="Card"
                number="•••• •••• •••• ••••"
                name={cardholderName}
                expiry="MM/YY"
                cvc="***"
            />

            {message ? <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{message}</Alert> : null}

            <Card sx={{ p: 3, boxShadow: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {t('paymentDetails')}
                </Typography>

                <TextField
                    fullWidth
                    label={t('cardHolder')}
                    value={cardholderName}
                    onChange={(event) => setCardholderName(event.target.value)}
                    sx={{ mb: 2.5 }}
                />

                <Typography sx={{ mb: 1 }}>{t('cardDetails')}</Typography>
                <Box
                    sx={{
                        border: '1px solid #d0d0d0',
                        borderRadius: 1,
                        p: 1.5,
                        bgcolor: '#fff',
                    }}
                >
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#1f2937',
                                    '::placeholder': { color: '#9ca3af' },
                                },
                            },
                        }}
                    />
                </Box>
            </Card>

            <Button variant="contained" type="button" onClick={handleSubmit} disabled={submitting} sx={{ mt: 5 }}>
                {submitting ? t('saving') : t('saveCard')}
            </Button>
        </Box>
    );
};

const AddCard: FC = () => {
    const t = useTranslations('AddCard');
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || '/profile/payment-methods';
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';
    const stripePromise = useMemo(() => {
        return publishableKey ? loadStripe(publishableKey) : null;
    }, [publishableKey]);

    if (!stripePromise) {
        return (
            <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
                <Alert severity="warning">{t('stripeNotConfigured')}</Alert>
            </Box>
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <AddCardForm returnTo={returnTo} />
        </Elements>
    );
};

export default AddCard;