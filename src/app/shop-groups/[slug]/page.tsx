"use client";

import { FC } from "react";
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import SellerCard from "../../components/sellerCard";

const ShopGroup: FC = () => {
    const t = useTranslations('ShopGroup');

    return (
        <div className={styles.container}>
            <Card sx={{ maxWidth: 345, mb: 5 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Group A
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', mt: 2 }}>
                        Str. X, Baia Mare, Romania
                    </Typography>
                </CardContent>
            </Card>

            <h3>{t('Members in this group:')}</h3>

            <div className={styles.sellersCards}>
                <div className={styles.cardsParentContainer}>
                    <div className={styles.cardsChildContainer}>
                        <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                        <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                        <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ShopGroup;