"use client";

import { FC } from "react";
import { Box, Typography } from "@mui/material";

import StatBox from "@/app/components/statbox";

import CategoryIcon from "@mui/icons-material/Category";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StoreIcon from "@mui/icons-material/Store";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const Dashboard: FC = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f3f4f6",
                p: 5,
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    mb: 5,
                    fontWeight: 700,
                    color: "#111827",
                }}
            >
                Welcome back, User!
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    },
                    gap: 3,
                }}
            >
                <StatBox
                    title="Categories"
                    value="100"
                    icon={CategoryIcon}
                    link="/dashboard/categories"
                />
                <StatBox
                    title="Orders"
                    value="100"
                    icon={ContentPasteGoIcon}
                    link="/dashboard/orders"
                />
                <StatBox
                    title="Products"
                    value="100"
                    icon={FastfoodIcon}
                    link="/dashboard/products"
                />
                <StatBox
                    title="Recipes"
                    value="100"
                    icon={MenuBookIcon}
                    link="/dashboard/recipes"
                />
                <StatBox
                    title="Reviews"
                    value="100"
                    icon={RateReviewIcon}
                    link="/dashboard/reviews"
                />
                <StatBox
                    title="Shops"
                    value="100"
                    icon={StoreIcon}
                    link="/dashboard/shops"
                />
                <StatBox
                    title="Subscriptions"
                    value="100"
                    icon={LoyaltyIcon}
                    link="/dashboard/subscriptions"
                />
                <StatBox
                    title="Users"
                    value="100"
                    icon={PeopleAltIcon}
                    link="/dashboard/users"
                />
            </Box>
        </Box>
    );
};

export default Dashboard;