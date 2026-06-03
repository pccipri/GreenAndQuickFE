"use client"

import { FC } from "react";
import { useTranslations } from 'next-intl';
import styles from './index.module.css';

interface OrderDetailsListProps {
    street: string;
    city: string;
    county: string;
    country: string;
    zipcode: number;
}

const OrderDetailsList: FC<OrderDetailsListProps> = ({
    street,
    city,
    county,
    country,
    zipcode
}) => {
    const t = useTranslations('OrderTabs');
    
    return (
        <li className={styles.listSpacing}>
            <p className={styles.paragraphSpacing}>
                <strong>{t('deliveryAddress')}:</strong>
            </p>
            <p className={styles.paragraphSpacing}>
                {street}
            </p>
            <p className={styles.paragraphSpacing}>
                {city}, {county} {zipcode}
            </p>
            <p className={styles.paragraphSpacing}>
                {country}
            </p>
        </li>
    );
};

export default OrderDetailsList;