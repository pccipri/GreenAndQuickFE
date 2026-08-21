"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import {
    Box,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addCartItem, clearCart, getCart, getCartSummary, removeCartItem, updateCartItemQuantity } from "@/services/cartService";
import type { Cart, CartItemPayload } from "@/interfaces/Cart";
import { notify } from "@/utils/toast";

type CartItemViewModel = CartItemPayload & {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
};

const Cart: FC = () => {
    const t = useTranslations('Cart');
    const router = useRouter();

    const [cart, setCart] = useState<Cart>({ items: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                setLoading(true);
                const data = await getCart();
                setCart(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || t('loadFailed'));
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    const cartItems = useMemo<CartItemViewModel[]>(() => {
        return (cart.items ?? []).map((item, index) => ({
            ...item,
            id: item.productId ?? `item-${index}`,
            name: item.product?.name ?? 'Product',
            category: item.product?.category ?? 'Shop item',
            price: item.priceAtAdd ?? item.product?.price ?? 0,
            image: item.product?.imageUrl ?? '/images/bgplaceholder.jpeg',
        }));
    }, [cart.items]);

    const shippingFee = 20;
    const summary = getCartSummary(cart);
    const itemsTotal = summary.totalAmount;
    const totalItems = summary.totalItems;

    const handleIncreaseQuantity = async (id: string) => {
        const item = cart.items.find((entry) => entry.productId === id);
        if (!item) return;

        const nextQuantity = (item.quantity ?? 0) + 1;
        try {
            const updated = await updateCartItemQuantity(id, nextQuantity);
            setCart(updated);
        } catch (err: any) {
            setError(err.message || t('updateQuantityFailed'));
            notify(err.message || t('updateQuantityFailed'), 'error');
        }
    };

    const handleDecreaseQuantity = async (id: string) => {
        const item = cart.items.find((entry) => entry.productId === id);
        if (!item) return;

        const nextQuantity = (item.quantity ?? 0) - 1;
        if (nextQuantity <= 0) {
            await handleRemoveItem(id);
            return;
        }

        try {
            const updated = await updateCartItemQuantity(id, nextQuantity);
            setCart(updated);
        } catch (err: any) {
            setError(err.message || t('updateQuantityFailed'));
            notify(err.message || t('updateQuantityFailed'), 'error');
        }
    };

    const handleRemoveItem = async (id: string) => {
        try {
            const updated = await removeCartItem(id);
            setCart(updated);
        } catch (err: any) {
            setError(err.message || t('removeItemFailed'));
            notify(err.message || t('removeItemFailed'), 'error');
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            setCart({ items: [] });
            notify(t('clearSuccess'), 'success');
        } catch (err: any) {
            setError(err.message || t('clearFailed'));
            notify(err.message || t('clearFailed'), 'error');
        }
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                backgroundColor: "white",
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", lg: "66.66%" },
                    px: { xs: 3, md: 5, lg: 14 },
                    pt: 5,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: "#24282C",
                        pb: 3,
                        mb: 3,
                    }}
                >
                    {t('title')}
                </Typography>

                {loading ? (
                    <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box sx={{ py: 8 }}>
                        <Typography variant="h5" sx={{ color: "#24282C", mb: 2 }}>
                            {error}
                        </Typography>
                    </Box>
                ) : cartItems.length === 0 ? (
                    <Box sx={{ py: 8 }}>
                        <Typography variant="h5" sx={{ color: "#24282C", mb: 2 }}>
                            {t('emptyCart')}
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => router.push('/products')}
                        >
                            {t('browseProducts')}
                        </Button>
                    </Box>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#999", fontWeight: 600 }}>
                                    {t('prodDetails')}
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#999", fontWeight: 600 }}>
                                    {t('prodQuantity')}
                                </TableCell>
                                <TableCell align="right" sx={{ color: "#999", fontWeight: 600 }}>
                                    {t('prodPrice')}
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                            <Box
                                                component="img"
                                                src={item.image}
                                                alt={item.name}
                                                sx={{
                                                    width: 140,
                                                    height: 140,
                                                    objectFit: "cover",
                                                    borderRadius: 2,
                                                }}
                                            />

                                            <Box
                                                sx={{
                                                    height: 140,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                        {item.name}
                                                    </Typography>

                                                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                        {item.category}
                                                    </Typography>
                                                </Box>

                                                <Button
                                                    variant="text"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    sx={{
                                                        width: "fit-content",
                                                        color: "#6a6e70",
                                                        textTransform: "none",
                                                        p: 0,
                                                    }}
                                                >
                                                    {t('removeBtn')}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell align="center" sx={{ verticalAlign: "top", pt: 3 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                sx={{ minWidth: 0, color: "#24282C" }}
                                                onClick={() => handleDecreaseQuantity(item.id)}
                                            >
                                                -
                                            </Button>

                                            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                                                {item.quantity}
                                            </Typography>

                                            <Button
                                                sx={{ minWidth: 0, color: "#24282C" }}
                                                onClick={() => handleIncreaseQuantity(item.id)}
                                            >
                                                +
                                            </Button>
                                        </Box>
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{
                                            verticalAlign: "top",
                                            pt: 3,
                                            fontSize: 18,
                                            fontWeight: 500,
                                            color: "#24282C",
                                        }}
                                    >
                                        {item.price * item.quantity} RON
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 4 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            color: "#838587",
                            fontWeight: 600,
                            textTransform: "none",
                        }}
                        onClick={() => router.push('/products')}
                    >
                        {t('shopBtn')}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleClearCart}
                        disabled={cartItems.length === 0}
                    >
                        {t('clearCart')}
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    width: { xs: "100%", lg: "33.33%" },
                    minHeight: { lg: "100vh" },
                    bgcolor: "#e7e7e7",
                    color: "black",
                    px: { xs: 4, md: 6 },
                    pt: 5,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
                    {t('summary')}
                </Typography>

                <SummaryRow label={`${totalItems} ${t('items')}`} value={`${itemsTotal} RON`} withBorder />

                <SummaryRow label={t('shippingFee')} value={`${shippingFee} RON`} />

                <SummaryRow
                    label={t('totalCost')}
                    value={`${itemsTotal + shippingFee} RON`}
                    withBorder
                />

                <Button
                    fullWidth
                    variant="contained"
                    disabled={cartItems.length === 0}
                    sx={{
                        mt: 3,
                        mb: 8,
                        py: 1.5,
                        bgcolor: "#24282c",
                        textTransform: "none",
                        borderRadius: 2,
                        "&:hover": {
                            bgcolor: "#3a3f44",
                        },
                    }}
                    onClick={handleCheckout}
                >
                    {t('checkoutBtn')}
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;

function SummaryRow({
    label,
    value,
    withBorder = false,
}: {
    label: string;
    value: string;
    withBorder?: boolean;
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: withBorder ? "2px solid #d1d5db" : "none",
                pt: withBorder ? 3 : 0,
                mb: 3,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {label}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {value}
            </Typography>
        </Box>
    );
}