"use client"

import { FC, useState } from "react";
import styles from './index.module.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

interface FeaturedSellerCardProps {
    sellerImage?: string;
    sellerName: string;
}

const FeaturedSellerCard: FC<FeaturedSellerCardProps> = ({ sellerImage, sellerName }) => {
    const [favorite, setFavorite] = useState(false);

    return (
        <Card sx={{ maxWidth: 345, margin: '20px' }}>
            {sellerImage && (
                <CardMedia
                    component="img"
                    height="180"
                    image={sellerImage}
                    alt={sellerName}
                />
            )}

            <CardContent>
                <div className={styles.cardContent}>
                    <Typography variant="h5" component="div">
                        {sellerName}
                    </Typography>

                    <IconButton onClick={() => setFavorite(!favorite)}>
                        {favorite ? (
                            <FavoriteIcon color="error" />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
};

export default FeaturedSellerCard;