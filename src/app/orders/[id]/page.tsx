"use client"

import { FC, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { cancelOrder, getOrderById } from "@/services/orderService";
import type { Order } from "@/interfaces/Order";
import { notify } from "@/utils/toast";

const normalizeOrderStatus = (status?: string): string => {
    const normalized = (status ?? 'placed').toLowerCase();
    if (normalized === 'active' || normalized === 'pending') {
        return 'placed';
    }

    return normalized;
};

const normalizePaymentStatus = (status?: string): string => {
    const normalized = (status ?? 'pending').toLowerCase();
    if (normalized === 'succeeded' || normalized === 'paid') {
        return 'paid';
    }

    if (normalized === 'failed' || normalized === 'declined') {
        return 'failed';
    }

    return normalized;
};

const OrderDetails: FC = () => {
    const t = useTranslations('OrderDetails');
    const router = useRouter();
    const params = useParams<{ id?: string | string[] }>();
    const orderId = useMemo(() => {
        if (Array.isArray(params?.id)) {
            return params.id[0];
        }

        return params?.id;
    }, [params?.id]);

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [submittingCancel, setSubmittingCancel] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrder = async () => {
            if (!orderId) {
                setError(t('missingOrderId'));
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await getOrderById(orderId);
                if (!data) {
                    setError(t('notFound'));
                    setOrder(null);
                    return;
                }

                setOrder(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || t('loadFailed'));
            } finally {
                setLoading(false);
            }
        };

        void loadOrder();
    }, [orderId]);

    const canCancel = normalizeOrderStatus(order?.status) === 'placed' || normalizeOrderStatus(order?.status) === 'confirmed';

    const handleCancelOrder = async () => {
        if (!order?._id) {
            return;
        }

        const confirmed = window.confirm(t('cancelConfirm'));
        if (!confirmed) {
            return;
        }

        try {
            setSubmittingCancel(true);
            const updated = await cancelOrder(order._id);
            setOrder(updated);
            notify(t('cancelSuccess'), 'success');
        } catch (err: any) {
            notify(err.message || t('cancelFailed'), 'error');
        } finally {
            setSubmittingCancel(false);
        }
    };

    const primaryTextStyles = {
        color: 'text.primary',
        marginTop: 2,
    };

    if (loading) {
        return (
            <div className={styles.orderDetailsContainer}>
                <CircularProgress />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className={styles.orderDetailsContainer}>
                <Alert severity="error" sx={{ mb: 2 }}>{error || t('loadFailed')}</Alert>
                <Button variant="outlined" onClick={() => router.push('/orders')}>{t('backToOrders')}</Button>
            </div>
        );
    }

    const firstImage = order.items?.[0]?.product?.imageUrl ?? '/images/bgplaceholder.jpeg';
    const orderStatus = normalizeOrderStatus(order.status);
    const paymentStatus = normalizePaymentStatus(order.paymentStatus);
    const statusLabel = t(`status.${orderStatus}` as const);
    const paymentStatusLabel = t(`paymentStatus.${paymentStatus}` as const);

    return (
        <>
            <div className={styles.orderDetailsContainer} style={{ padding: 20 }}>
                <Card sx={{ width: 760, maxWidth: '100%' }}>
                    <CardMedia
                        sx={{ height: 220, width: 220, margin: 2, borderRadius: 2 }}
                        image={firstImage}
                        title={t('imageTitle')}
                    />
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ mb: 0 }}>
                                {t('orderId')}: {order.orderNumber ?? order._id}
                            </Typography>
                            <Chip size="small" label={statusLabel} color={orderStatus === 'cancelled' ? 'error' : 'primary'} />
                            <Chip size="small" label={paymentStatusLabel} variant="outlined" />
                        </Stack>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Typography variant="h6" sx={{ mb: 1 }}>{t('products')}</Typography>
                        <Stack spacing={1.5}>
                            {order.items.map((item, index) => (
                                <Box key={`${item.productId}-${index}`} className={styles.orderItemRow}>
                                    <Typography variant="body1" sx={primaryTextStyles}>
                                        {item.product?.name ?? t('sampleProduct')}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('quantity')}: {item.quantity} · {t('price')}: {item.priceAtPurchase ?? item.product?.price ?? 0} RON
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('shop')}: {item.shopId ?? t('sampleShop')}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body1" sx={primaryTextStyles}>
                            {t('totalPrice')}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {order.totalAmount ?? 0} RON
                        </Typography>

                        <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                            <Button variant="outlined" onClick={() => router.push('/orders')}>{t('backToOrders')}</Button>
                            {canCancel ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleCancelOrder}
                                    disabled={submittingCancel}
                                >
                                    {submittingCancel ? t('cancelling') : t('cancelOrder')}
                                </Button>
                            ) : null}
                        </Stack>
                    </CardContent>
                </Card>
            </div >
        </>
    );
};

export default OrderDetails;