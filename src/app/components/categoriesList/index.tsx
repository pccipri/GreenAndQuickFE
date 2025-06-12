"use client"

import { FC, ReactNode } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


interface CategoriesListProps {
    categoryName: string;
    icon?: ReactNode;
}

const CategoriesList: FC<CategoriesListProps> = ({ categoryName, icon }) => {
    return (
        <ListItemButton>
            {icon && (
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
            )}
            <ListItemText primary={categoryName} />
        </ListItemButton>
    );
};

export default CategoriesList;