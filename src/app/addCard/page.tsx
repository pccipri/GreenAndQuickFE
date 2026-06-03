"use client";

import { ChangeEvent, FC, useState } from "react";

import { useTranslations } from 'next-intl';

import {
    Box,
    Card,
    TextField,
    Grid,
    Typography,
    InputAdornment,
    Button
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from '@mui/icons-material/Person';

import CreditCard from "../components/card";
import { CreditCardState } from "../../interfaces/CreditCardState";

const AddCard: FC = () => {
    const t = useTranslations('AddCard');

    const [state, setState] = useState<CreditCardState>({
        type: "Visa",
        number: "",
        name: "",
        expiry: "",
        cvc: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CreditCard
                type={state.type}
                number={state.number}
                name={state.name}
                expiry={state.expiry}
                cvc={state.cvc}
            />

            <Card sx={{ p: 3, boxShadow: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {t('paymentDetails')}
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            select
                            fullWidth
                            label={t('cardType')}
                            name="type"
                            value={state.type}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Visa">Visa</MenuItem>
                            <MenuItem value="MasterCard">MasterCard</MenuItem>
                            <MenuItem value="PayPal">PayPal</MenuItem>
                        </TextField>
                    </Grid>


                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label={t('cardNumber')}
                            name="number"
                            value={state.number}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 19,
                                },
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CreditCardIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label={t('cardHolder')}
                            name="name"
                            value={state.name}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 50,
                                },
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label={t('expiration')}
                            name="expiry"
                            value={state.expiry}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 5,
                                },
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EventIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="CVC"
                            name="cvc"
                            value={state.cvc}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 3,
                                },
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Card>

            <Button variant="contained" type="submit" sx={{ mt: 5 }}>
                {t('saveCard')}
            </Button>
        </Box>
    );
};

export default AddCard;