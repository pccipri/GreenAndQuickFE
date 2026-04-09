"use client";

import styles from './page.module.css';
import { FC } from "react";
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PrintIcon from '@mui/icons-material/Print';

import IngredientsList from "@/app/components/ingredientsList";
import InstructionsList from "@/app/components/instructionsList";

const RecipeDetails: FC = () => {
    return (
        <>
            {/* Navigation part - back button + add ingredients to cart */}
            <div className={styles.navigationContainer}>
                <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>
                    Back
                </Button>
                <Button variant="contained" startIcon={<AddShoppingCartIcon />}>
                    Add All Ingredients To Cart
                </Button>
            </div>


            {/* Recipe body */}
            <div className={styles.parentContainerRecipeDetails}>
                {/* Recipe details - image + title + actions */}
                <div className={styles.detailsContainer}>
                    <div className={styles.imageContainer}>
                        <img src="/images/bgplaceholder.jpeg" alt="Recipe Image" width={1025} height={500} />
                    </div>

                    <div className={styles.descriptionContainer}>
                        <h2 style={{ marginRight: '30px' }}>Chicken Ramen Noodles</h2>
                        <span className={styles.actionsSpan}>
                            <Button variant="text" startIcon={<FavoriteBorderIcon />}>
                                Save
                            </Button>
                            <Button variant="text" startIcon={<PrintIcon />}>
                                Print
                            </Button>
                        </span>
                    </div>
                </div>
            </div>

            {/* Ingredients and instructions */}
            <div className={styles.parentContainerRecipeDetails}>
                <div className={styles.actionsSpanContainer}>
                    <span className={styles.actionsSpan}>
                        <GroupsIcon style={{ margin: '0 8px' }} /> 3-4 servings
                    </span>
                    <span className={styles.actionsSpan}>
                        <AccessTimeIcon style={{ margin: '0 8px' }} /> 30 minutes
                    </span>
                </div>

                <h3 style={{ margin: '20px 0 10px 0' }}>Ingredients:</h3>
                <ul>
                    <IngredientsList ingredient="2 cups chicken broth" />
                    <IngredientsList ingredient="1 cup soy sauce" />
                    <IngredientsList ingredient="2 cloves garlic, minced" />
                    <IngredientsList ingredient="1 inch fresh ginger, grated" />
                    <IngredientsList ingredient="2 eggs" />
                    <IngredientsList ingredient="2 cups shredded chicken" />
                    <IngredientsList ingredient="2 cups ramen noodles" />
                </ul>

                <h3 style={{ margin: '40px 0 10px 0' }}>Instructions:</h3>
                <ol>
                    <InstructionsList instruction="Heat the chicken broth and soy sauce in a large pot." imageSrc="/images/bgplaceholder.jpeg" imageAlt="Simmering broth" />
                    <InstructionsList instruction="Add the garlic and ginger, and simmer for 10 minutes." />
                    <InstructionsList instruction="Break the eggs into the pot and cook until set." />
                    <InstructionsList instruction="Add the shredded chicken and ramen noodles, and cook until heated through." />
                </ol>
            </div>
        </>
    );
};

export default RecipeDetails;