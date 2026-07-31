"use client";

import { FC, MouseEvent, useState } from "react";
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Snackbar from '@mui/material/Snackbar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

import { RecipeListItem } from '@/interfaces/Recipe';

interface RecipeCardProps {
    recipe: RecipeListItem;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
    const t = useTranslations('RecipeCard');

    const [favorite, setFavorite] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
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
            <Card sx={{ position: 'relative', height: '100%' }}>
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

                <CardActionArea component={Link} href={`/recipes/${recipe.id ?? recipe._id ?? ''}`} sx={{ alignItems: 'stretch', height: '100%' }}>
                    {(recipe.imageUrl ?? recipe.imagePath) ? (
                        <CardMedia
                            component="img"
                            height="140"
                            image={recipe.imageUrl ?? recipe.imagePath ?? ''}
                            alt={recipe.title}
                        />
                    ) : (
                        <CardMedia
                            component="div"
                            sx={{ height: 140, backgroundColor: 'grey.200' }}
                        />
                    )}

                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {recipe.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {recipe.shortDescription}
                        </Typography>

                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
                            <Chip size="small" label={recipe.mealType} />
                            {recipe.difficulty && <Chip size="small" label={recipe.difficulty} />}
                            <Chip size="small" label={`${recipe.duration} ${recipe.durationType.toLowerCase()}`} />
                        </Stack>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button size="small" component={Link} href={`/recipes/${recipe.id ?? recipe._id ?? ''}`} sx={{ margin: '0 auto' }}>
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
                message={`${recipe.title} ${t('removedMsg')}`}
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