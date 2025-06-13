"use client"

import { FC } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';

interface SellerCardProps {
    sellerImage?: string;
    sellerName: string;
    sellerDescription: string;
    sellerRating: number;
}

const SellerCard: FC<SellerCardProps> = ({ sellerImage, sellerName, sellerDescription, sellerRating }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '20px' }}>
            <CardActionArea>
                {sellerImage && (
                    <CardMedia
                        component="img"
                        height="210"
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
                    <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '20px' }}>
                        {sellerDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Shop
                </Button>
            </CardActions>
        </Card>
    );
};

export default SellerCard;