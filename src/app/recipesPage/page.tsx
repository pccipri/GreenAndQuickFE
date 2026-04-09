"use client";

import styles from './page.module.css';
import { FC } from "react";
import RecipeCard from "@/app/components/recipeCard";
import CategoryCard from "@/app/components/categoryCard";
import Button from 'node_modules/@mui/material/esm/Button/Button';

const RecipesPage: FC = () => {
    return (
        <>
            <div className={styles.recipesContainer}>
                {/* Highlighted recipes section */}
                <div className={styles.highlightedRecipes}>
                    <h2 style={{ padding: '20px 50px 5px 50px' }}>Easter Recipes</h2>

                    <div className={styles.recipeCardContainer}>
                        <RecipeCard
                            recipeImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            recipeName="Easter Egg Salad"
                            recipeCategory="Spring"
                        />
                        <RecipeCard
                            recipeImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            recipeName="Easter Egg Salad"
                            recipeCategory="Spring"
                        />
                        <RecipeCard
                            recipeImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            recipeName="Easter Egg Salad"
                            recipeCategory="Spring"
                        />
                        <RecipeCard
                            recipeImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            recipeName="Easter Egg Salad"
                            recipeCategory="Spring"
                        />
                        <RecipeCard
                            recipeImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            recipeName="Easter Egg Salad"
                            recipeCategory="Spring"
                        />
                        <RecipeCard
                            recipeImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            recipeName="Easter Egg Salad"
                            recipeCategory="Spring"
                        />
                    </div>

                    <Button variant="outlined" className={styles.loadMoreBtn}>
                        More Easter Recipes
                    </Button>
                </div>

                {/* Browse by categories section */}
                <div className={styles.categoriesSection}>
                    <h2 style={{ padding: '20px 50px 5px 50px' }}>Browse by Categories</h2>

                    <div className={styles.categoryCardContainer}>
                        <CategoryCard
                            categoryImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            categoryName="Spring"
                        />
                        <CategoryCard
                            categoryImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            categoryName="Latin"
                        />
                        <CategoryCard
                            categoryImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            categoryName="Dinner"
                        />
                        <CategoryCard
                            categoryImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            categoryName="Cakes"
                        />
                        <CategoryCard
                            categoryImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            categoryName="Cookies"
                        />
                        <CategoryCard
                            categoryImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            categoryName="Appetizers"
                        />
                        <CategoryCard
                            categoryImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            categoryName="Drinks"
                        />
                        <CategoryCard
                            categoryImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            categoryName="Biscuits"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipesPage;