"use client"

import { FC, useState } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from 'node_modules/@mui/material/esm/Button/Button';

import ShopCard from '@/app/components/shopCard';
import SellerCard from '@/app/components/sellerCard';
import RecipeCard from '@/app/components/recipeCard';


const FavoritesTab: FC = () => {
    const t = useTranslations('FavoritesTab');

    const [value, setValue] = useState(0);

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label={t('shops')} />
                    <Tab label={t('products')} />
                    <Tab label={t('recipes')} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div className="sellers-cards" style={{ overflowY: 'auto', width: '100%' }}>
                    <div className="cards-parent-container"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <div className="cards-child-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                        </div>

                        <div className="cards-child-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                        </div>

                        <div className="cards-child-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={2.5} />
                        </div>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="shop-cards" style={{ overflowY: 'auto', width: '100%' }}>
                    <div className="cards-parent-container"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <div className="cards-child-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                        </div>

                        <div className="cards-child-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                        </div>

                        <div className="cards-child-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productPrice={29.99}
                            />
                        </div>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className={styles.recipesContainer}>
                    <div className={styles.highlightedRecipes}>
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
                            Load More
                        </Button>
                    </div>
                </div>
            </CustomTabPanel>
        </>
    );
};

export default FavoritesTab;