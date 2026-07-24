"use client"

import Link from "next/link";
import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTranslations } from 'next-intl';

export type CrudColumn<T> = {
    key: string;
    label: string;
    render: (item: T) => React.ReactNode;
};

type CrudTableProps<T> = {
    title: string;
    addHref: string;
    addButtonLabel?: string;

    data: T[];
    columns: CrudColumn<T>[];

    getId: (item: T) => string;
    getTitle: (item: T) => string;

    emptyMessage?: string;

    deleteTitle?: string;
    deleteMessage?: string;

    onEdit: (id: string) => void;
    onDeleteConfirm: (id: string) => void;

    renderActions?: (item: T) => React.ReactNode;
};

const CrudTable = <T,>({
    title,
    addHref,
    addButtonLabel,
    data,
    columns,
    getId,
    getTitle,
    emptyMessage,
    deleteTitle,
    deleteMessage,
    onEdit,
    onDeleteConfirm,
    renderActions,
}: CrudTableProps<T>) => {
    const t = useTranslations("CrudTable");

    const finalAddButtonLabel = addButtonLabel ?? t("addNew");
    const finalEmptyMessage = emptyMessage ?? t("emptyMessage");
    const finalDeleteTitle = deleteTitle ?? t("deleteTitle");
    const finalDeleteMessage = deleteMessage ?? t("deleteMessage");

    const [itemToDelete, setItemToDelete] = useState<string>("");

    const handleDeleteConfirm = () => {
        onDeleteConfirm(itemToDelete);
        setItemToDelete("");
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    px: { xs: 2, md: 5 },
                    py: 5,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            color: "#24282C",
                        }}
                    >
                        {title}
                    </Typography>

                    <Button
                        component={Link}
                        href={addHref}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            textTransform: "none",
                            borderRadius: "12px",
                            px: 3,
                            py: 1.2,
                            backgroundColor: "#24282C",
                            "&:hover": {
                                backgroundColor: "#1b1e21",
                            },
                        }}
                    >
                        {finalAddButtonLabel}
                    </Button>
                </Box>

                <TableContainer
                    component={Paper}
                    elevation={2}
                    sx={{
                        display: { xs: "none", md: "block" },
                        borderRadius: "16px",
                        overflow: "hidden",
                        backgroundColor: "#F5F5F5",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    "& th": {
                                        borderBottom: "2px solid #E5E7EB",
                                        color: "#999999",
                                        fontWeight: 500,
                                        fontSize: "1.15rem",
                                        whiteSpace: "nowrap",
                                    },
                                }}
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.key}>{column.label}</TableCell>
                                ))}
                                <TableCell align="right">{t("actions")}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((item) => {
                                const id = getId(item);

                                return (
                                    <TableRow
                                        key={id}
                                        sx={{
                                            "& td": {
                                                borderBottom: "1px solid #ECECEC",
                                                color: "#24282C",
                                                fontSize: "1rem",
                                            },
                                        }}
                                    >
                                        {columns.map((column) => (
                                            <TableCell key={column.key}>
                                                {column.render(item)}
                                            </TableCell>
                                        ))}

                                        <TableCell align="right">
                                            {renderActions ? (
                                                renderActions(item)
                                            ) : (
                                                <>
                                                    <IconButton
                                                        onClick={() => onEdit(id)}
                                                        aria-label={`Edit ${getTitle(item)}`}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        onClick={() => setItemToDelete(id)}
                                                        aria-label={`Delete ${getTitle(item)}`}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} align="center">
                                        <Typography sx={{ py: 3, color: "#666" }}>
                                            {finalEmptyMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    sx={{
                        display: { xs: "grid", md: "none" },
                        gridTemplateColumns: "1fr",
                        gap: 2,
                    }}
                >
                    {data.map((item) => {
                        const id = getId(item);

                        return (
                            <Card
                                key={id}
                                elevation={2}
                                sx={{
                                    borderRadius: "12px",
                                    backgroundColor: "#F5F5F5",
                                    color: "#24282C",
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            justifyContent: "space-between",
                                            mb: 2,
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {getTitle(item)}
                                        </Typography>

                                        <Box>
                                            {renderActions ? (
                                                renderActions(item)
                                            ) : (
                                                <>
                                                    <IconButton
                                                        onClick={() => onEdit(id)}
                                                        aria-label={`Edit ${getTitle(item)}`}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        onClick={() => setItemToDelete(id)}
                                                        aria-label={`Delete ${getTitle(item)}`}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            )}
                                        </Box>
                                    </Box>

                                    <Stack spacing={1}>
                                        {columns.map((column) => (
                                            <Box
                                                key={column.key}
                                                sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                                            >
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    {column.label}:
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    {column.render(item)}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        );
                    })}

                    {data.length === 0 && (
                        <Typography align="center" sx={{ color: "#666", py: 3 }}>
                            {finalEmptyMessage}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Dialog open={Boolean(itemToDelete)} onClose={() => setItemToDelete("")}>
                <DialogTitle>{finalDeleteTitle}</DialogTitle>

                <DialogContent>
                    <DialogContentText>{finalDeleteMessage}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setItemToDelete("")}>{t("cancel")}</Button>
                    <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
                        {t("delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CrudTable;