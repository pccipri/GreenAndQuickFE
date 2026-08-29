"use client";

import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ImageIcon from '@mui/icons-material/Image';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {
    createRecipe,
    getDietaryTags,
    updateRecipe,
} from '@/services/recipeService';
import { notify } from '@/utils/toast';
import {
    DietaryTag,
    Difficulty,
    DurationType,
    MealType,
    RecipeDetail,
    RecipeIngredient,
    RecipeInstruction,
} from '@/interfaces/Recipe';

type RecipeFormMode = 'create' | 'edit';

type IngredientDraft = {
    label: string;
    value: string;
    unit: string;
    linkedProductId: string;
    linkedProductName: string;
};

type InstructionDraft = {
    stepNumber: number;
    description: string;
    imageFile: File | null;
    imagePreview: string | null;
    existingImagePath: string | null;
};

type NutritionDraft = {
    energyKcal: string;
    energyKj: string;
    fat: string;
    saturates: string;
    carbohydrates: string;
    sugars: string;
    protein: string;
    salt: string;
};

type RecipeUpsertFormProps = {
    mode: RecipeFormMode;
    initialRecipe?: RecipeDetail | null;
};

const mealTypes: MealType[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'DESSERT'];
const difficultyLevels: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];
const durationTypes: DurationType[] = ['MINUTES', 'HOURS'];

const emptyIngredient = (): IngredientDraft => ({
    label: '',
    value: '',
    unit: '',
    linkedProductId: '',
    linkedProductName: '',
});

const emptyInstruction = (stepNumber: number): InstructionDraft => ({
    stepNumber,
    description: '',
    imageFile: null,
    imagePreview: null,
    existingImagePath: null,
});

const emptyNutrition = (): NutritionDraft => ({
    energyKcal: '',
    energyKj: '',
    fat: '',
    saturates: '',
    carbohydrates: '',
    sugars: '',
    protein: '',
    salt: '',
});

const formatIngredient = (ingredient: RecipeIngredient): IngredientDraft => ({
    label: ingredient.name ?? '',
    value: ingredient.quantity?.toString() ?? '',
    unit: ingredient.unit ?? '',
    linkedProductId: ingredient.linkedProductId ?? '',
    linkedProductName: ingredient.linkedProductName ?? '',
});

const formatInstruction = (instruction: RecipeInstruction): InstructionDraft => ({
    stepNumber: instruction.stepNumber,
    description: instruction.description ?? '',
    imageFile: null,
    imagePreview: instruction.imageUrl ?? instruction.imagePath ?? null,
    existingImagePath: instruction.imageUrl ?? instruction.imagePath ?? null,
});

const buildNutrition = (nutrition: NutritionDraft) => {
    const entries = Object.entries(nutrition)
        .map(([key, value]) => [key, value.trim()] as const)
        .filter(([, value]) => value.length > 0)
        .map(([key, value]) => [key, Number(value)] as const)
        .filter(([, value]) => !Number.isNaN(value));

    if (entries.length === 0) {
        return null;
    }

    return Object.fromEntries(entries) as Record<string, number>;
};

const RecipeUpsertForm: FC<RecipeUpsertFormProps> = ({ mode, initialRecipe }) => {
    const t = useTranslations('RecipeForm');
    const router = useRouter();

    const getDietaryTagLabel = (tagKey: string) => {
        const translated = t(`dietaryTagLabels.${tagKey}` as string);
        return translated === `dietaryTagLabels.${tagKey}` ? tagKey : translated;
    };

    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [mealType, setMealType] = useState<MealType | ''>('');
    const [difficulty, setDifficulty] = useState<Difficulty | ''>('');
    const [dietaryTags, setDietaryTags] = useState<string[]>([]);
    const [servings, setServings] = useState('');
    const [duration, setDuration] = useState('');
    const [durationType, setDurationType] = useState<DurationType>('MINUTES');
    const [availableDietaryTags, setAvailableDietaryTags] = useState<DietaryTag[]>([]);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [existingCoverImagePath, setExistingCoverImagePath] = useState<string | null>(null);
    const [removeMainImage, setRemoveMainImage] = useState(false);
    const [ingredients, setIngredients] = useState<IngredientDraft[]>([emptyIngredient()]);
    const [instructions, setInstructions] = useState<InstructionDraft[]>([emptyInstruction(1)]);
    const [nutrition, setNutrition] = useState<NutritionDraft>(emptyNutrition());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState({ title: false, shortDescription: false, mealType: false, servings: false, duration: false, ingredients: false, instructions: false });

    useEffect(() => {
        const loadDietaryTags = async () => {
            const tags = await getDietaryTags();
            setAvailableDietaryTags(tags);
        };

        void loadDietaryTags();
    }, []);

    useEffect(() => {
        if (!initialRecipe) {
            return;
        }

        setTitle(initialRecipe.title ?? '');
        setShortDescription(initialRecipe.shortDescription ?? '');
        setMealType(initialRecipe.mealType ?? '');
        setDifficulty(initialRecipe.difficulty ?? '');
        setDietaryTags(initialRecipe.dietaryTags ?? []);
        setServings(initialRecipe.servings?.toString() ?? '');
        setDuration(initialRecipe.duration?.toString() ?? '');
        setDurationType(initialRecipe.durationType ?? 'MINUTES');
        setCoverPreview(null);
        setCoverImageFile(null);
        setExistingCoverImagePath(initialRecipe.imageUrl ?? initialRecipe.imagePath ?? null);
        setRemoveMainImage(false);
        setIngredients(
            initialRecipe.ingredients?.length
                ? initialRecipe.ingredients.map(formatIngredient)
                : [emptyIngredient()],
        );
        setInstructions(
            initialRecipe.instructions?.length
                ? initialRecipe.instructions
                    .slice()
                    .sort((left, right) => left.stepNumber - right.stepNumber)
                    .map(formatInstruction)
                : [emptyInstruction(1)],
        );
        setNutrition({
            energyKcal: initialRecipe.nutritionPerPortion?.energyKcal?.toString() ?? '',
            energyKj: initialRecipe.nutritionPerPortion?.energyKj?.toString() ?? '',
            fat: initialRecipe.nutritionPerPortion?.fat?.toString() ?? '',
            saturates: initialRecipe.nutritionPerPortion?.saturates?.toString() ?? '',
            carbohydrates: initialRecipe.nutritionPerPortion?.carbohydrates?.toString() ?? '',
            sugars: initialRecipe.nutritionPerPortion?.sugars?.toString() ?? '',
            protein: initialRecipe.nutritionPerPortion?.protein?.toString() ?? '',
            salt: initialRecipe.nutritionPerPortion?.salt?.toString() ?? '',
        });
    }, [initialRecipe]);

    const hasExistingCoverImage = Boolean(existingCoverImagePath && !coverPreview);

    useEffect(() => {
        return () => {
            if (coverPreview?.startsWith('blob:')) {
                URL.revokeObjectURL(coverPreview);
            }

            instructions.forEach((instruction) => {
                if (instruction.imagePreview?.startsWith('blob:')) {
                    URL.revokeObjectURL(instruction.imagePreview);
                }
            });
        };
    }, [coverPreview, instructions]);

    const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        if (coverPreview?.startsWith('blob:')) {
            URL.revokeObjectURL(coverPreview);
        }

        setCoverImageFile(file);
        setExistingCoverImagePath(null);
        setRemoveMainImage(false);
        setCoverPreview(URL.createObjectURL(file));
    };

    const handleRemoveCoverImage = () => {
        if (coverPreview?.startsWith('blob:')) {
            URL.revokeObjectURL(coverPreview);
        }

        setCoverImageFile(null);
        setCoverPreview(null);
        setExistingCoverImagePath(null);
        setRemoveMainImage(true);
    };

    const updateIngredient = (index: number, field: keyof IngredientDraft, value: string) => {
        setIngredients((current) => {
            const next = [...current];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const updateInstruction = (index: number, value: string) => {
        setInstructions((current) => {
            const next = [...current];
            next[index] = { ...next[index], description: value };
            return next;
        });
    };

    const updateInstructionImage = (index: number, file: File) => {
        setInstructions((current) => {
            const next = [...current];
            const previousPreview = next[index]?.imagePreview;

            if (previousPreview?.startsWith('blob:')) {
                URL.revokeObjectURL(previousPreview);
            }

            next[index] = {
                ...next[index],
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
                existingImagePath: null,
            };

            return next;
        });
    };

    const removeInstructionImage = (index: number) => {
        setInstructions((current) => {
            const next = [...current];
            const previousPreview = next[index]?.imagePreview;

            if (previousPreview?.startsWith('blob:')) {
                URL.revokeObjectURL(previousPreview);
            }

            next[index] = {
                ...next[index],
                imageFile: null,
                imagePreview: null,
                existingImagePath: null,
            };

            return next;
        });
    };

    const addIngredient = () => {
        setIngredients((current) => [...current, emptyIngredient()]);
    };

    const removeIngredient = (index: number) => {
        setIngredients((current) => current.filter((_, itemIndex) => itemIndex !== index));
    };

    const addInstruction = () => {
        setInstructions((current) => [...current, emptyInstruction(current.length + 1)]);
    };

    const removeInstruction = (index: number) => {
        setInstructions((current) => current.filter((_, itemIndex) => itemIndex !== index));
    };

    const handleDietaryTagsChange = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        setDietaryTags(typeof value === 'string' ? value.split(',') : value);
    };

    const markAllTouched = () => {
        setTouched({
            title: true,
            shortDescription: true,
            mealType: true,
            servings: true,
            duration: true,
            ingredients: true,
            instructions: true,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        markAllTouched();
        setIsSubmitting(true);
        setError(null);

        try {
            if (!title.trim() || !shortDescription.trim() || !mealType || !servings.trim() || !duration.trim()) {
                throw new Error(t('validationError'));
            }

            const trimmedIngredients = ingredients
                .map((ingredient) => ({
                    label: ingredient.label.trim(),
                    value: ingredient.value.trim(),
                    unit: ingredient.unit.trim(),
                    linkedProductId: ingredient.linkedProductId.trim(),
                    linkedProductName: ingredient.linkedProductName.trim(),
                }))
                .filter((ingredient) => ingredient.label.length > 0 || ingredient.value.length > 0 || ingredient.unit.length > 0);

            const trimmedInstructions = instructions
                .map((instruction, index) => ({
                    stepNumber: index + 1,
                    description: instruction.description.trim(),
                    imagePath: instruction.existingImagePath,
                }))
                .filter((instruction) => instruction.description.length > 0);

            if (trimmedIngredients.length === 0) {
                throw new Error(t('ingredientsRequired'));
            }

            if (trimmedInstructions.length === 0) {
                throw new Error(t('stepsRequired'));
            }

            const formData = new FormData();
            formData.append('title', title.trim());
            formData.append('shortDescription', shortDescription.trim());
            formData.append('mealType', mealType);
            formData.append('difficulty', difficulty || '');
            formData.append('dietaryTags', JSON.stringify(dietaryTags));
            formData.append('servings', servings.trim());
            formData.append('duration', duration.trim());
            formData.append('durationType', durationType);
            formData.append('ingredients', JSON.stringify(trimmedIngredients.map((ingredient) => ({
                name: ingredient.label,
                quantity: Number(ingredient.value),
                unit: ingredient.unit,
                linkedProductId: ingredient.linkedProductId || undefined,
                linkedProductName: ingredient.linkedProductName || undefined,
            }))));
            formData.append('instructions', JSON.stringify(trimmedInstructions));

            const nutritionPayload = buildNutrition(nutrition);
            formData.append('nutritionPerPortion', JSON.stringify(nutritionPayload));
            formData.append('isPublished', 'true');

            if (coverImageFile) {
                formData.append('mainImage', coverImageFile);
            }

            if (mode === 'edit' && removeMainImage) {
                formData.append('removeMainImage', 'true');
            }

            const removeInstructionImages = instructions.map((instruction) => mode === 'edit' && Boolean(instruction.existingImagePath) && !instruction.imageFile && !instruction.imagePreview);
            if (mode === 'edit') {
                formData.append('removeInstructionImages', JSON.stringify(removeInstructionImages));
            }

            instructions
                .filter((instruction) => instruction.imageFile)
                .forEach((instruction) => {
                    formData.append('instructionImages', instruction.imageFile as File);
                });

            if (mode === 'create') {
                const created = await createRecipe(formData);
                notify(t('submitSuccess'), 'success');
                router.push(`/recipes/${created.id ?? created._id}`);
                return;
            }

            if (!initialRecipe) {
                throw new Error(t('notReady'));
            }

            const updated = await updateRecipe(initialRecipe.id ?? initialRecipe._id ?? '', formData);
            notify(t('submitSuccess'), 'success');
            router.push(`/recipes/${updated.id ?? updated._id}`);
        } catch (submissionError) {
            notify(submissionError instanceof Error ? submissionError.message : t('submitFailed'), 'error');
            setError(submissionError instanceof Error ? submissionError.message : t('submitFailed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 6 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        {mode === 'create' ? t('add') : t('edit')}
                    </Typography>
                    <Typography variant="h3" component="h1">
                        {mode === 'create' ? t('add') : t('edit')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        {mode === 'create' ? t('createSubtitle') : t('editSubtitle')}
                    </Typography>
                </Box>

                <Button component={Link} href="/recipes" variant="outlined" startIcon={<ArrowBackIosIcon />}>
                    {t('backToBrowse')}
                </Button>
            </Stack>

            {error && (
                <Paper variant="outlined" sx={{ p: 2, borderColor: 'error.main', backgroundColor: 'rgba(211, 47, 47, 0.04)' }}>
                    <Typography color="error.main" fontWeight={600}>
                        {error}
                    </Typography>
                </Paper>
            )}

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2.5}>
                    <Typography variant="h6">{t('basicInfo')}</Typography>
                    <TextField
                        label={t('recipeTitle')}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        onBlur={() => setTouched((current) => ({ ...current, title: true }))}
                        fullWidth
                        error={touched.title && !title.trim()}
                        helperText={touched.title && !title.trim() ? t('validationError') : undefined}
                    />
                    <TextField
                        label={t('shortDescription')}
                        value={shortDescription}
                        onChange={(event) => setShortDescription(event.target.value)}
                        onBlur={() => setTouched((current) => ({ ...current, shortDescription: true }))}
                        fullWidth
                        multiline
                        minRows={3}
                        error={touched.shortDescription && !shortDescription.trim()}
                        helperText={touched.shortDescription && !shortDescription.trim() ? t('validationError') : undefined}
                    />

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <FormControl fullWidth error={touched.mealType && !mealType}>
                            <InputLabel id="meal-type-label">{t('mealType')}</InputLabel>
                            <Select
                                labelId="meal-type-label"
                                value={mealType}
                                label={t('mealType')}
                                onChange={(event) => setMealType(event.target.value as MealType)}
                                onBlur={() => setTouched((current) => ({ ...current, mealType: true }))}
                            >
                                <MenuItem value="">{t('selectMealType')}</MenuItem>
                                {mealTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.mealType && !mealType && <FormHelperText>{t('validationError')}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="difficulty-label">{t('recipeDifficulty')}</InputLabel>
                            <Select
                                labelId="difficulty-label"
                                value={difficulty}
                                label={t('recipeDifficulty')}
                                onChange={(event) => setDifficulty(event.target.value as Difficulty | '')}
                            >
                                <MenuItem value="">{t('selectDifficulty')}</MenuItem>
                                {difficultyLevels.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {t(`difficultyLevels.${option.toLowerCase()}`)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <FormControl fullWidth>
                        <InputLabel id="dietary-tags-label">{t('dietaryTags')}</InputLabel>
                        <Select<string[]>
                            labelId="dietary-tags-label"
                            multiple
                            value={dietaryTags}
                            input={<OutlinedInput label={t('dietaryTags')} />}
                            onChange={handleDietaryTagsChange}
                            renderValue={(selected) => (
                                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                    {selected.map((tag) => (
                                        <Chip key={tag} label={getDietaryTagLabel(tag)} size="small" />
                                    ))}
                                </Stack>
                            )}
                        >
                            <MenuItem value="" disabled>
                                {t('selectDietaryTags')}
                            </MenuItem>
                            {availableDietaryTags.map((tag) => (
                                <MenuItem key={tag.key} value={tag.key}>
                                    <Checkbox checked={dietaryTags.includes(tag.key)} />
                                    {getDietaryTagLabel(tag.key)}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{t('dietaryTagsHelp')}</FormHelperText>
                    </FormControl>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            label={t('servings')}
                            type="number"
                            value={servings}
                            onChange={(event) => setServings(event.target.value)}
                            onBlur={() => setTouched((current) => ({ ...current, servings: true }))}
                            fullWidth
                            error={touched.servings && !servings.trim()}
                            helperText={touched.servings && !servings.trim() ? t('validationError') : undefined}
                        />
                        <TextField
                            label={t('duration')}
                            type="number"
                            value={duration}
                            onChange={(event) => setDuration(event.target.value)}
                            onBlur={() => setTouched((current) => ({ ...current, duration: true }))}
                            fullWidth
                            error={touched.duration && !duration.trim()}
                            helperText={touched.duration && !duration.trim() ? t('validationError') : undefined}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="duration-type-label">{t('durationType')}</InputLabel>
                            <Select
                                labelId="duration-type-label"
                                value={durationType}
                                label={t('durationType')}
                                onChange={(event) => setDurationType(event.target.value as DurationType)}
                            >
                                {durationTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {t(option === 'MINUTES' ? 'minutes' : 'hours')}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">{t('coverImage')}</Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                        <Button variant="outlined" component="label" startIcon={<ImageIcon />} sx={{ alignSelf: 'flex-start' }}>
                            {t('uploadImage')}
                            <input type="file" hidden accept="image/*" onChange={handleCoverChange} />
                        </Button>
                        {(coverPreview || existingCoverImagePath || removeMainImage) && (
                            <Button type="button" variant="text" color="inherit" onClick={handleRemoveCoverImage}>
                                {t('removeImage')}
                            </Button>
                        )}
                    </Stack>
                    {coverPreview && (
                        <Box component="img" src={coverPreview} alt={t('preview')} sx={{ width: '100%', maxWidth: 420, borderRadius: 3, objectFit: 'cover' }} />
                    )}
                    {hasExistingCoverImage && existingCoverImagePath && (
                        <Box component="img" src={existingCoverImagePath} alt={t('existingCoverImage')} sx={{ width: '100%', maxWidth: 420, borderRadius: 3, objectFit: 'cover' }} />
                    )}
                </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{t('ingredients')}</Typography>
                        <Button type="button" variant="outlined" startIcon={<AddIcon />} onClick={addIngredient}>
                            {t('addIngredient')}
                        </Button>
                    </Stack>

                    {ingredients.map((ingredient, index) => (
                        <Paper key={`ingredient-${index}`} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle1">
                                        {t('ingredientRow')} {index + 1}
                                    </Typography>
                                    <Button type="button" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => removeIngredient(index)} disabled={ingredients.length === 1}>
                                        {t('remove')}
                                    </Button>
                                </Stack>

                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                    <TextField label={t('ingredientName')} value={ingredient.label} onChange={(event) => updateIngredient(index, 'label', event.target.value)} fullWidth />
                                    <TextField label={t('ingredientQuantity')} value={ingredient.value} onChange={(event) => updateIngredient(index, 'value', event.target.value)} fullWidth />
                                    <TextField label={t('ingredientUnit')} value={ingredient.unit} onChange={(event) => updateIngredient(index, 'unit', event.target.value)} fullWidth />
                                </Stack>

                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                    <TextField label={t('linkedProductId')} value={ingredient.linkedProductId} onChange={(event) => updateIngredient(index, 'linkedProductId', event.target.value)} fullWidth />
                                    <TextField label={t('linkedProductName')} value={ingredient.linkedProductName} onChange={(event) => updateIngredient(index, 'linkedProductName', event.target.value)} fullWidth />
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{t('steps')}</Typography>
                        <Button type="button" variant="outlined" startIcon={<AddIcon />} onClick={addInstruction}>
                            {t('addStep')}
                        </Button>
                    </Stack>

                    {instructions.map((instruction, index) => (
                        <Paper key={`instruction-${instruction.stepNumber}-${index}`} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle1">
                                        {t('step')} {index + 1}
                                    </Typography>
                                    <Button type="button" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => removeInstruction(index)} disabled={instructions.length === 1}>
                                        {t('removeStep')}
                                    </Button>
                                </Stack>

                                <TextField
                                    label={t('stepPlaceholder')}
                                    value={instruction.description}
                                    onChange={(event) => updateInstruction(index, event.target.value)}
                                    onBlur={() => setTouched((current) => ({ ...current, instructions: true }))}
                                    multiline
                                    minRows={3}
                                    fullWidth
                                    error={touched.instructions && !instruction.description.trim()}
                                    helperText={touched.instructions && !instruction.description.trim() ? t('validationError') : undefined}
                                />

                                <Stack direction="row" spacing={2} flexWrap="wrap">
                                    <Button variant="outlined" component="label" startIcon={<ImageIcon />}>
                                        {t('stepImage')}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0];
                                                if (file) {
                                                    updateInstructionImage(index, file);
                                                }
                                            }}
                                        />
                                    </Button>
                                    <Button type="button" color="inherit" onClick={() => removeInstructionImage(index)} disabled={!instruction.imagePreview}>
                                        {t('removeImage')}
                                    </Button>
                                </Stack>

                                {instruction.imagePreview && (
                                    <Box
                                        component="img"
                                        src={instruction.imagePreview}
                                        alt={`${t('step')} ${index + 1}`}
                                        sx={{ width: '100%', maxWidth: 320, borderRadius: 3, objectFit: 'cover' }}
                                    />
                                )}
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        label={t('energyKcal')}
                        type="number"
                        value={nutrition.energyKcal}
                        onChange={(event) =>
                            setNutrition((current) => ({ ...current, energyKcal: event.target.value }))
                        }
                        fullWidth
                    />

                    <TextField
                        label={t('energyKj')}
                        type="number"
                        value={nutrition.energyKj}
                        onChange={(event) =>
                            setNutrition((current) => ({ ...current, energyKj: event.target.value }))
                        }
                        fullWidth
                    />

                    <TextField
                        label={t('protein')}
                        type="number"
                        value={nutrition.protein}
                        onChange={(event) =>
                            setNutrition((current) => ({ ...current, protein: event.target.value }))
                        }
                        fullWidth
                    />

                    <TextField
                        label={t('fat')}
                        type="number"
                        value={nutrition.fat}
                        onChange={(event) =>
                            setNutrition((current) => ({ ...current, fat: event.target.value }))
                        }
                        fullWidth
                    />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        label={t('saturates')}
                        type="number"
                        value={nutrition.saturates}
                        onChange={(event) =>
                            setNutrition((current) => ({ ...current, saturates: event.target.value }))
                        }
                        fullWidth
                    />

                    <TextField
                        label={t('carbohydrates')}
                        type="number"
                        value={nutrition.carbohydrates}
                        onChange={(event) =>
                            setNutrition((current) => ({ ...current, carbohydrates: event.target.value }))
                        }
                        fullWidth
                    />

                    <TextField
                        label={t('sugars')}
                        type="number"
                        value={nutrition.sugars}
                        onChange={(event) =>
                            setNutrition((current) => ({ ...current, sugars: event.target.value }))
                        }
                        fullWidth
                    />

                    <TextField
                        label={t('salt')}
                        type="number"
                        value={nutrition.salt}
                        onChange={(event) =>
                            setNutrition((current) => ({ ...current, salt: event.target.value }))
                        }
                        fullWidth
                    />
                </Stack>
            </Paper>

            <Divider />

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button component={Link} href="/recipes" variant="text">
                    {t('cancel')}
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? t('saving') : mode === 'create' ? t('submit') : t('updateSubmit')}
                </Button>
            </Stack>
        </Box>
    );
};

export default RecipeUpsertForm;