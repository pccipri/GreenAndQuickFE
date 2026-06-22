"use client"

import { FC, useState } from "react";
import { useTranslations } from 'next-intl';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface SellerCardProps {
    sellerImage?: string;
    sellerName: string;
    sellerDescription: string;
    sellerRating: number;
}

const SellerCard: FC<SellerCardProps> = ({
    sellerImage,
    sellerName,
    sellerDescription,
    sellerRating,
}) => {
    const t = useTranslations('SellerCard');

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
            <Card sx={{ maxWidth: 345, margin: '20px', position: 'relative' }}>
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

                            <Rating
                                name="half-rating-read"
                                precision={0.5}
                                value={sellerRating}
                                size="small"
                                readOnly
                            />
                        </div>

                        <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '20px' }}>
                            {sellerDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button size="small" color="primary">
                        {t('shopBtn')}
                    </Button>
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
                message={`${sellerName} ${t('removedMsg')}`}
                action={
                    <Button color="secondary" size="small" onClick={handleUndo}>
                        {t('undoBtn')}
                    </Button>
                }
            />
        </>
    );
};

export default SellerCard;