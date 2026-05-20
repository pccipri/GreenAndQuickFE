"use client"

import { FC } from "react";
import { useTranslations } from 'next-intl';

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
        <li style={{ marginBottom: '30px' }}>
            <h4>{t('transactionId')}: {id}</h4>
            <p style={{ margin: '10px 0' }}>
                <strong>{t('orderDate')}:</strong> {date}
            </p>
            <p style={{ margin: '10px 0' }}>
                <strong>{t('paymentMethod')}:</strong> {paymentMethod}
            </p>
            <p style={{ margin: '10px 0' }}>
                <strong>{t('paymentStatus')}:</strong> {paymentStatus}
            </p>
        </li>
    );
};

export default PaymentDetailsList;