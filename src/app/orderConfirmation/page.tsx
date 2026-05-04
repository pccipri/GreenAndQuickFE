"use client"

import { FC } from "react";

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Button from "@mui/material/Button";
import Link from 'next/link';

const OrderConfirmation: FC = () => {
    const t = useTranslations('OrderConfirmation');

    return (
        <>
            <div className={styles.orderConfirmationContainer}>
                <CheckCircleOutlinedIcon color="success" sx={{ fontSize: 80, color: 'green' }} />
                <h2>{t('confirmationTitle')}</h2>
                <p>{t('confirmationMessage')}</p>
                <p>
                    {t('orderNumber')} <strong>#123456789</strong>
                </p>
                <Button variant="text">{t('orderHistory')}</Button>
                <Link href="/shopPage"><Button variant="contained">{t('continueShopping')}</Button></Link>
            </div>
        </>
    );
};

export default OrderConfirmation;