import { FC } from "react";

import { Box, Card, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import { useTranslations } from 'next-intl';

type CreditCardProps = {
    type: string;
    number: string;
    name: string;
    expiry: string;
    cvc: string;
};

const CreditCard: FC<CreditCardProps> = ({
    type,
    number,
    name,
    expiry,
    cvc,
}) => {
    const t = useTranslations('CreditCard');

    return (
        <Card
            sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 3,
                boxShadow: 4,
                p: 2,
                mb: 4,
                width: 415,
                height: 215,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <CreditCardIcon fontSize="large" />
                <Typography variant="subtitle1">{type}</Typography>
            </Box>

            <Typography variant="h5" sx={{ letterSpacing: 3, mb: 1 }}>
                {number || "•••• •••• •••• ••••"}
            </Typography>

            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography variant="caption" display="block">
                        {t('cardHolder')}
                    </Typography>

                    <Typography variant="body2">
                        {name || t('fullName')}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="caption" display="block">
                        {t('expiration')}
                    </Typography>

                    <Typography variant="body2">
                        {expiry || "MM/YY"}
                    </Typography>

                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        CVC
                    </Typography>

                    <Typography variant="body2">
                        {cvc || "***"}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default CreditCard;