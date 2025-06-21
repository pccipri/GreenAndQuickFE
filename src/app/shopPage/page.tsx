"use client";

import { Container, List } from "@mui/material";
import { FC } from "react";
import CategoriesList from "../components/categoriesList";
import ShopCard from "../components/shopCard";


const ShopPage: FC = () => {
    return (
        <Container maxWidth={false}
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'white',
                color: 'black',
            }}>
            {/* This is where the header introductory component goes */}
            <div className="header-section-shop"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '20%',
                }}>
                <h1 style={{ padding: '50px' }}>Shop now</h1>
            </div>

            {/* This is where the main content goes */}
            <div className="main-section-shop"
                style={{
                    display: 'flex',
                    height: '80%',
                    padding: '0 50px 50px 50px',
                }}>
                <div className="sellers-cards"
                    style={{
                        width: '20%',
                        height: '100%',
                        overflowY: 'auto',
                    }}>
                    <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Categories</h3>
                    <List
                        sx={{
                            width: '100%',
                            marginTop: '20px',
                            border: '1px solid black',
                            borderRadius: '20px',
                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <CategoriesList categoryName="Vegetables" />
                        <CategoriesList categoryName="Fruits" />
                        <CategoriesList categoryName="Meat" />
                        <CategoriesList categoryName="Fish" />
                        <CategoriesList categoryName="Eggs" />
                        <CategoriesList categoryName="Flour" />
                        <CategoriesList categoryName="Vegetables" />
                        <CategoriesList categoryName="Fruits" />
                        <CategoriesList categoryName="Meat" />
                        <CategoriesList categoryName="Fish" />
                        <CategoriesList categoryName="Eggs" />
                        <CategoriesList categoryName="Flour" />
                        <CategoriesList categoryName="Vegetables" />
                        <CategoriesList categoryName="Fruits" />
                        <CategoriesList categoryName="Meat" />
                        <CategoriesList categoryName="Fish" />
                        <CategoriesList categoryName="Eggs" />
                        <CategoriesList categoryName="Flour" />
                        <CategoriesList categoryName="Vegetables" />
                        <CategoriesList categoryName="Fruits" />
                        <CategoriesList categoryName="Meat" />
                        <CategoriesList categoryName="Fish" />
                        <CategoriesList categoryName="Eggs" />
                        <CategoriesList categoryName="Flour" />
                    </List>
                </div>

                <div className="shop-cards" style={{ overflowY: 'auto', width: '80%' }}>
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
                                productRating={4.5}
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productRating={4.5}
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productRating={4.5}
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
                                productRating={4.5}
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productRating={4.5}
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productRating={4.5}
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
                                productRating={4.5}
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productRating={4.5}
                                productPrice={29.99}
                            />
                            <ShopCard
                                productImage="/images/bgplaceholder.jpeg"
                                productName="Lizard"
                                productDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                                productRating={4.5}
                                productPrice={29.99}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ShopPage;