"use client"

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Shop } from '@/interfaces/Shop';

const defaultShopImage = '/images/bgplaceholder.jpeg';

interface ShopCardCardProps {
    shop?: Shop;
    productImage?: string;
    productName?: string;
    productDescription?: string;
    productRating?: number;
    productPrice?: number | string;
}

const ShopCardCard: FC<ShopCardCardProps> = ({ shop, productImage, productName, productDescription, productPrice }) => {
    const t = useTranslations('ShopCard');
    const router = useRouter();

    const [favorite, setFavorite] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const resolvedName = shop?.name ?? productName ?? 'Shop';
    const resolvedDescription = shop?.description ?? productDescription ?? 'Fresh local products and groceries.';
    const resolvedImage = shop?.logoUrl ?? shop?.logo ?? productImage ?? defaultShopImage;
    const resolvedLocation = shop?.location?.city
        ? `${shop.location.city}${shop.location.county ? `, ${shop.location.county}` : ''}`
        : undefined;
    const resolvedPrice = typeof productPrice === 'number' || typeof productPrice === 'string'
        ? productPrice
        : (shop?.productCount ?? 0);
    const hasPriceLabel = typeof resolvedPrice === 'number' || typeof resolvedPrice === 'string';
    const shopHref = shop?.slug ? `/shops/${shop.slug}` : shop?._id ? `/shops/${shop._id}` : undefined;

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

                <CardActionArea onClick={() => shopHref && router.push(shopHref)}>
                    <CardMedia
                        component="img"
                        height="210"
                        image={resolvedImage}
                        alt={resolvedName}
                    />

                    <CardContent>
                        <Typography variant="h5" component="div">
                            {resolvedName}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', marginTop: '12px' }}
                        >
                            {resolvedDescription}
                        </Typography>

                        {resolvedLocation && (
                            <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '8px' }}>
                                {resolvedLocation}
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <div className={styles.cardActions}>
                        <Button size="small" color="primary" onClick={() => shopHref && router.push(shopHref)}>
                            {t('shopBtn')}
                        </Button>

                        <h3>{hasPriceLabel ? `${resolvedPrice} ${t('productCount', { count: Number(resolvedPrice) })}` : ''}</h3>
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
                message={`${resolvedName} ${t('removedMsg')}`}
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