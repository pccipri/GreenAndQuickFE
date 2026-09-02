"use client";

import { type FC, type SubmitEvent, useEffect, useMemo, useState } from 'react';
import RecipeCard from '@/app/components/recipeCard';
import {
    Box,
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';

import { DietaryTag, Difficulty, MealType, RecipeListItem, RecipeSortOption } from '@/interfaces/Recipe';
import { getDietaryTags, getRecipes } from '@/services/recipeService';

import styles from './page.module.css';

const pageSize = 8;

const mealTypes: MealType[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'DESSERT'];
const difficultyLevels: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];
const sortOptions: RecipeSortOption[] = ['newest', 'popular', 'rating'];

const RecipesPage: FC = () => {
    const t = useTranslations('RecipesBrowse');

    const getDietaryTagLabel = (tagKey: string) => {
        const translated = t(`dietaryTagLabels.${tagKey}` as string);
        return translated === `dietaryTagLabels.${tagKey}` ? tagKey : translated;
    };
    const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
    const [dietaryTags, setDietaryTags] = useState<DietaryTag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [mealType, setMealType] = useState<MealType | ''>('');
    const [difficulty, setDifficulty] = useState<Difficulty | ''>('');
    const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
    const [maxDuration, setMaxDuration] = useState<number | ''>('');
    const [sort, setSort] = useState<RecipeSortOption>('newest');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const loadDietaryTags = async () => {
            const tags = await getDietaryTags();
            setDietaryTags(tags);
        };

        void loadDietaryTags();
    }, []);

    useEffect(() => {
        const loadRecipes = async () => {
            setLoading(true);
            setError(null);

            const response = await getRecipes({
                search: searchTerm || undefined,
                mealType,
                difficulty,
                dietaryTags: selectedDietaryTags,
                maxDuration: maxDuration || undefined,
                sort,
                page,
                limit: pageSize,
            });

            setRecipes(response.items);
            setTotal(response.total);
            setLoading(false);
        };

        void loadRecipes();
    }, [difficulty, mealType, maxDuration, page, searchTerm, selectedDietaryTags, sort]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total]);

    const handleSearchSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPage(1);
        setSearchTerm(searchInput.trim());
    };

    const handleDietaryTagsChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setSelectedDietaryTags(typeof value === 'string' ? value.split(',') : value);
        setPage(1);
    };

    const handleResetFilters = () => {
        setSearchInput('');
        setSearchTerm('');
        setMealType('');
        setDifficulty('');
        setSelectedDietaryTags([]);
        setMaxDuration('');
        setSort('newest');
        setPage(1);
    };

    return (
        <Box className={styles.pageShell}>
            <Box className={styles.heroSection}>
                <Stack spacing={1}>
                    <Typography variant="overline" className={styles.kicker}>
                        {t('kicker')}
                    </Typography>
                    <Typography variant="h3" component="h1">
                        {t('title')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {t('subtitle')}
                    </Typography>
                </Stack>

                <Box component="form" className={styles.searchBar} onSubmit={handleSearchSubmit}>
                    <TextField
                        fullWidth
                        label={t('search')}
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        placeholder={t('searchPlaceholder')}
                    />
                    <Button type="submit" variant="contained">
                        {t('searchAction')}
                    </Button>
                </Box>
            </Box>

            <Box className={styles.toolbar}>
                <FormControl fullWidth>
                    <InputLabel id="meal-type-label">{t('mealType')}</InputLabel>
                    <Select
                        labelId="meal-type-label"
                        value={mealType}
                        input={<OutlinedInput label={t('mealType')} />}
                        onChange={(event) => {
                            setMealType(event.target.value as MealType | '');
                            setPage(1);
                        }}
                    >
                        <MenuItem value="">{t('allMealTypes')}</MenuItem>
                        {mealTypes.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="difficulty-label">{t('difficulty')}</InputLabel>
                    <Select
                        labelId="difficulty-label"
                        value={difficulty}
                        input={<OutlinedInput label={t('difficulty')} />}
                        onChange={(event) => {
                            setDifficulty(event.target.value as Difficulty | '');
                            setPage(1);
                        }}
                    >
                        <MenuItem value="">{t('allDifficulties')}</MenuItem>
                        {difficultyLevels.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="dietary-tags-label">{t('dietaryTags')}</InputLabel>
                    <Select
                        labelId="dietary-tags-label"
                        multiple
                        value={selectedDietaryTags}
                        input={<OutlinedInput label={t('dietaryTags')} />}
                        onChange={handleDietaryTagsChange}
                        renderValue={(selected) => (
                            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                {(selected as string[]).map((key) => (
                                    <Chip key={key} label={getDietaryTagLabel(key)} size="small" />
                                ))}
                            </Stack>
                        )}
                    >
                        {dietaryTags.map((tag) => (
                            <MenuItem key={tag.key} value={tag.key}>
                                <Checkbox checked={selectedDietaryTags.includes(tag.key)} />
                                {getDietaryTagLabel(tag.key)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    type="number"
                    label={t('maxDuration')}
                    value={maxDuration}
                    onChange={(event) => {
                        const value = event.target.value;

                        setMaxDuration(value === '' ? '' : Number(value));
                        setPage(1);
                    }}
                    slotProps={{
                        htmlInput: {
                            min: 1,
                        },
                    }}
                />

                <FormControl fullWidth>
                    <InputLabel id="sort-label">{t('sort')}</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sort}
                        input={<OutlinedInput label={t('sort')} />}
                        onChange={(event) => {
                            setSort(event.target.value as RecipeSortOption);
                            setPage(1);
                        }}
                    >
                        {sortOptions.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="outlined" onClick={handleResetFilters}>
                    {t('clearFilters')}
                </Button>
            </Box>

            {loading ? (
                <Box className={styles.stateBox}>
                    <CircularProgress />
                    <Typography color="text.secondary">{t('loading')}</Typography>
                </Box>
            ) : error ? (
                <Box className={styles.stateBox}>
                    <Typography variant="h6">{t('errorTitle')}</Typography>
                    <Typography color="text.secondary">{error}</Typography>
                </Box>
            ) : recipes.length === 0 ? (
                <Box className={styles.stateBox}>
                    <Typography variant="h6">{t('emptyTitle')}</Typography>
                    <Typography color="text.secondary">{t('emptyMessage')}</Typography>
                </Box>
            ) : (
                <>
                    <Box className={styles.recipeGrid}>
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe.id ?? recipe._id ?? recipe.slug} recipe={recipe} />
                        ))}
                    </Box>

                    <Box className={styles.paginationBar}>
                        <Typography color="text.secondary">
                            {t('resultsCount', { count: total })}
                        </Typography>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default RecipesPage;
