"use client"

import { FC } from "react";
import { useTranslations } from 'next-intl';

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
        <li style={{ marginBottom: '30px' }}>
            <p style={{ margin: '10px 0' }}>
                <strong>{t('deliveryAddress')}:</strong>
            </p>
            <p style={{ margin: '10px 0' }}>
                {street}
            </p>
            <p style={{ margin: '10px 0' }}>
                {city}, {county} {zipcode}
            </p>
            <p style={{ margin: '10px 0' }}>
                {country}
            </p>
        </li>
    );
};

export default OrderDetailsList;