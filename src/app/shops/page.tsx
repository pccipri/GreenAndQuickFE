"use client";

import { Alert, Box, Button, CircularProgress, Container, Grid, MenuItem, Pagination, Paper, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import ShopCard from "../components/shopCard";
import { getShops } from "@/services/shopService";
import { Shop } from "@/interfaces/Shop";
import { getCategories } from "@/services/categoryService";
import { Category } from "@/interfaces/Category";

const ShopsPage: FC = () => {
    const t = useTranslations("ShopsBrowse");
    const [shops, setShops] = useState<Shop[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        const loadCategories = async () => {
            const data = await getCategories();
            if (active) {
                setCategories(data);
            }
        };

        void loadCategories();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        let active = true;

        const loadShops = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getShops({
                    search: searchTerm || undefined,
                    category: selectedCategory || undefined,
                    sort,
                    limit: 12,
                    page,
                });
                if (active) {
                    setShops(result.items);
                    setTotalPages(result.pages || 1);
                }
            } catch (err: any) {
                if (active) {
                    setError(err.message || t("error"));
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        void loadShops();

        return () => {
            active = false;
        };
    }, [searchTerm, selectedCategory, sort, page]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>{t("title")}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {t("subtitle")}
                    </Typography>
                    {shops.length > 0 && !loading ? (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {t("resultsCount", { count: shops.length })}
                        </Typography>
                    ) : null}
                </Box>

                <Paper sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                label={t("search")}
                                value={searchTerm}
                                onChange={(event) => {
                                    setPage(1);
                                    setSearchTerm(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                select
                                label={t("category")}
                                value={selectedCategory}
                                onChange={(event) => {
                                    setPage(1);
                                    setSelectedCategory(event.target.value);
                                }}
                            >
                                <MenuItem value="">{t("allCategories")}</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                select
                                label={t("sort")}
                                value={sort}
                                onChange={(event) => {
                                    setPage(1);
                                    setSort(event.target.value);
                                }}
                            >
                                <MenuItem value="newest">{t("sortOptions.newest")}</MenuItem>
                                <MenuItem value="popular">{t("sortOptions.popular")}</MenuItem>
                                <MenuItem value="rating">{t("sortOptions.rating")}</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Paper>

                {loading ? (
                    <Box display="flex" justifyContent="center" py={6}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : shops.length === 0 ? (
                    <Paper sx={{ p: 6, textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>{t("emptyTitle")}</Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>{t("emptyMessage")}</Typography>
                        <Button variant="outlined" onClick={() => {
                            setPage(1);
                            setSearchTerm("");
                            setSelectedCategory("");
                            setSort("newest");
                        }}>
                            {t("clearFilters")}
                        </Button>
                    </Paper>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {shops.map((shop) => (
                                <Grid key={shop._id || shop.id || shop.name} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <ShopCard shop={shop} />
                                </Grid>
                            ))}
                        </Grid>
                        <Box display="flex" justifyContent="center" pt={1}>
                            <Pagination
                                count={Math.max(totalPages, 1)}
                                page={page}
                                onChange={(_, nextPage) => setPage(nextPage)}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Stack>
        </Container>
    );
};

export default ShopsPage;