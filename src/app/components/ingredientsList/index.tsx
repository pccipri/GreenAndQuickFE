"use client"

import { FC } from "react";

interface IngredientsListProps {
    ingredient: string;
}

const IngredientsList: FC<IngredientsListProps> = ({ ingredient }) => {
    return (
        <li>{ingredient}</li>
    );
};

export default IngredientsList;