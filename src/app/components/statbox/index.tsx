"use client"

import NextLink from "next/link";
import { FC, ElementType } from "react";
import { Box, Card, Typography, Link as MuiLink } from "@mui/material";

interface StatBoxProps {
    title: string;
    value: string;
    icon: ElementType;
    link: string;
}

const StatBox: FC<StatBoxProps> = ({ title, value, icon: IconComponent, link }) => {
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

export default StatBox;