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
    return (
        <>
            <div className={styles.orderDetailsContainer} style={{ padding: 20 }}>
                <Card sx={{ width: 700 }}>
                    <CardMedia
                        sx={{ height: 200, width: 200, margin: 2 }}
                        image="./images/bgplaceholder.jpeg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {t('orderId')}: 1
                        </Typography>
                        <div className={styles.productsContainer}>
                            <div className={styles.leftAligned}>
                                <Typography variant="body2" sx={{ color: 'text.primary', marginTop: 2 }}>
                                    {t('products')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Apples - 1kg
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.primary', marginTop: 2 }}>
                                    {t('quantity')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    2
                                </Typography>
                            </div>
                            <div className={styles.rightAligned}>
                                <Typography variant="body2" sx={{ color: 'text.primary', marginTop: 2 }}>
                                    {t('price')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    6 RON
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.primary', marginTop: 2 }}>
                                    {t('shop')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Marcel's Green Market
                                </Typography>
                            </div>
                        </div>
                        <Typography variant="body1" sx={{ color: 'text.primary', marginTop: 2 }}>
                            {t('totalPrice')}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
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