"use client";

import { FC } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslations } from 'next-intl';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    color: "#000",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    leadText: string;
    explanatoryText: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
    open,
    onClose,
    onConfirm,
    leadText,
    explanatoryText,
}) => {
    const t = useTranslations('ConfirmationModal');

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {leadText}
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {explanatoryText}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        mt: 3,
                    }}
                >
                    <Button variant="outlined" onClick={onClose}>
                        {t('cancel')}
                    </Button>

                    <Button variant="contained" color="error" onClick={onConfirm}>
                        {t('confirm')}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;