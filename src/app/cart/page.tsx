"use client";

import { FC, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type CartItem = {
    id: number | string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    image: string;
};

const getInitialCartItems = (): CartItem[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const stored = window.localStorage.getItem('green_quick_cart');
        return stored ? JSON.parse(stored) as CartItem[] : [];
    } catch {
        return [];
    }
};

const Cart: FC = () => {
    const t = useTranslations('Cart');

    const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCartItems);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('green_quick_cart', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const shippingFee = 20;

    const itemsTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const handleIncreaseQuantity = (id: number | string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecreaseQuantity = (id: number | string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemoveItem = (id: number | string) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );
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

                {cartItems.length === 0 ? (
                    <Box sx={{ py: 8 }}>
                        <Typography variant="h5" sx={{ color: "#24282C", mb: 2 }}>
                            {t('emptyCart')}
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => (window.location.href = "/shopPage")}
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

                <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        mt: 3,
                        mb: 4,
                        color: "#838587",
                        fontWeight: 600,
                        textTransform: "none",
                    }}
                    onClick={() => (window.location.href = "/shopPage")}
                >
                    {t('shopBtn')}
                </Button>
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
                    onClick={() => (window.location.href = "/checkout")}
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