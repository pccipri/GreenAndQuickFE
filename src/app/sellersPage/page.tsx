"use client";

import { Button, Container, List } from "@mui/material";
import { FC, useState } from "react";

import CategoriesList from "../components/categoriesList";
import SellerCard from "../components/sellerCard";
import FeaturedSellerCard from "../components/featuredSellerCard";


const SellersPage: FC = () => {
    const [showAllCards, setShowAllCards] = useState(false);

    const sellers = [
        { sellerName: "Marcel", sellerImage: "/images/bgplaceholder.jpeg", sellerRating: 4.5 },
        { sellerName: "Anna", sellerImage: "/images/bgplaceholder.jpeg", sellerRating: 4.0 },
        { sellerName: "Jon", sellerImage: "/images/bgplaceholder.jpeg", sellerRating: 3.5 },
        { sellerName: "Ella", sellerImage: "/images/bgplaceholder.jpeg", sellerRating: 4.8 },
        { sellerName: "Lars", sellerImage: "/images/bgplaceholder.jpeg", sellerRating: 4.2 },
        { sellerName: "Maja", sellerImage: "/images/bgplaceholder.jpeg", sellerRating: 4.6 },
        { sellerName: "Maja", sellerImage: "/images/bgplaceholder.jpeg", sellerRating: 4.6 },
        { sellerName: "Maja", sellerImage: "/images/bgplaceholder.jpeg", sellerRating: 4.6 },
    ];


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
            <div className="header-section-sellers"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '20%',
                }}>
                <h1 style={{ padding: '50px' }}>Shop now</h1>

                {/* This is the container with the spotlight cards */}
                <div className="sellers-cards-spotlight" style={{ overflowY: 'auto', width: '100%' }}>
                    <h3 style={{ textAlign: 'center', margin: '0 20px 20px'}}>Featured Sellers</h3>
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
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                gap: '20px',
                            }}
                        >
                            {(showAllCards ? sellers : sellers.slice(0, 4)).map((seller, index) => (
                                <FeaturedSellerCard
                                    key={index}
                                    sellerName={seller.sellerName}
                                    sellerImage={seller.sellerImage}
                                    sellerRating={seller.sellerRating}
                                />
                            ))}
                        </div>
                    </div>
                    <Button
                        variant="text"
                        onClick={() => setShowAllCards(prev => !prev)}
                        style={{
                            margin: '20px auto',
                            display: 'block',
                        }}
                    >
                        {showAllCards ? "See less" : "See more"}
                    </Button>
                </div>
            </div>

            {/* This is where the main content goes */}
            <div className="main-section-sellers"
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

                <div className="sellers-cards" style={{ overflowY: 'auto', width: '80%' }}>
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
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                        </div>

                        <div className="cards-child-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                        </div>

                        <div className="cards-child-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={4} />
                            <SellerCard sellerImage="/images/bgplaceholder.jpeg" sellerName="Lizard" sellerDescription="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" sellerRating={3} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SellersPage;