"use client";

import { FC } from "react";
import { useTranslations } from 'next-intl';
import styles from "./index.module.css";

interface StatusListProps {
    status: string;
    date: string;
}

const StatusList: FC<StatusListProps> = ({ status, date }) => {
    const t = useTranslations('OrderTabs');

    return (
        <li className={styles.listSpacing}>
            <h4>{t('orderStatus')}: {status}</h4>
            <p className={styles.paragraphSpacing}>{date}</p>
        </li>
    );
};

export default StatusList;