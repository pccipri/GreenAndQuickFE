"use client";

import { FC } from "react";
import Box from "node_modules/@mui/material/esm/Box/Box";
import styles from "./categoryCard.module.css";


interface CategoryCardProps {
    productImage?: string;
    productName: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ productImage, productName }) => {
    return (
        <div className={styles.container}>
            <Box
                className={styles.imageBox}
                sx={{
                    backgroundImage: `url(${productImage})`,
                }}
            />
            <h3 className={styles.productName}>{productName}</h3>
        </div>
    );
};

export default CategoryCard;