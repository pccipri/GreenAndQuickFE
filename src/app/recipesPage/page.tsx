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
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Easter Egg Salad"
                            productCategory="Spring"
                        />
                        <RecipeCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Easter Egg Salad"
                            productCategory="Spring"
                        />
                        <RecipeCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Easter Egg Salad"
                            productCategory="Spring"
                        />
                        <RecipeCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Easter Egg Salad"
                            productCategory="Spring"
                        />
                        <RecipeCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Easter Egg Salad"
                            productCategory="Spring"
                        />
                        <RecipeCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Easter Egg Salad"
                            productCategory="Spring"
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
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Spring"
                        />
                        <CategoryCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Latin"
                        />
                        <CategoryCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Dinner"
                        />
                        <CategoryCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Cakes"
                        />
                        <CategoryCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Cookies"
                        />
                        <CategoryCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Appetizers"
                        />
                        <CategoryCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Drinks"
                        />
                        <CategoryCard
                            productImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            productName="Biscuits"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipesPage;