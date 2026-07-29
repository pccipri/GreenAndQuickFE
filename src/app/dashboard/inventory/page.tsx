"use client";

import { FC, useState, ChangeEvent } from "react";

import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useTranslations } from "next-intl";

import { InventoryItemCol, InventoryItemData } from "@/interfaces/UI";

import styles from "./page.module.css";


type AvailabilityStatus = "Available" | "Unavailable" | "Out of Stock";
type AvailabilityFilter = "All" | AvailabilityStatus;

type StockSortOrder = "High" | "Low";

// placeholder value - replace with value from backend/settings
const LOW_STOCK_THRESHOLD = 10;

const columns: readonly InventoryItemCol[] = [
    { id: "id", label: "tableColumns.id", minWidth: 50 },
    { id: "name", label: "tableColumns.name", minWidth: 100 },
    { id: "image", label: "tableColumns.image", minWidth: 100 },
    { id: "category", label: "tableColumns.category", minWidth: 100 },
    { id: "stock", label: "tableColumns.stock", minWidth: 100 },
    { id: "available", label: "tableColumns.available", minWidth: 100 },
];

function createData(
    id: number,
    name: string,
    image: string,
    category: string,
    stock: number,
    available: AvailabilityStatus
): InventoryItemData {
    return {
        id,
        name,
        image,
        category,
        stock,
        available,
    };
}

const initialRows: InventoryItemData[] = [
    createData(1, "Product A", "/images/bgplaceholder.jpeg", "Category 1", 100, "Available"),
    createData(2, "Product B", "/images/bgplaceholder.jpeg", "Category 2", 5, "Unavailable"),
    createData(3, "Product C", "/images/bgplaceholder.jpeg", "Category 1", 7, "Available"),
    createData(4, "Product D", "/images/bgplaceholder.jpeg", "Category 3", 0, "Out of Stock"),
    createData(5, "Product E", "/images/bgplaceholder.jpeg", "Category 2", 150, "Available"),
];

const InventoryDashboard: FC = () => {
    const t = useTranslations("InventoryDashboard");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<InventoryItemData[]>(initialRows);

    const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>("All");

    const [stockSortOrder, setStockSortOrder] = useState<StockSortOrder>("Low");

    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editedStock, setEditedStock] = useState<number | "">("");

    const handleChangePage = (
        _event: unknown,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(
            Number(event.target.value)
        );

        setPage(0);
    };

    const handleAvailabilityFilterChange = (
        event: SelectChangeEvent<AvailabilityFilter>
    ) => {
        setAvailabilityFilter(
            event.target
                .value as AvailabilityFilter
        );

        setPage(0);
    };

    const handleStockSort = () => {
        setStockSortOrder(
            (previousOrder) =>
                previousOrder === "Low"
                    ? "High"
                    : "Low"
        );

        setPage(0);
    };

    const handleStartStockEdit = (
        row: InventoryItemData
    ) => {
        setEditingRowId(row.id);
        setEditedStock(row.stock);
    };

    const handleCancelStockEdit = () => {
        setEditingRowId(null);
        setEditedStock("");
    };

    const handleSaveStock = (rowId: number) => {
        if (editedStock === "" || editedStock < 0) {
            return;
        }

        setRows((previousRows) =>
            previousRows.map((row) => {
                if (row.id !== rowId) {
                    return row;
                }

                let updatedAvailability = row.available;

                if (editedStock === 0) {
                    updatedAvailability = "Out of Stock";
                } else if (row.available === "Out of Stock") {
                    updatedAvailability = "Available";
                }

                return {
                    ...row,
                    stock: editedStock,
                    available: updatedAvailability,
                };
            })
        );

        setEditingRowId(null);
        setEditedStock("");
    };

    const filteredRows =
        availabilityFilter === "All"
            ? rows
            : rows.filter(
                (row) =>
                    row.available ===
                    availabilityFilter
            );

    const sortedRows = [
        ...filteredRows,
    ].sort((a, b) => {
        if (
            stockSortOrder === "Low"
        ) {
            return (
                a.stock - b.stock
            );
        }

        return b.stock - a.stock;
    });

    const getAvailabilityChip = (
        availability: AvailabilityStatus
    ) => {
        switch (availability) {
            case "Available":
                return (
                    <Chip
                        label={t(
                            "available.available"
                        )}
                        color="success"
                        size="small"
                    />
                );

            case "Unavailable":
                return (
                    <Chip
                        label={t(
                            "available.unavailable"
                        )}
                        color="error"
                        size="small"
                    />
                );

            case "Out of Stock":
                return (
                    <Chip
                        label={t(
                            "available.outOfStock"
                        )}
                        color="default"
                        size="small"
                    />
                );
        }
    };

    return (
        <div
            className={
                styles.inventoryContainer
            }
        >
            <h1
                className={styles.title}
            >
                {t("title")}
            </h1>

            <Paper
                sx={{
                    width: "90%",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                    }}
                >
                    <FormControl
                        size="small"
                        sx={{
                            m: 2,
                            minWidth: 180,
                        }}
                    >
                        <InputLabel id="availability-filter-label">
                            {t(
                                "filterByAvailability"
                            )}
                        </InputLabel>

                        <Select<AvailabilityFilter>
                            labelId="availability-filter-label"
                            value={
                                availabilityFilter
                            }
                            label={t(
                                "filterByAvailability"
                            )}
                            onChange={
                                handleAvailabilityFilterChange
                            }
                        >
                            <MenuItem value="All">
                                {t(
                                    "available.all"
                                )}
                            </MenuItem>

                            <MenuItem value="Available">
                                {t(
                                    "available.available"
                                )}
                            </MenuItem>

                            <MenuItem value="Unavailable">
                                {t(
                                    "available.unavailable"
                                )}
                            </MenuItem>

                            <MenuItem value="Out of Stock">
                                {t(
                                    "available.outOfStock"
                                )}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TableContainer
                    sx={{
                        maxHeight: 440,
                    }}
                >
                    <Table
                        stickyHeader
                        aria-label={t(
                            "tableAriaLabel"
                        )}
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map(
                                    (column) => (
                                        <TableCell
                                            key={
                                                column.id
                                            }
                                            align={
                                                column.align
                                            }
                                            style={{
                                                minWidth:
                                                    column.minWidth,
                                            }}
                                        >
                                            {column.id ===
                                                "stock" ? (
                                                <TableSortLabel
                                                    active
                                                    direction={
                                                        stockSortOrder ===
                                                            "Low"
                                                            ? "asc"
                                                            : "desc"
                                                    }
                                                    onClick={
                                                        handleStockSort
                                                    }
                                                >
                                                    {t(
                                                        column.label
                                                    )}
                                                </TableSortLabel>
                                            ) : (
                                                t(
                                                    column.label
                                                )
                                            )}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {sortedRows
                                .slice(
                                    page *
                                    rowsPerPage,
                                    page *
                                    rowsPerPage +
                                    rowsPerPage
                                )
                                .map(
                                    (row) => (
                                        <TableRow
                                            hover
                                            tabIndex={
                                                -1
                                            }
                                            key={
                                                row.id
                                            }
                                        >
                                            {columns.map(
                                                (
                                                    column
                                                ) => {
                                                    const value =
                                                        row[
                                                        column
                                                            .id
                                                        ];

                                                    return (
                                                        <TableCell
                                                            key={
                                                                column.id
                                                            }
                                                            align={
                                                                column.align
                                                            }
                                                        >
                                                            {column.id === "image" ? (
                                                                <Box
                                                                    component="img"
                                                                    src={"/images/bgplaceholder.jpeg"}
                                                                    alt={"Product Image"}
                                                                    sx={{
                                                                        width: 60,
                                                                        height: 60,
                                                                        objectFit: "cover",
                                                                        borderRadius: 1,
                                                                    }}
                                                                />
                                                            ) : column.id === "stock" ? (
                                                                editingRowId ===
                                                                    row.id ? (
                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                            gap: 0.5,
                                                                        }}
                                                                    >
                                                                        <TextField
                                                                            type="number"
                                                                            size="small"
                                                                            value={editedStock}
                                                                            onChange={(event) => {
                                                                                const value = event.target.value;

                                                                                setEditedStock(
                                                                                    value === ""
                                                                                        ? ""
                                                                                        : Math.max(0, Number(value))
                                                                                );
                                                                            }}
                                                                            slotProps={{
                                                                                htmlInput: {
                                                                                    min: 0,
                                                                                },
                                                                            }}
                                                                            sx={{ width: 90 }}
                                                                        />

                                                                        <IconButton
                                                                            size="small"
                                                                            color="success"
                                                                            onClick={() =>
                                                                                handleSaveStock(
                                                                                    row.id
                                                                                )
                                                                            }
                                                                            aria-label={t(
                                                                                "saveStock"
                                                                            )}
                                                                        >
                                                                            <CheckIcon fontSize="small" />
                                                                        </IconButton>

                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={
                                                                                handleCancelStockEdit
                                                                            }
                                                                            aria-label={t(
                                                                                "cancelEdit"
                                                                            )}
                                                                        >
                                                                            <CloseIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Box>
                                                                ) : (
                                                                    <Box>
                                                                        <Box
                                                                            sx={{
                                                                                display:
                                                                                    "flex",
                                                                                alignItems:
                                                                                    "center",
                                                                                gap: 0.5,
                                                                            }}
                                                                        >
                                                                            <Typography>
                                                                                {
                                                                                    value
                                                                                }
                                                                            </Typography>

                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() =>
                                                                                    handleStartStockEdit(
                                                                                        row
                                                                                    )
                                                                                }
                                                                                aria-label={t(
                                                                                    "editStock"
                                                                                )}
                                                                            >
                                                                                <EditIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Box>

                                                                        {typeof value ===
                                                                            "number" &&
                                                                            value >
                                                                            0 &&
                                                                            value <=
                                                                            LOW_STOCK_THRESHOLD && (
                                                                                <Typography
                                                                                    variant="caption"
                                                                                    color="error"
                                                                                    sx={{
                                                                                        fontWeight: 600,
                                                                                        display:
                                                                                            "block",
                                                                                    }}
                                                                                >
                                                                                    {t(
                                                                                        "lowStock"
                                                                                    )}{" "}
                                                                                </Typography>
                                                                            )}
                                                                    </Box>
                                                                )
                                                            ) : column.id ===
                                                                "available" ? (
                                                                getAvailabilityChip(
                                                                    value as AvailabilityStatus
                                                                )
                                                            ) : column.format &&
                                                                typeof value ===
                                                                "number" ? (
                                                                column.format(
                                                                    value
                                                                )
                                                            ) : (
                                                                value
                                                            )}
                                                        </TableCell>
                                                    );
                                                }
                                            )}
                                        </TableRow>
                                    )
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[
                        10,
                        25,
                        100,
                    ]}
                    component="div"
                    count={
                        filteredRows.length
                    }
                    rowsPerPage={
                        rowsPerPage
                    }
                    page={page}
                    onPageChange={
                        handleChangePage
                    }
                    onRowsPerPageChange={
                        handleChangeRowsPerPage
                    }
                    labelRowsPerPage={t(
                        "rows"
                    )}
                />
            </Paper>
        </div>
    );
};

export default InventoryDashboard;