"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box, CircularProgress, Typography } from '@mui/material';

import RecipeUpsertForm from '../_components/RecipeUpsertForm';
import { useAuth } from '@/contexts/AuthProvider';

export default function AddRecipePage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, router, user]);

    if (loading) {
        return (
            <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                <CircularProgress />
                <Typography color="text.secondary">Checking access...</Typography>
            </Box>
        );
    }

    if (!user) {
        return null;
    }

    return <RecipeUpsertForm mode="create" />;
}