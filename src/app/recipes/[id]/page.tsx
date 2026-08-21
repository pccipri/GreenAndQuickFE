"use client";

import { FC, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PrintIcon from '@mui/icons-material/Print';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslations } from 'next-intl';

import IngredientsList from '@/app/components/ingredientsList';
import InstructionsList from '@/app/components/instructionsList';
import { useAuth } from '@/contexts/AuthProvider';
import { RecipeAuthorSummary, RecipeDetail, RecipeIngredient, RecipeInstruction } from '@/interfaces/Recipe';
import { deleteRecipe, getRecipeById, shopRecipeIngredients } from '@/services/recipeService';
import { addCartItem } from '@/services/cartService';
import { notify } from '@/utils/toast';

const formatAuthorName = (author: RecipeAuthorSummary | string | undefined) => {
    if (!author || typeof author === 'string') {
        return null;
    }

    return [author.firstName, author.lastName].filter(Boolean).join(' ') || null;
};

const getIngredientText = (ingredient: RecipeIngredient) => {
    const quantity = Number.isInteger(ingredient.value) ? ingredient.value : ingredient.value.toFixed(2);
    return `${quantity} ${ingredient.unit} ${ingredient.label}`.trim();
};

const getInstructionImage = (instruction: RecipeInstruction) => (instruction.imageUrl ?? instruction.imagePath) || undefined;

const RecipeDetails: FC = () => {
    const t = useTranslations('RecipeDetail');
    const params = useParams<{ id: string }>();

    const getDietaryTagLabel = (tagKey: string) => {
        const translated = t(`dietaryTagLabels.${tagKey}` as string);
        return translated === `dietaryTagLabels.${tagKey}` ? tagKey : translated;
    };
    const router = useRouter();
    const { user } = useAuth();
    const recipeId = Array.isArray(params?.id) ? params.id[0] : params?.id;

    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const loadRecipe = async () => {
            if (!recipeId) {
                setError(t('invalidRecipeId'));
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            const result = await getRecipeById(recipeId);
            if (!result) {
                setError(t('notFound'));
                setRecipe(null);
                setLoading(false);
                return;
            }

            setRecipe(result);
            setLoading(false);
        };

        void loadRecipe();
    }, [recipeId, t]);

    useEffect(() => {
        if (!recipeId || typeof window === 'undefined') {
            return;
        }

        const savedRecipes = window.localStorage.getItem('green_quick_saved_recipes');
        if (!savedRecipes) {
            setIsSaved(false);
            return;
        }

        try {
            const parsed = JSON.parse(savedRecipes) as string[];
            setIsSaved(Array.isArray(parsed) && parsed.includes(recipeId));
        } catch {
            setIsSaved(false);
        }
    }, [recipeId]);

    const authorName = useMemo(() => formatAuthorName(recipe?.authorId), [recipe]);
    const canEditRecipe = Boolean(user && recipe && (user.role === 'admin' || (typeof recipe.authorId === 'string' ? recipe.authorId : recipe.authorId?._id) === user.id));
    const canDeleteRecipe = canEditRecipe;

    const handleAddAllToCart = async () => {
        if (!recipe || typeof window === 'undefined') {
            return;
        }

        const ingredients = recipe.ingredients ?? [];
        if (ingredients.length === 0) {
            notify(t('addToCartEmpty'), 'warning');
            return;
        }

        try {
            const ingredientNames = ingredients.map((ingredient) => ingredient.label || t('ingredientFallback'));
            await shopRecipeIngredients(recipe.id ?? recipe._id ?? '', ingredientNames);

            for (const ingredient of ingredients) {
                const ingredientId = ingredient.linkedProductId ?? ingredient.label;
                if (!ingredientId) {
                    continue;
                }
                await addCartItem(String(ingredientId), 1);
            }

            notify(t('addToCartSuccess'), 'success');
        } catch {
            notify(t('addToCartFailed'), 'warning');
        }
    };

    const handleSaveToggle = () => {
        if (typeof window === 'undefined' || !recipeId) {
            return;
        }

        const savedRecipes = window.localStorage.getItem('green_quick_saved_recipes');
        const parsed = savedRecipes ? (JSON.parse(savedRecipes) as string[]) : [];
        const nextSaved = isSaved
            ? parsed.filter((item) => item !== recipeId)
            : [...parsed, recipeId];

        window.localStorage.setItem('green_quick_saved_recipes', JSON.stringify(nextSaved));
        setIsSaved(!isSaved);
        notify(isSaved ? t('saveRemoved') : t('saveSuccess'), 'success');
    };

    const handleDelete = async () => {
        if (!recipe || !recipeId) {
            return;
        }

        const confirmed = window.confirm(t('deleteConfirm'));
        if (!confirmed) {
            return;
        }

        try {
            await deleteRecipe(recipeId);
            notify(t('deleteSuccess'), 'success');
            router.push('/recipes');
        } catch {
            notify(t('deleteFailed'), 'error');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <Box className={styles.stateBox}>
                <CircularProgress />
                <Typography color="text.secondary">{t('loading')}</Typography>
            </Box>
        );
    }

    if (error || !recipe) {
        return (
            <Box className={styles.stateBox}>
                <Typography variant="h5">{t('errorTitle')}</Typography>
                <Typography color="text.secondary">{error ?? t('notFound')}</Typography>
                <Button component={Link} href="/recipes" variant="outlined" startIcon={<ArrowBackIosIcon />}>
                    {t('backToBrowse')}
                </Button>
            </Box>
        );
    }

    return (
        <Box className={styles.pageShell}>
            <Box className={styles.topBar}>
                <Button component={Link} href="/recipes" variant="outlined" startIcon={<ArrowBackIosIcon />}>
                    {t('back')}
                </Button>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={handleAddAllToCart}>
                        {t('addAllToCart')}
                    </Button>
                    <Button variant="outlined" startIcon={<FavoriteBorderIcon />} onClick={handleSaveToggle} color={isSaved ? 'secondary' : 'inherit'}>
                        {isSaved ? t('saved') : t('save')}
                    </Button>
                    <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
                        {t('print')}
                    </Button>
                    {canEditRecipe && (
                        <Button component={Link} href={`/recipes/${recipeId}/edit`} variant="outlined">
                            {t('editRecipe')}
                        </Button>
                    )}
                    {canDeleteRecipe && (
                        <Button variant="outlined" color="error" onClick={handleDelete}>
                            {t('deleteRecipe')}
                        </Button>
                    )}
                </Stack>
            </Box>

            <Box className={styles.heroCard}>
                <Box className={styles.imageWrap}>
                    {(recipe.imageUrl ?? recipe.imagePath) ? (
                        <img src={recipe.imageUrl ?? recipe.imagePath ?? ''} alt={recipe.title} className={styles.coverImage} />
                    ) : (
                        <Box className={styles.coverPlaceholder}>
                            <ImageIcon fontSize="large" />
                        </Box>
                    )}
                </Box>

                <Box className={styles.heroCopy}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="overline" className={styles.kicker}>
                                {recipe.mealType}
                            </Typography>
                            <Typography variant="h3" component="h1">
                                {recipe.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                {recipe.shortDescription}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            <Chip label={recipe.mealType} />
                            {recipe.difficulty && <Chip label={recipe.difficulty} />}
                            <Chip label={`${recipe.duration} ${recipe.durationType.toLowerCase()}`} />
                            <Chip label={`${recipe.servings} ${t('servings')}`} />
                            {recipe.dietaryTags?.map((tag) => (
                                <Chip key={tag} label={getDietaryTagLabel(tag)} variant="outlined" />
                            ))}
                        </Stack>

                        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap" className={styles.metaRow}>
                            <span className={styles.metaItem}>
                                <PersonIcon fontSize="small" />
                                {authorName ?? t('unknownAuthor')}
                            </span>
                            <span className={styles.metaItem}>
                                <GroupsIcon fontSize="small" />
                                {recipe.servings}
                            </span>
                            <span className={styles.metaItem}>
                                <AccessTimeIcon fontSize="small" />
                                {recipe.duration} {recipe.durationType.toLowerCase()}
                            </span>
                        </Stack>
                    </Stack>
                </Box>
            </Box>

            <Box className={styles.contentGrid}>
                <Box className={styles.sectionCard}>
                    <Typography variant="h5" component="h2" className={styles.sectionTitle}>
                        {t('ingredients')}
                    </Typography>
                    <ul className={styles.list}>
                        {recipe.ingredients.map((ingredient) => (
                            <IngredientsList key={`${ingredient.label}-${ingredient.value}-${ingredient.unit}`} ingredient={getIngredientText(ingredient)} />
                        ))}
                    </ul>
                </Box>

                <Box className={styles.sectionCard}>
                    <Typography variant="h5" component="h2" className={styles.sectionTitle}>
                        {t('instructions')}
                    </Typography>
                    <ol className={styles.list}>
                        {recipe.instructions
                            .slice()
                            .sort((left, right) => left.stepNumber - right.stepNumber)
                            .map((instruction) => (
                                <InstructionsList
                                    key={instruction.stepNumber}
                                    instruction={`${instruction.stepNumber}. ${instruction.description}`}
                                    imageSrc={getInstructionImage(instruction)}
                                    imageAlt={`${recipe.title} step ${instruction.stepNumber}`}
                                />
                            ))}
                    </ol>
                </Box>
            </Box>

            {(recipe.nutritionPerPortion || recipe.nutritionValues) && (
                <Box className={styles.sectionCard}>
                    <Typography variant="h5" component="h2" className={styles.sectionTitle}>
                        {t('nutrition')}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {recipe.nutritionPerPortion && (
                        <Box className={styles.nutritionGrid}>
                            {Object.entries(recipe.nutritionPerPortion).map(([key, value]) => (
                                <Box key={key} className={styles.nutritionItem}>
                                    <Typography variant="body2" color="text.secondary">
                                        {key}
                                    </Typography>
                                    <Typography variant="h6">{value}</Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                    {recipe.nutritionValues && (
                        <Box className={styles.nutritionGrid} sx={{ mt: 2 }}>
                            {recipe.nutritionValues.map((item) => (
                                <Box key={`${item.label}-${item.unit}`} className={styles.nutritionItem}>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.label}
                                    </Typography>
                                    <Typography variant="h6">
                                        {item.value} {item.unit}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default RecipeDetails;