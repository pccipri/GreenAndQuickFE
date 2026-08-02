"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { getProductById, getProductsByShop } from "@/services/productService";
import { Product } from "@/interfaces/Product";
import { notify } from "@/utils/toast";

const ProductPage: FC = () => {
    const t = useTranslations("ProductDetail");
    const router = useRouter();
    const params = useParams<{ id?: string | string[] }>();
    const productId = useMemo(() => {
        if (Array.isArray(params?.id)) {
            return params.id[0];
        }

        return params?.id;
    }, [params?.id]);

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProduct = async () => {
            if (!productId) {
                if (isMounted) {
                    setError(t("missingId"));
                    setLoading(false);
                }
                return;
            }

            try {
                const result = await getProductById(productId);
                if (isMounted) {
                    if (result) {
                        setProduct(result);
                        const shopId = result.shopId;
                        if (shopId) {
                            try {
                                const related = await getProductsByShop(shopId);
                                setRelatedProducts(
                                    related.items.filter(
                                        (item) => (item._id ?? item.id) !== (result._id ?? result.id)
                                    ).slice(0, 6)
                                );
                            } catch {
                                setRelatedProducts([]);
                            }
                        } else {
                            setRelatedProducts([]);
                        }
                    } else {
                        setError(t("notFound"));
                    }
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

        void loadProduct();

        return () => {
            isMounted = false;
        };
    }, [productId]);

    const productImages = product
        ? (product.imageUrls && product.imageUrls.length > 0
            ? product.imageUrls
            : product.imageUrl
                ? [product.imageUrl]
                : ["/images/bgplaceholder.jpeg"])
        : ["/images/bgplaceholder.jpeg"];

    const handleAddToCart = () => {
        if (!product) {
            return;
        }

        if (typeof window === 'undefined') {
            return;
        }

        const storedCart = window.localStorage.getItem('green_quick_cart');
        const currentCart = storedCart ? JSON.parse(storedCart) as Array<{ id: string; name: string; category: string; price: number; quantity: number; image: string }> : [];
        const nextCart = [...currentCart];
        const existingItemIndex = nextCart.findIndex((item) => item.id === (product.id || product._id));

        if (existingItemIndex >= 0) {
            nextCart[existingItemIndex] = {
                ...nextCart[existingItemIndex],
                quantity: nextCart[existingItemIndex].quantity + 1,
            };
        } else {
            nextCart.push({
                id: product.id || product._id || product.name,
                name: product.name,
                category: product.category || 'Products',
                price: Number(product.reducedPrice ?? product.price),
                quantity: 1,
                image: product.imageUrls?.[0] || product.imageUrl || '/images/bgplaceholder.jpeg',
            });
        }

        window.localStorage.setItem('green_quick_cart', JSON.stringify(nextCart));
        notify(t('addToCartSuccess'), 'success');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button variant="text" onClick={() => router.push("/products")} sx={{ mb: 3 }}>
                {t("backToProducts")}
            </Button>

            {loading ? (
                <Box display="flex" justifyContent="center" py={6}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : product ? (
                <Stack spacing={4}>
                    <Paper sx={{ p: { xs: 2, md: 4 } }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    component="img"
                                    src={productImages[Math.min(selectedImage, productImages.length - 1)]}
                                    alt={product.name}
                                    sx={{ width: "100%", maxHeight: 430, objectFit: "cover", borderRadius: 2 }}
                                />
                                {productImages.length > 1 ? (
                                    <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: "auto", pb: 0.5 }}>
                                        {productImages.map((image, index) => (
                                            <Box
                                                key={`${image}-${index}`}
                                                component="button"
                                                type="button"
                                                onClick={() => setSelectedImage(index)}
                                                sx={{
                                                    p: 0,
                                                    border: "none",
                                                    bgcolor: "transparent",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={image}
                                                    alt={`${product.name} ${index + 1}`}
                                                    sx={{
                                                        width: 72,
                                                        height: 72,
                                                        objectFit: "cover",
                                                        borderRadius: 1,
                                                        border: "2px solid",
                                                        borderColor: index === selectedImage ? "primary.main" : "divider",
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                    </Stack>
                                ) : null}
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Stack spacing={2}>
                                    <Typography variant="overline" color="primary">{t("kicker")}</Typography>
                                    <Typography variant="h4" fontWeight={700}>{product.name}</Typography>
                                    <Typography variant="body1" color="text.secondary">{product.description}</Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {product.category ? <Chip label={product.category} /> : null}
                                        {product.shop ? <Chip label={product.shop} variant="outlined" /> : null}
                                        {product.isAvailable === false ? <Chip label={t("outOfStock")} color="warning" /> : <Chip label={t("inStock")} color="success" />}
                                    </Stack>
                                    <Typography variant="h4" fontWeight={700}>
                                        {product.reducedPrice && product.reducedPrice < product.price ? `${product.reducedPrice} RON` : `${product.price} RON`}
                                    </Typography>
                                    {product.reducedPrice && product.reducedPrice < product.price ? (
                                        <Typography variant="body2" color="text.secondary">
                                            {t("regularPrice")}: {product.price} RON
                                        </Typography>
                                    ) : null}
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                        <Button variant="contained" size="large" onClick={handleAddToCart}>{t("addToCart")}</Button>
                                        <Button variant="outlined" size="large" onClick={() => router.push("/shops")}>{t("browseShops")}</Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: { xs: 2, md: 4 } }}>
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                            {t("detailsTitle")}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Stack spacing={1.5}>
                            <Typography variant="body1"><strong>{t("shop")}:</strong> {product.shop || t("unknownShop")}</Typography>
                            <Typography variant="body1"><strong>{t("category")}:</strong> {product.category || t("uncategorized")}</Typography>
                            <Typography variant="body1"><strong>{t("price")}:</strong> {product.price} RON</Typography>
                            {product.reducedPrice ? <Typography variant="body1"><strong>{t("reducedPrice")}:</strong> {product.reducedPrice} RON</Typography> : null}
                            <Typography variant="body1"><strong>{t("stock")}:</strong> {product.stock ?? t("notSpecified")}</Typography>
                            <Typography variant="body1"><strong>{t("availability")}:</strong> {product.isAvailable === false ? t("unavailable") : t("available")}</Typography>
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: { xs: 2, md: 4 } }}>
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                            {t("moreFromShop")}
                        </Typography>

                        {relatedProducts.length === 0 ? (
                            <Typography color="text.secondary">{t("noMoreFromShop")}</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {relatedProducts.map((relatedProduct) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={relatedProduct._id || relatedProduct.id || relatedProduct.name}>
                                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={relatedProduct.imageUrls?.[0] || relatedProduct.imageUrl || "/images/bgplaceholder.jpeg"}
                                                alt={relatedProduct.name}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" gutterBottom>{relatedProduct.name}</Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                                    {relatedProduct.description}
                                                </Typography>
                                                <Typography variant="subtitle1" fontWeight={700}>
                                                    {relatedProduct.price} RON
                                                </Typography>
                                                <Button
                                                    sx={{ mt: 2 }}
                                                    fullWidth
                                                    variant="outlined"
                                                    onClick={() => router.push(`/products/${relatedProduct.id || relatedProduct._id}`)}
                                                >
                                                    {t("viewProduct")}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Paper>
                </Stack>
            ) : null}
        </Container>
    );
};

export default ProductPage;
