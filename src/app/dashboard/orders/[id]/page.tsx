"use client"

import { FC } from "react";

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import TabPanel from "@/app/components/tabPanel";

const OrderDetails: FC = () => {
    const t = useTranslations('OrderDetails');

    const primaryTextStyles = {
        color: 'text.primary',
        marginTop: 2,
    };

    const secondaryTextStyles = {
        color: 'text.secondary',
    };

    return (
        <>
            <div className={styles.orderDetailsContainer} style={{ padding: 20 }}>
                <Card sx={{ width: 700 }}>
                    <CardMedia
                        sx={{ height: 200, width: 200, margin: 2 }}
                        image="./images/bgplaceholder.jpeg"
                        title={t('imageTitle')}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {t('orderId')}: 1
                        </Typography>
                        <div className={styles.productsContainer}>
                            <div className={styles.leftAligned}>
                                <Typography variant="body2" sx={primaryTextStyles}>
                                    {t('products')}
                                </Typography>
                                <Typography variant="body2" sx={secondaryTextStyles}>
                                    {t('sampleProduct')}
                                </Typography>

                                <Typography variant="body2" sx={primaryTextStyles}>
                                    {t('quantity')}
                                </Typography>
                                <Typography variant="body2" sx={secondaryTextStyles}>
                                    2
                                </Typography>
                            </div>
                            <div className={styles.rightAligned}>
                                <Typography variant="body2" sx={primaryTextStyles}>
                                    {t('price')}
                                </Typography>
                                <Typography variant="body2" sx={secondaryTextStyles}>
                                    6 RON
                                </Typography>

                                <Typography variant="body2" sx={primaryTextStyles}>
                                    {t('shop')}
                                </Typography>
                                <Typography variant="body2" sx={secondaryTextStyles}>
                                    {t('sampleShop')}
                                </Typography>
                            </div>
                        </div>
                        <Typography variant="body1" sx={primaryTextStyles}>
                            {t('totalPrice')}
                        </Typography>
                        <Typography variant="body1" sx={secondaryTextStyles}>
                            10 RON
                        </Typography>
                    </CardContent>

                    <TabPanel />
                </Card>
            </div >
        </>
    );
};

export default OrderDetails;