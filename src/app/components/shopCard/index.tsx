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

interface ShopCardProps {
    productImage?: string;
    productName: string;
    productDescription: string;
    productRating: number;
    productPrice: number;
}

const ShopCard: FC<ShopCardProps> = ({ productImage, productName, productDescription, productRating, productPrice }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '20px' }}>
            <CardActionArea>
                {productImage && (
                    <CardMedia
                        component="img"
                        height="210"
                        image={productImage}
                        alt={productName}
                    />
                )}
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" component="div">
                            {productName}
                        </Typography>
                        <Rating name="half-rating-read" precision={0.5} value={productRating} size="small" readOnly />
                    </div>
                    <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '20px' }}>
                        {productDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 2%' }}>
                    <Button size="small" color="primary">
                        Add To Cart
                    </Button>
                    <h3>{productPrice} RON</h3>
                </div>
            </CardActions>
        </Card>
    );
};

export default ShopCard;