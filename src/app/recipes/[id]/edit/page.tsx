"use client";

import { FC, useState } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
    TextField,
    Button,
    MenuItem,
    FormControl,
    Box,
} from "@mui/material";

import NumberField from '@mui/material/TextField';

type Ingredient = {
    name: string;
    quantity: string;
    unit: string;
    linkedProductId?: string;
    linkedProductName?: string;
};

type Step = {
    text: string;
    image?: File | null;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
};

const tags = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'No Sugar',
    'High Protein',
    'Low Carb'
];

function getStyles(name: string, dietaryTag: string[], theme: Theme) {
    return {
        fontWeight: dietaryTag.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const EditRecipe: FC = () => {
    const t = useTranslations('RecipeForm');

    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { name: "", quantity: "", unit: "" },
    ]);

    const [steps, setSteps] = useState<Step[]>([
        { text: "", image: null },
    ]);

    const handleCoverChange = (file: File) => {
        setCoverImage(file);
        setCoverPreview(URL.createObjectURL(file));
    };

    const updateIngredient = (
        index: number,
        field: keyof Ingredient,
        value: string
    ) => {
        const updated = [...ingredients];
        updated[index] = { ...updated[index], [field]: value };
        setIngredients(updated);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const updateStep = (index: number, value: string) => {
        const updated = [...steps];
        updated[index].text = value;
        setSteps(updated);
    };

    const addStep = () => {
        setSteps([...steps, { text: "", image: null }]);
    };

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const theme = useTheme();
    const [dietaryTag, setdietaryTag] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof dietaryTag>) => {
        const {
            target: { value },
        } = event;
        setdietaryTag(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    type Nutrition = {
        calories?: string;
        protein?: string;
        carbs?: string;
        fat?: string;
        fiber?: string;
        sugar?: string;
    };

    return (
        <div className={styles.addProductContainer}>
            <h1 className={styles.addProductTitle}>{t('edit')}</h1>
            <form className={styles.addProductForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="recipeTitle" className={styles.formLabel}>
                        {t('recipeTitle')}
                    </label>
                    <TextField
                        id="recipeTitle"
                        variant="outlined"
                        defaultValue="Tomato Soup"
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                    />
                    <label htmlFor="recipeDescription" className={styles.formLabel}>
                        {t('recipeDescription')}
                    </label>
                    <TextField
                        id="recipeDescription"
                        variant="outlined"
                        defaultValue="A delicious tomato soup"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="mealType" className={styles.formLabel}>
                        {t('mealType')}
                    </label>
                    <FormControl fullWidth>
                        <Select
                            id="mealType"
                            displayEmpty
                            renderValue={(selected) => {
                                const value = typeof selected === 'string' ? selected : '';
                                return value.length > 0 ? value : t('selectMealType');
                            }}
                            sx={{ mt: 1, mb: 2 }}
                        >
                            <MenuItem value="" disabled>
                                {t('selectMealType')}
                            </MenuItem>
                            <MenuItem value="breakfast">Breakfast</MenuItem>
                            <MenuItem value="lunch">Lunch</MenuItem>
                            <MenuItem value="dinner">Dinner</MenuItem>
                            <MenuItem value="dessert">Dessert</MenuItem>
                        </Select>
                    </FormControl>

                    <label htmlFor="dietary-tags" className={styles.formLabel}>
                        {t('dietaryTags')}
                    </label>
                    <FormControl fullWidth>
                        <Select
                            id="dietary-tags"
                            multiple
                            value={dietaryTag}
                            onChange={handleChange}
                            MenuProps={MenuProps}
                            displayEmpty
                            renderValue={(selected) =>
                                Array.isArray(selected) && selected.length
                                    ? selected.join(', ')
                                    : t('selectDietaryTags')
                            }
                            sx={{ mt: 1, mb: 2 }}
                        >
                            <MenuItem value="" disabled>
                                {t('selectDietaryTags')}
                            </MenuItem>
                            {tags.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, dietaryTag, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <label htmlFor="recipeDifficulty" className={styles.formLabel}>
                        {t('recipeDifficulty')}
                    </label>
                    <FormControl fullWidth>
                        <Select
                            id="recipeDifficulty"
                            defaultValue=""
                            displayEmpty
                            renderValue={(selected) =>
                                selected ? selected : t('selectDifficulty')
                            }
                            sx={{ mt: 1, mb: 2 }}
                        >
                            <MenuItem value="" disabled>
                                {t('selectDifficulty')}
                            </MenuItem>
                            <MenuItem value="easy">{t('difficultyLevels.easy')}</MenuItem>
                            <MenuItem value="medium">{t('difficultyLevels.medium')}</MenuItem>
                            <MenuItem value="hard">{t('difficultyLevels.hard')}</MenuItem>
                        </Select>
                    </FormControl>

                    <label htmlFor="servings" className={styles.formLabel}>
                        {t('servings')}
                    </label>
                    <NumberField
                        id="servings"
                        defaultValue="2"
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                    />

                    <label htmlFor="duration" className={styles.formLabel}>
                        {t('duration')}
                    </label>
                    <NumberField
                        id="duration"
                        defaultValue="30"
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                    />
                </div>

                <Box sx={{ mb: 3 }}>
                    <Button variant="outlined" component="label">
                        {t('uploadImage')}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleCoverChange(file);
                            }}
                        />
                    </Button>

                    {coverPreview && (
                        <Box sx={{ mt: 2 }}>
                            <img
                                src={coverPreview}
                                alt={t('preview')}
                                style={{ maxWidth: "200px", borderRadius: "8px" }}
                            />
                        </Box>
                    )}
                </Box>

                <h2 className={styles.heading}>{t('ingredients')}</h2>

                {ingredients.map((ingredient, index) => (
                    <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="ingredientName" className={styles.formLabel}>
                            {t('ingredientName')}
                        </label>
                        <TextField
                            defaultValue="Tomato"
                            value={ingredient.name}
                            onChange={(e) =>
                                updateIngredient(index, "name", e.target.value)
                            }
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="ingredientQuantity" className={styles.formLabel}>
                            {t('ingredientQuantity')}
                        </label>
                        <TextField
                            defaultValue="2"
                            value={ingredient.quantity}
                            onChange={(e) =>
                                updateIngredient(index, "quantity", e.target.value)
                            }
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <label htmlFor="ingredientUnit" className={styles.formLabel}>
                            {t('ingredientUnit')}
                        </label>
                        <TextField
                            defaultValue="kg"
                            value={ingredient.unit}
                            onChange={(e) =>
                                updateIngredient(index, "unit", e.target.value)
                            }
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <Button variant="outlined" sx={{ mt: 1, mb: 1 }}>
                            {t('linkProduct')}
                        </Button>

                        <Button color="error" onClick={() => removeIngredient(index)} sx={{ mt: 1, mb: 1 }}>
                            {t('remove')}
                        </Button>
                    </Box>
                ))}

                <Button onClick={addIngredient} sx={{ mt: 1, mb: 3 }}>
                    {t('addIngredient')}
                </Button>

                <h2 className={styles.heading}>{t('steps')}</h2>

                {steps.map((step, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <label htmlFor="step-{index}" className={styles.formLabel}>
                            {`${t('step')} ${index + 1}`}
                        </label>
                        <TextField
                            value={step.text}
                            defaultValue="Slice the tomatoes and add them to the pan."
                            id={`step-${index}`}
                            onChange={(e) => updateStep(index, e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                            sx={{ mt: 1, mb: 2 }}
                        />

                        <Button color="error" onClick={() => removeStep(index)}>
                            {t('removeStep')}
                        </Button>
                    </Box>
                ))}

                <Button onClick={addStep} sx={{ mb: 3 }}>
                    {t('addStep')}
                </Button>

                <h2 className={styles.heading}>{t('nutrition')}</h2>

                <label htmlFor="calories" className={styles.formLabel}>
                    {t('calories')}
                </label>
                <TextField id="calories" type="number" fullWidth sx={{ mt: 1, mb: 2 }} />
                <label htmlFor="protein" className={styles.formLabel}>
                    {t('protein')}
                </label>
                <TextField id="protein" type="number" fullWidth sx={{ mt: 1, mb: 2 }} />
                <label htmlFor="carbs" className={styles.formLabel}>
                    {t('carbs')}
                </label>
                <TextField id="carbs" type="number" fullWidth sx={{ mt: 1, mb: 2 }} />
                <label htmlFor="fat" className={styles.formLabel}>
                    {t('fat')}
                </label>
                <TextField id="fat" type="number" fullWidth sx={{ mt: 1, mb: 2 }} />
                <label htmlFor="fiber" className={styles.formLabel}>
                    {t('fiber')}
                </label>
                <TextField id="fiber" type="number" fullWidth sx={{ mt: 1, mb: 2 }} />
                <label htmlFor="sugar" className={styles.formLabel}>
                    {t('sugar')}
                </label>
                <TextField id="sugar" type="number" fullWidth sx={{ mt: 1, mb: 2 }} />

                <Button type="submit" className={styles.formButton} variant="contained">
                    {t('submit')}
                </Button>
            </form>
        </div>
    );
};

export default EditRecipe;