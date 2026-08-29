export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'DESSERT';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type DurationType = 'MINUTES' | 'HOURS';
export type RecipeSortOption = 'new' | 'rating' | 'duration' | 'newest' | 'popular';

export interface DietaryTag {
    _id?: string;
    key: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RecipeIngredient {
    name: string;
    quantity: number;
    unit: string;
    linkedProductId?: string | null;
    linkedProductName?: string | null;
}

export interface RecipeInstruction {
    stepNumber: number;
    description: string;
    imagePath?: string | null;
    imageUrl?: string | null;
}

export interface RecipeAuthorSummary {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    avatarPath: string | null;
}

export interface RecipeListItem {
    _id?: string;
    id?: string;
    title: string;
    slug: string;
    shortDescription: string;
    imagePath?: string | null;
    imageUrl?: string | null;
    mealType: MealType;
    difficulty: Difficulty | null;
    duration: number;
    durationType: DurationType;
    rating: number;
    reviewCount: number;
    dietaryTags: string[] | null;
    authorId?: string | RecipeAuthorSummary;
    createdAt: string;
}

export interface RecipeDetail extends RecipeListItem {
    ingredients: RecipeIngredient[];
    instructions: RecipeInstruction[];
    servings: number;
    nutritionPerPortion: Record<string, number> | null;
    nutritionValues: Array<{ label: string; value: number; unit: string }> | null;
    isPublished: boolean;
    updatedAt: string;
}

export interface RecipeListFilters {
    q?: string;
    search?: string;
    mealType?: MealType | '';
    difficulty?: Difficulty | '';
    dietaryTags?: string[];
    dietaryTag?: string;
    authorId?: string;
    isPublished?: boolean;
    minRating?: number;
    maxDuration?: number;
    sort?: RecipeSortOption;
    page?: number;
    limit?: number;
}

export interface RecipeListResponse {
    items: RecipeListItem[];
    total: number;
    page: number;
    limit: number;
}