"use client";

import NextLink from "next/link";
import { FC, ElementType } from "react";
import { Box, Card, Typography, Link as MuiLink } from "@mui/material";

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

const StatBox = ({
    title,
    value,
    icon: IconComponent,
    link,
}: {
    title: string;
    value: string;
    icon: ElementType;
    link: string;
}) => {
    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 3,
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 600, color: "#1f2937" }}
                    >
                        {value}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ color: "#4b5563" }}
                    >
                        {title}
                    </Typography>
                </Box>

                <IconComponent sx={{ fontSize: 40, color: "#1f2937" }} />
            </Box>

            <MuiLink
                component={NextLink}
                href={link}
                underline="none"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 3,
                    py: 2,
                    bgcolor: "#e5e7eb",
                    color: "#111827",
                    fontSize: "1rem",
                    fontWeight: 500,
                    transition: "0.2s",
                    "&:hover": {
                        bgcolor: "#d1d5db",
                    },
                }}
            >
                <span>More details</span>
                <span>&#8594;</span>
            </MuiLink>
        </Card>
    );
};

export default Dashboard;