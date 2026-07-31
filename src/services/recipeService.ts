import { marketAPI } from '../lib/api';
import { AxiosResponse } from 'axios';
import {
    DietaryTag,
    RecipeAuthorSummary,
    RecipeDetail,
    RecipeListFilters,
    RecipeListItem,
    RecipeListResponse,
} from '@/interfaces/Recipe';

const normalizeRecipeId = (recipe: Partial<RecipeDetail> & { id?: string; _id?: string }) => recipe.id ?? recipe._id ?? '';

const normalizeRecipeImage = (recipe: Partial<RecipeDetail> & { imageUrl?: string | null; imagePath?: string | null }) => recipe.imageUrl ?? recipe.imagePath ?? null;

const normalizeInstructions = (instructions: unknown): RecipeDetail['instructions'] => {
    if (!Array.isArray(instructions)) {
        return [];
    }

    return instructions.map((instruction, index) => {
        const current = instruction as Partial<RecipeDetail['instructions'][number]> & { imageUrl?: string | null; imagePath?: string | null };

        return {
            stepNumber: current.stepNumber ?? index + 1,
            description: current.description ?? '',
            imagePath: current.imageUrl ?? current.imagePath ?? null,
            imageUrl: current.imageUrl ?? current.imagePath ?? null,
        };
    });
};

const normalizeRecipeDetail = (payload: unknown): RecipeDetail | null => {
    if (!payload) {
        return null;
    }

    if (typeof payload === 'object' && payload !== null) {
        const response = payload as Partial<RecipeDetail> & {
            data?: RecipeDetail;
            recipe?: RecipeDetail;
            item?: RecipeDetail;
        };

        const recipe = response.data ?? response.recipe ?? response.item ?? (payload as RecipeDetail);

        if (!recipe) {
            return null;
        }

        const normalizedRecipe = recipe as Partial<RecipeDetail> & {
            author?: string | RecipeAuthorSummary;
            tags?: string[];
        };

        return {
            ...(normalizedRecipe as RecipeDetail),
            _id: normalizeRecipeId(normalizedRecipe as Partial<RecipeDetail> & { id?: string; _id?: string }),
            id: normalizeRecipeId(normalizedRecipe as Partial<RecipeDetail> & { id?: string; _id?: string }),
            imagePath: normalizeRecipeImage(normalizedRecipe as Partial<RecipeDetail> & { imageUrl?: string | null; imagePath?: string | null }),
            imageUrl: normalizeRecipeImage(normalizedRecipe as Partial<RecipeDetail> & { imageUrl?: string | null; imagePath?: string | null }),
            authorId: normalizedRecipe.authorId ?? normalizedRecipe.author,
            dietaryTags: normalizedRecipe.dietaryTags ?? normalizedRecipe.tags ?? [],
            instructions: normalizeInstructions((normalizedRecipe as Partial<RecipeDetail>).instructions),
            nutritionPerPortion: normalizedRecipe.nutritionPerPortion ?? null,
            nutritionValues: normalizedRecipe.nutritionValues ?? null,
        } as RecipeDetail;
    }

    return null;
};

const normalizeRecipeListResponse = (
    payload: unknown,
    filters: RecipeListFilters,
): RecipeListResponse => {
    if (Array.isArray(payload)) {
        const limit = filters.limit ?? payload.length;
        const page = filters.page ?? 1;

        return {
            items: payload as RecipeListItem[],
            total: payload.length,
            page,
            limit,
        };
    }

    const response = (payload ?? {}) as Partial<RecipeListResponse> & {
        data?: RecipeListItem[];
        recipes?: RecipeListItem[];
        items?: RecipeListItem[];
        total?: number;
        count?: number;
        page?: number;
        limit?: number;
        pages?: number;
    };

    const items = response.items ?? response.recipes ?? response.data ?? [];
    const total = response.total ?? response.count ?? items.length;
    const page = response.page ?? filters.page ?? 1;
    const limit = response.limit ?? filters.limit ?? items.length;
    const pages = response.pages;

    return {
        items,
        total,
        page,
        limit,
        ...(pages !== undefined ? { pages } : {}),
    };
};

export const getRecipes = async (
    filters: RecipeListFilters = {},
): Promise<RecipeListResponse> => {
    try {
        const response: AxiosResponse<unknown> = await marketAPI({
            url: '/api/recipes',
            method: 'get',
            params: {
                q: filters.q ?? filters.search ?? undefined,
                mealType: filters.mealType || undefined,
                difficulty: filters.difficulty || undefined,
                dietaryTag: filters.dietaryTag || filters.dietaryTags?.[0] || undefined,
                dietaryTags: filters.dietaryTags?.length ? filters.dietaryTags.join(',') : undefined,
                authorId: filters.authorId || undefined,
                isPublished: filters.isPublished ?? undefined,
                minRating: filters.minRating ?? undefined,
                maxDuration: filters.maxDuration ?? undefined,
                sort: (filters.sort === 'newest' || filters.sort === 'popular' ? 'new' : filters.sort) || undefined,
                page: filters.page || undefined,
                limit: filters.limit || undefined,
            },
        });

        return normalizeRecipeListResponse(response.data, filters);
    } catch (error) {
        console.error('Error:', error);

        return {
            items: [],
            total: 0,
            page: filters.page ?? 1,
            limit: filters.limit ?? 12,
        };
    }
};

export const getRecipeById = async (id: string): Promise<RecipeDetail | null> => {
    try {
        const response: AxiosResponse<unknown> = await marketAPI({
            url: `/api/recipes/${id}`,
            method: 'get',
        });

        return normalizeRecipeDetail(response.data);
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const getDietaryTags = async (): Promise<DietaryTag[]> => {
    try {
        const response: AxiosResponse<DietaryTag[]> = await marketAPI({
            url: '/api/dietary-tags',
            method: 'get',
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const createRecipe = async (formData: FormData): Promise<RecipeDetail> => {
    try {
        const response: AxiosResponse<unknown> = await marketAPI({
            url: '/api/recipes',
            method: 'post',
            data: formData,
        });

        return normalizeRecipeDetail(response.data) ?? ({} as RecipeDetail);
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.error || 'Something went wrong');
    }
};

export const updateRecipe = async (id: string, formData: FormData): Promise<RecipeDetail> => {
    try {
        const response: AxiosResponse<unknown> = await marketAPI({
            url: `/api/recipes/${id}`,
            method: 'patch',
            data: formData,
        });

        return normalizeRecipeDetail(response.data) ?? ({} as RecipeDetail);
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.error || 'Something went wrong');
    }
};

export const shopRecipeIngredients = async (id: string, ingredients: string[]): Promise<void> => {
    try {
        await marketAPI({
            url: `/api/recipes/${id}/shop`,
            method: 'post',
            data: { ingredients },
        });
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.error || 'Something went wrong');
    }
};

export const deleteRecipe = async (id: string): Promise<void> => {
    try {
        await marketAPI({
            url: `/api/recipes/${id}`,
            method: 'delete',
        });
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(error.response?.data?.error || 'Something went wrong');
    }
};