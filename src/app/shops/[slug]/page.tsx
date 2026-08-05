"use client";

import { Alert, Avatar, Box, Button, Card, CardContent, CircularProgress, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getShopBySlug } from "@/services/shopService";
import { getProductsByShop } from "@/services/productService";
import { Shop } from "@/interfaces/Shop";
import { Product } from "@/interfaces/Product";

const ShopPage: FC = () => {
    const t = useTranslations("ShopDetail");
    const router = useRouter();
    const params = useParams<{ slug?: string | string[] }>();
    const slug = useMemo(() => {
        if (Array.isArray(params?.slug)) {
            return params.slug[0];
        }

        return params?.slug;
    }, [params?.slug]);

    const [shop, setShop] = useState<Shop | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadShop = async () => {
            if (!slug) {
                if (isMounted) {
                    setError(t("missingSlug"));
                    setLoading(false);
                }
                return;
            }

            try {
                const shopResponse = await getShopBySlug(slug);

                if (!shopResponse) {
                    if (isMounted) {
                        setError(t("notFound"));
                    }
                    return;
                }

                const shopId = shopResponse._id ?? shopResponse.id ?? shopResponse.slug;
                const productsResponse = shopId
                    ? await getProductsByShop(shopId)
                    : { items: [] };

                if (isMounted) {
                    setShop(shopResponse);
                    setProducts(productsResponse.items);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || t("error"));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void loadShop();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button variant="text" onClick={() => router.push("/shops")} sx={{ mb: 3 }}>
                {t("backToShops")}
            </Button>

            {loading ? (
                <Box display="flex" justifyContent="center" py={6}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : shop ? (
                <Stack spacing={4}>
                    <Paper sx={{ overflow: "hidden" }}>
                        <Box
                            component="img"
                            src={shop.coverImageUrl || shop.coverImage || "/images/bgplaceholder.jpeg"}
                            alt={shop.name}
                            sx={{ width: "100%", height: { xs: 180, md: 260 }, objectFit: "cover" }}
                        />
                        <Stack spacing={2} sx={{ p: { xs: 2, md: 4 } }}>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
                                <Avatar
                                    src={shop.logoUrl || shop.logo || undefined}
                                    alt={shop.name}
                                    sx={{ width: 72, height: 72, border: "2px solid", borderColor: "background.paper", boxShadow: 1 }}
                                >
                                    {shop.name?.slice(0, 1)}
                                </Avatar>
                                <Box>
                                    <Typography variant="overline" color="primary">{t("kicker")}</Typography>
                                    <Typography variant="h4" fontWeight={700}>{shop.name}</Typography>
                                </Box>
                            </Stack>
                            <Typography variant="body1" color="text.secondary">
                                {shop.description || t("fallbackDescription")}
                            </Typography>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap">
                                {shop.location?.city ? <Typography><strong>{t("city")}:</strong> {shop.location.city}</Typography> : null}
                                {shop.location?.country ? <Typography><strong>{t("country")}:</strong> {shop.location.country}</Typography> : null}
                                {shop.location?.street ? <Typography><strong>{t("street")}:</strong> {shop.location.street}</Typography> : null}
                                {shop.ownerName ? <Typography><strong>{t("owner")}:</strong> {shop.ownerName}</Typography> : null}
                            </Stack>
                        </Stack>
                    </Paper>

                    <Box>
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                            {t("productsTitle")}
                        </Typography>
                        {products.length === 0 ? (
                            <Paper sx={{ p: 4, textAlign: "center" }}>
                                <Typography color="text.secondary">{t("emptyProducts")}</Typography>
                            </Paper>
                        ) : (
                            <Grid container spacing={3}>
                                {products.map((product) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id || product._id || product.name}>
                                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" fontWeight={700}>{product.name}</Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                                                    {product.description}
                                                </Typography>
                                                <Typography variant="subtitle1" fontWeight={700}>{product.price} RON</Typography>
                                            </CardContent>
                                            <Box sx={{ p: 2 }}>
                                                <Button fullWidth variant="contained" onClick={() => router.push(`/products/${product.id || product._id}`)}>
                                                    {t("viewProduct")}
                                                </Button>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Stack>
            ) : null}
        </Container>
    );
};

export default ShopPage;