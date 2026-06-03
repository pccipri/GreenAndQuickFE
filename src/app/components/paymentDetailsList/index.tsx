"use client"

import { FC } from "react";
import { useTranslations } from 'next-intl';
import styles from './index.module.css';

interface PaymentDetailsListProps {
    id: string;
    date: string;
    paymentMethod: string;
    paymentStatus: string;
}

const PaymentDetailsList: FC<PaymentDetailsListProps> = ({
    id,
    date,
    paymentMethod,
    paymentStatus,
}) => {
    const t = useTranslations('OrderTabs');
    return (
        <li className={styles.listSpacing}>
            <h4>{t('transactionId')}: {id}</h4>
            <p className={styles.paragraphSpacing}>
                <strong>{t('orderDate')}:</strong> {date}
            </p>
            <p className={styles.paragraphSpacing}>
                <strong>{t('paymentMethod')}:</strong> {paymentMethod}
            </p>
            <p className={styles.paragraphSpacing}>
                <strong>{t('paymentStatus')}:</strong> {paymentStatus}
            </p>
        </li>
    );
};

export default PaymentDetailsList;