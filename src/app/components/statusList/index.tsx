"use client";

import { FC } from "react";
import { useTranslations } from 'next-intl';

interface StatusListProps {
    status: string;
    date: string;
}

const StatusList: FC<StatusListProps> = ({ status, date }) => {
    const t = useTranslations('OrderTabs');

    return (
        <li style={{ marginBottom: "30px" }}>
            <h4>{t('orderStatus')}: {status}</h4>
            <p style={{ margin: "10px 0" }}>{date}</p>
        </li>
    );
};

export default StatusList;