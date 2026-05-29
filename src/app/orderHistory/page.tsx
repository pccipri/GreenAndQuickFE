"use client"

import { FC, useState } from "react";

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from './page.module.css';
import { useTranslations } from 'next-intl';


interface Column {
    id: 'id' | 'date' | 'shop' | 'total' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'tableColumns.id', minWidth: 50 },
    { id: 'date', label: 'tableColumns.date', minWidth: 100 },
    { id: 'shop', label: 'tableColumns.shop', minWidth: 100 },
    { id: 'total', label: 'tableColumns.total', minWidth: 100 },
    { id: 'status', label: 'tableColumns.status', minWidth: 100 }
];

interface Data {
    id: number;
    date: string;
    shop: string;
    total: number;
    status: string;
}

function createData(
    id: number,
    date: string,
    shop: string,
    total: number,
    status: string,
): Data {
    return { id, date, shop, total, status };
}

const rows = [
    createData(1, "30.05.2026", "Marcel's Shop", 250, "Active"),
    createData(2, "30.05.2026", "Marcel's Shop", 250, "Delivered"),
    createData(3, "30.05.2026", "Marcel's Shop", 250, "Cancelled"),
    createData(4, "30.05.2026", "Marcel's Shop", 250, "Active"),
    createData(5, "30.05.2026", "Marcel's Shop", 250, "Delivered"),

];

const OrderHistory: FC = () => {
    const t = useTranslations('OrderHistory');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [statusFilter, setStatusFilter] = useState('All');

    const handleStatusFilterChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value);
        setPage(0);
    };

    const filteredRows = statusFilter === 'All'
        ? rows
        : rows.filter((row) => row.status === statusFilter);

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'Active':
                return <Chip label={status} color="primary" size="small" />;
            case 'Delivered':
                return <Chip label={status} color="success" size="small" />;
            case 'Cancelled':
                return <Chip label={status} color="error" size="small" />;
            default:
                return <Chip label={status} size="small" />;
        }
    };

    return (
        <>
            <div className={styles.orderHistoryContainer}>
                <h1 className={styles.title}>{t('title')}</h1>

                <Paper sx={{ width: '90%', overflow: 'hidden' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <FormControl size="small" sx={{ m: 2, minWidth: 180 }}>
                            <InputLabel>{t('sort')}</InputLabel>
                            <Select
                                value={statusFilter}
                                label={t('sort')}
                                onChange={handleStatusFilterChange}
                            >
                                <MenuItem value="All">{t('status.all')}</MenuItem>
                                <MenuItem value="Active">{t('status.active')}</MenuItem>
                                <MenuItem value="Delivered">{t('status.delivered')}</MenuItem>
                                <MenuItem value="Cancelled">{t('status.cancelled')}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {t(column.label)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'status'
                                                                ? getStatusChip(value as string)
                                                                : column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={t('rows')}
                    />
                </Paper>
            </div>
        </>
    );
};

export default OrderHistory;