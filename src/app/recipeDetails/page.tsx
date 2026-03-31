"use client";

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
            <div className="navigationContainer"
                style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '10px 50px'
                }}>
                <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>
                    Back
                </Button>
                <Button variant="contained" startIcon={<AddShoppingCartIcon />}>
                    Add All Ingredients To Cart
                </Button>
            </div>


            {/* Recipe body */}
            <div className="parentContainerRecipeDetails"
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    height: '100%',
                    width: '100%',
                    display: 'flex'
                }}
            >
                {/* Recipe details - image + title + actions */}
                <div className="detailsContainer"
                    style={{
                        height: '100%',
                        width: '100%',
                        padding: '10px 100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                >
                    <div className="imageContainer" // To center the image
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: '20px'
                        }}>
                        <img src="/images/bgplaceholder.jpeg" alt="Recipe Image" width={1025} height={500} />
                    </div>

                    <div className="descriptionContainer"   // For the title and the actions
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: '15px'
                        }}>
                        <h2 style={{ marginRight: '30px' }}>Chicken Ramen Noodles</h2>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
            <div className="parentContainerRecipeDetails"
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 100px'
                }}
            >
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <GroupsIcon style={{ margin: '0 8px' }} />3-4 servings
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <AccessTimeIcon style={{ margin: '0 8px' }} />30 minutes
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