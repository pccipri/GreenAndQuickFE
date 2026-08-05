"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import StatBox from "@/app/components/statbox";
import { useAuth } from "@/contexts/AuthProvider";
import { getProducts } from "@/services/productService";
import { getShopByOwner, getShops } from "@/services/shopService";

import CategoryIcon from "@mui/icons-material/Category";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StoreIcon from "@mui/icons-material/Store";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const Dashboard: FC = () => {
    const t = useTranslations("Dashboard");
    const { user } = useAuth();
    const router = useRouter();
    const [productCount, setProductCount] = useState("0");
    const [shopCount, setShopCount] = useState("0");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ownerShop, setOwnerShop] = useState<{ name?: string; _id?: string; id?: string } | null>(null);
    const [ownerActionsLoading, setOwnerActionsLoading] = useState(false);

    const displayName = useMemo(() => {
        if (!user) {
            return t("fallbackName");
        }

        return user.firstName || user.username || t("fallbackName");
    }, [t, user]);

    useEffect(() => {
        let active = true;

        const loadSummary = async () => {
            try {
                const [productsResponse, shopsResponse] = await Promise.all([
                    getProducts({ limit: 1, page: 1 }),
                    getShops({ limit: 1, page: 1 }),
                ]);

                if (active) {
                    setProductCount(String(productsResponse.total || productsResponse.items.length));
                    setShopCount(String(shopsResponse.total || shopsResponse.items.length));
                }
            } catch (err: any) {
                if (active) {
                    setError(err.message || t("summaryError"));
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        void loadSummary();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (!user || (user.role !== "shopOwner" && user.role !== "admin") || !user.id) {
            setOwnerShop(null);
            setOwnerActionsLoading(false);
            return;
        }

        let active = true;
        setOwnerActionsLoading(true);

        const loadOwnerShop = async () => {
            try {
                const shop = await getShopByOwner(user.id);
                if (active) {
                    setOwnerShop(shop ?? null);
                }
            } catch {
                if (active) {
                    setOwnerShop(null);
                }
            } finally {
                if (active) {
                    setOwnerActionsLoading(false);
                }
            }
        };

        void loadOwnerShop();

        return () => {
            active = false;
        };
    }, [user]);

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
                    mb: 2,
                    fontWeight: 700,
                    color: "#111827",
                }}
            >
                {t("welcome", { name: displayName })}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {t("subtitle")}
            </Typography>

            {user?.role === "shopOwner" ? (
                <Card sx={{ mb: 4, border: "1px solid #e5e7eb" }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            {t("ownerWorkspaceTitle")}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            {ownerActionsLoading
                                ? t("ownerWorkspaceChecking")
                                : ownerShop
                                    ? t("ownerWorkspaceManaging", { name: ownerShop.name || t("ownerWorkspaceFallbackShop") })
                                    : t("ownerWorkspaceNoShop")}
                        </Typography>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            {ownerShop ? (
                                <>
                                    <Button variant="contained" onClick={() => router.push("/dashboard/shop/edit")}>{t("editShop")}</Button>
                                    <Button variant="outlined" onClick={() => router.push("/dashboard/products")}>{t("manageProducts")}</Button>
                                    <Button variant="outlined" onClick={() => router.push("/dashboard/products/create")}>{t("addProduct")}</Button>
                                </>
                            ) : (
                                <Button variant="contained" onClick={() => router.push("/dashboard/shop/create")}>{t("createShop")}</Button>
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            ) : null}

            {error ? (
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            ) : null}

            {loading ? (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            ) : null}

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
                    title={t("cards.categories")}
                    value="—"
                    icon={CategoryIcon}
                    link="/admin/categories"
                />
                <StatBox
                    title={t("cards.orders")}
                    value="—"
                    icon={ContentPasteGoIcon}
                    link="/dashboard/orders"
                />
                <StatBox
                    title={t("cards.products")}
                    value={productCount}
                    icon={FastfoodIcon}
                    link="/dashboard/products"
                />
                <StatBox
                    title={t("cards.recipes")}
                    value="—"
                    icon={MenuBookIcon}
                    link="/dashboard/recipes"
                />
                <StatBox
                    title={t("cards.reviews")}
                    value="—"
                    icon={RateReviewIcon}
                    link="/dashboard/reviews"
                />
                <StatBox
                    title={t("cards.shops")}
                    value={shopCount}
                    icon={StoreIcon}
                    link="/dashboard/shop/edit"
                />
                <StatBox
                    title={t("cards.subscriptions")}
                    value="—"
                    icon={LoyaltyIcon}
                    link="/dashboard/subscriptions"
                />
                <StatBox
                    title={t("cards.users")}
                    value="—"
                    icon={PeopleAltIcon}
                    link="/dashboard/users"
                />
            </Box>
        </Box>
    );
};

export default Dashboard;