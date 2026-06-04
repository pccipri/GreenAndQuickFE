"use client"

import { FC } from "react";
import { useRouter } from 'next/navigation';

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import Button from "@mui/material/Button";

import CreditCard from "@/app/components/card";

const PaymentMethods: FC = () => {
    const t = useTranslations('PaymentMethods');
    const router = useRouter();

    return (
        <>
            <div className={styles.paymentMethodsContainer}>
                <h2 className={styles.title}>{t('activeMethods')}</h2>
                <div className={styles.cardContainer}>
                    <CreditCard
                        type="VISA"
                        number="9656 6598 1236 4698"
                        name="John Doe"
                        expiry="6/25"
                        cvc="562"
                    />

                    <CreditCard
                        type="MasterCard"
                        number="4965 9845 2215 9874"
                        name="John Doe"
                        expiry="12/26"
                        cvc="987"
                    />

                    <CreditCard
                        type="PayPal"
                        number="2565 1428 5851 5864"
                        name="John Doe"
                        expiry="3/27"
                        cvc="345"
                    />
                </div>

                <h2 className={styles.title}>{t('addNewMethod')}</h2>
                <Button variant="outlined" type="button" onClick={() => router.push('/addCard')}>
                    {t('addCard')}
                </Button>
            </div>
        </>
    );
};

export default PaymentMethods;