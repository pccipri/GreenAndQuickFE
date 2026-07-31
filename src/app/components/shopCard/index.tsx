"use client"

import { FC, useState } from "react";
import styles from './index.module.css';
import { useTranslations } from 'next-intl';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Snackbar from '@mui/material/Snackbar';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

interface ShopCardCardProps {
    productImage?: string;
    productName: string;
    productDescription: string;
    productRating?: number;
    productPrice: number;
}

const ShopCardCard: FC<ShopCardCardProps> = ({ productImage, productName, productDescription, productPrice }) => {
    const t = useTranslations('ShopCard');
    
    const [favorite, setFavorite] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (favorite) {
            setFavorite(false);
            setOpenSnackbar(true);
        } else {
            setFavorite(true);
        }
    };

    const handleUndo = () => {
        setFavorite(true);
        setOpenSnackbar(false);
    };

    return (
        <>
            <Card
                sx={{
                    maxWidth: 345,
                    margin: '20px',
                    position: 'relative',
                }}
            >
                <IconButton
                    onClick={handleFavoriteClick}
                    sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        zIndex: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    {favorite ? (
                        <FavoriteIcon color="error" />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>

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
                        <Typography variant="h5" component="div">
                            {productName}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', marginTop: '20px' }}
                        >
                            {productDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <div className={styles.cardActions}>
                        <Button size="small" color="primary">
                            {t('shopBtn')}
                        </Button>

                        <h3>{productPrice} RON</h3>
                    </div>
                </CardActions>
            </Card>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                message={`${productName} ${t('removedMsg')}`}
                action={
                    <Button color="secondary" size="small" onClick={handleUndo}>
                        {t('undoBtn')}
                    </Button>
                }
            />
        </>
    );
};

export default ShopCardCard;