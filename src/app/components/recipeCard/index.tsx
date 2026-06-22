"use client";

import { FC, useState } from "react";
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

interface RecipeCardProps {
    recipeImage?: string;
    recipeName: string;
    recipeCategory: string;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipeImage, recipeName, recipeCategory }) => {
    const t = useTranslations('RecipeCard');

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
            <Card sx={{ position: 'relative', maxWidth: 345 }}>
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
                    {recipeImage && (
                        <CardMedia
                            component="img"
                            height="140"
                            image={recipeImage}
                            alt={recipeName}
                        />
                    )}

                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {recipeName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {recipeCategory}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button size="small" sx={{ margin: '0 auto' }}>
                        {t('tryOutBtn')}
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
                message={`${recipeName} ${t('removedMsg')}`}
                action={
                    <Button color="secondary" size="small" onClick={handleUndo}>
                        {t('undoBtn')}
                    </Button>
                }
            />
        </>
    );
};

export default RecipeCard;