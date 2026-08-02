"use client";

import { Alert, Box, Button, Card, CardContent, CardMedia, Checkbox, CircularProgress, Container, FormControlLabel, Grid, MenuItem, Pagination, Paper, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getProducts } from "@/services/productService";
import { Product } from "@/interfaces/Product";
import { getCategories } from "@/services/categoryService";
import { Category } from "@/interfaces/Category";

const ProductBrowsePage: FC = () => {
    const t = useTranslations("ProductsBrowse");
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [availableOnly, setAvailableOnly] = useState(false);
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

        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getProducts({
                    search: searchTerm || undefined,
                    category: selectedCategory || undefined,
                    minPrice: minPrice ? Number(minPrice) : undefined,
                    maxPrice: maxPrice ? Number(maxPrice) : undefined,
                    available: availableOnly || undefined,
                    sort,
                    limit: 12,
                    page,
                });
                if (active) {
                    setProducts(result.items);
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

        void loadProducts();

        return () => {
            active = false;
        };
    }, [searchTerm, selectedCategory, minPrice, maxPrice, availableOnly, sort, page]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>{t("title")}</Typography>
                    <Typography variant="body1" color="text.secondary">{t("subtitle")}</Typography>
                    {products.length > 0 && !loading ? (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {t("resultsCount", { count: products.length })}
                        </Typography>
                    ) : null}
                </Box>

                <Paper sx={{ p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
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
                        <Grid size={{ xs: 12, md: 3 }}>
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
                        <Grid size={{ xs: 12, md: 3 }}>
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
                                <MenuItem value="price_asc">{t("sortOptions.priceAsc")}</MenuItem>
                                <MenuItem value="price_desc">{t("sortOptions.priceDesc")}</MenuItem>
                                <MenuItem value="popular">{t("sortOptions.popular")}</MenuItem>
                                <MenuItem value="rating">{t("sortOptions.rating")}</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                label={t("minPrice")}
                                type="number"
                                slotProps={{ htmlInput: { min: 0 } }}
                                value={minPrice}
                                onChange={(event) => {
                                    setPage(1);
                                    setMinPrice(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                label={t("maxPrice")}
                                type="number"
                                slotProps={{ htmlInput: { min: 0 } }}
                                value={maxPrice}
                                onChange={(event) => {
                                    setPage(1);
                                    setMaxPrice(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={availableOnly}
                                        onChange={(event) => {
                                            setPage(1);
                                            setAvailableOnly(event.target.checked);
                                        }}
                                    />
                                }
                                label={t("availableOnly")}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {loading ? (
                    <Box display="flex" justifyContent="center" py={6}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : products.length === 0 ? (
                    <Paper sx={{ p: 6, textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>{t("emptyTitle")}</Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>{t("emptyMessage")}</Typography>
                        <Button variant="outlined" onClick={() => {
                            setPage(1);
                            setSearchTerm("");
                            setSelectedCategory("");
                            setMinPrice("");
                            setMaxPrice("");
                            setAvailableOnly(false);
                            setSort("newest");
                        }}>
                            {t("clearFilters")}
                        </Button>
                    </Paper>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {products.map((product) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id || product._id || product.name}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image={product.imageUrls?.[0] || product.imageUrl || '/images/bgplaceholder.jpeg'}
                                            alt={product.name}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" gutterBottom>{product.name}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                {product.description}
                                            </Typography>
                                            <Typography variant="subtitle1" fontWeight={700}>
                                                {product.reducedPrice && product.reducedPrice < product.price ? (
                                                    <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                                        <Typography component="span" variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                            {Number(product.price).toFixed(2)} RON
                                                        </Typography>
                                                        <Typography component="span" color="success.main">
                                                            {Number(product.reducedPrice).toFixed(2)} RON
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    `${Number(product.price).toFixed(2)} RON`
                                                )}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ p: 2 }}>
                                            <Button fullWidth variant="contained" onClick={() => router.push(`/products/${product.id || product._id}`)}>
                                                {t("viewDetails")}
                                            </Button>
                                        </Box>
                                    </Card>
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

export default ProductBrowsePage;
