"use client";

import { FC } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';


interface RecipeCardProps {
    productImage?: string;
    productName: string;
    productCategory: string;
}

const RecipeCard: FC<RecipeCardProps> = ({ productImage, productName, productCategory }) => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={productImage}
                    alt={productName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {productCategory}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" sx={{ margin: '0 auto' }}>
                    Try Out
                </Button>
            </CardActions>
        </Card>
    );
};

export default RecipeCard;