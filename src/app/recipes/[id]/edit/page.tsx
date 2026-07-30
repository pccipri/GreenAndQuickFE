"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';

import RecipeUpsertForm from '../../_components/RecipeUpsertForm';
import { useAuth } from '@/contexts/AuthProvider';
import { getRecipeById } from '@/services/recipeService';

export default function EditRecipePage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const t = useTranslations('RecipeDetail');
    const { user, loading: authLoading } = useAuth();
    const [recipe, setRecipe] = useState<Awaited<ReturnType<typeof getRecipeById>>>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const recipeId = Array.isArray(params?.id) ? params.id[0] : params?.id;

    useEffect(() => {
        const loadRecipe = async () => {
            if (!recipeId) {
                setError('Invalid recipe ID');
                setLoading(false);
                return;
            }

            const result = await getRecipeById(recipeId);
            if (!result) {
                setError('Recipe not found');
                setLoading(false);
                return;
            }

            setRecipe(result);
            setLoading(false);
        };

        void loadRecipe();
    }, [recipeId]);

    useEffect(() => {
        if (authLoading || loading || !recipe || !user) {
            return;
        }

        const authorId = typeof recipe.authorId === 'string' ? recipe.authorId : recipe.authorId?._id;
        const canEdit = user.role === 'admin' || authorId === user.id;

        if (!user) {
            router.replace('/login');
            return;
        }

        if (!canEdit) {
            router.replace('/unauthorized');
        }
    }, [authLoading, loading, recipe, router, user]);

    if (loading || authLoading) {
        return (
            <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                <CircularProgress />
                <Typography color="text.secondary">{t('loading')}</Typography>
            </Box>
        );
    }

    if (error || !recipe) {
        return (
            <Paper variant="outlined" sx={{ p: 4, borderRadius: 4, maxWidth: 720, mx: 'auto', mt: 6 }}>
                <Stack spacing={2} alignItems="flex-start">
                    <Typography variant="h5">{error ?? 'Recipe not found'}</Typography>
                    <Typography color="text.secondary">You can return to the browse page and try another recipe.</Typography>
                    <Button component={Link} href="/recipes" variant="outlined">
                        {t('backToBrowse')}
                    </Button>
                </Stack>
            </Paper>
        );
    }

    return <RecipeUpsertForm mode="edit" initialRecipe={recipe} />;
}