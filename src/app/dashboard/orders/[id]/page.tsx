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

import { cancelShopOrder, getShopOrders, updateOrderStatus } from "@/services/orderService";
import type { Order, OrderStatus } from "@/interfaces/Order";
import { notify } from "@/utils/toast";

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
    const [submittingStatus, setSubmittingStatus] = useState(false);
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
                const orders = await getShopOrders();
                const currentOrder = orders.find((entry) => entry._id === orderId);

                if (!currentOrder) {
                    setError(t('notFound'));
                    setOrder(null);
                    return;
                }

                setOrder(currentOrder);
                setError(null);
            } catch (err: any) {
                setError(err.message || t('loadFailed'));
            } finally {
                setLoading(false);
            }
        };

        void loadOrder();
    }, [orderId, t]);

    const canCancel = order?.status === 'placed' || order?.status === 'confirmed';

    const getNextStatus = (status?: OrderStatus): OrderStatus | null => {
        switch (status) {
            case 'placed':
                return 'confirmed';
            case 'confirmed':
                return 'shipped';
            case 'shipped':
                return 'delivered';
            default:
                return null;
        }
    };

    const getStatusLabel = (status?: OrderStatus) => {
        if (!status) {
            return 'placed';
        }

        return t(`status.${status}`);
    };

    const handleUpdateStatus = async () => {
        if (!order?._id) {
            return;
        }

        const nextStatus = getNextStatus(order.status);
        if (!nextStatus) {
            return;
        }

        try {
            setSubmittingStatus(true);
            const updated = await updateOrderStatus(order._id, nextStatus);
            setOrder(updated);
            notify(t('statusUpdateSuccess'), 'success');
        } catch (err: any) {
            notify(err.message || t('statusUpdateFailed'), 'error');
        } finally {
            setSubmittingStatus(false);
        }
    };

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
            const updated = await cancelShopOrder(order._id);
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
                <Button variant="outlined" onClick={() => router.push('/dashboard/orders')}>{t('backToDashboardOrders')}</Button>
            </div>
        );
    }

    const firstImage = order.items?.[0]?.product?.imageUrl ?? '/images/bgplaceholder.jpeg';
    const orderStatus = order.status ?? 'placed';
    const paymentStatus = order.paymentStatus ?? 'pending';
    const nextStatus = getNextStatus(order.status);
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
                                {t('orderId')}: {order._id}
                            </Typography>
                            <Chip size="small" label={getStatusLabel(orderStatus)} color={orderStatus === 'cancelled' ? 'error' : 'primary'} />
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
                            <Button variant="outlined" onClick={() => router.push('/dashboard/orders')}>{t('backToDashboardOrders')}</Button>
                            {nextStatus ? (
                                <Button
                                    variant="contained"
                                    onClick={handleUpdateStatus}
                                    disabled={submittingStatus || submittingCancel}
                                >
                                    {submittingStatus ? t('statusUpdating') : t('statusAction', { status: getStatusLabel(nextStatus) })}
                                </Button>
                            ) : null}
                            {canCancel ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleCancelOrder}
                                    disabled={submittingCancel || submittingStatus}
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