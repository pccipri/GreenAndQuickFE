"use client"

import { FC, useEffect, useMemo, useState } from "react";

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getOrderById } from "@/services/orderService";
import type { Order } from "@/interfaces/Order";

const OrderConfirmation: FC = () => {
    const t = useTranslations('OrderConfirmation');
    const tOrderDetails = useTranslations('OrderDetails');
    const searchParams = useSearchParams();
    const orderNumber = useMemo(() => searchParams.get('orderId') ?? t('pendingOrder'), [searchParams, t]);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrder = async () => {
            if (!orderNumber || orderNumber === 'pending') {
                return;
            }

            try {
                setLoading(true);
                const data = await getOrderById(orderNumber);
                setOrder(data ?? null);
                setError(null);
            } catch (err: any) {
                setError(err.message || t('loadFailed'));
            } finally {
                setLoading(false);
            }
        };

        void loadOrder();
    }, [orderNumber]);

    return (
        <>
            <div className={styles.orderConfirmationContainer}>
                <CheckCircleOutlinedIcon color="success" sx={{ fontSize: 80, color: 'green' }} />
                <h2>{t('confirmationTitle')}</h2>
                <p>{t('confirmationMessage')}</p>
                <p>
                    {t('orderNumber')} <strong>#{order?.orderNumber ?? orderNumber}</strong>
                </p>
                {loading ? (
                    <CircularProgress size={26} />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : order ? (
                    <>
                        <Typography>{t('orderStatus')}: {tOrderDetails(`status.${order.status ?? 'placed'}` as const)}</Typography>
                        <Typography>{t('paymentStatus')}: {tOrderDetails(`paymentStatus.${order.paymentStatus ?? 'pending'}` as const)}</Typography>
                        <Typography>{t('total')}: {order.totalAmount ?? 0} RON</Typography>
                    </>
                ) : null}
                <Link href="/orders"><Button variant="text">{t('orderHistory')}</Button></Link>
                <Link href="/products"><Button variant="contained">{t('continueShopping')}</Button></Link>
            </div>
        </>
    );
};

export default OrderConfirmation;