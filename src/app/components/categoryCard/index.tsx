"use client";

import { FC } from "react";
import Box from "node_modules/@mui/material/esm/Box/Box";
import styles from "./categoryCard.module.css";


interface CategoryCardProps {
    categoryImage?: string;
    categoryName: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ categoryImage, categoryName }) => {
    return (
        <div className={styles.container}>
            <Box
                className={styles.imageBox}
                sx={{
                    backgroundImage: `url(${categoryImage})`,
                }}
            />
            <h3 className={styles.productName}>{categoryName}</h3>
        </div>
    );
};

export default CategoryCard;