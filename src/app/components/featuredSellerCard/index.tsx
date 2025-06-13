"use client"

import { FC } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Rating from '@mui/material/Rating';

interface FeaturedSellerCardProps {
    sellerImage?: string;
    sellerName: string;
    sellerRating: number;
}

const FeaturedSellerCard: FC<FeaturedSellerCardProps> = ({ sellerImage, sellerName, sellerRating }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '20px' }}>
            <CardActionArea>
                {sellerImage && (
                    <CardMedia
                        component="img"
                        height="180"
                        image={sellerImage}
                        alt={sellerName}
                    />
                )}
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" component="div">
                            {sellerName}
                        </Typography>
                        <Rating name="half-rating-read" precision={0.5} value={sellerRating} size="small" readOnly />
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default FeaturedSellerCard;