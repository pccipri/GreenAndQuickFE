"use client"

import { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { Column, Data } from "@/interfaces/UI";
import { getMyOrders } from "@/services/orderService";
import type { Order } from "@/interfaces/Order";

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

const columns: readonly Column[] = [
    { id: 'id', label: 'tableColumns.id', minWidth: 50 },
    { id: 'date', label: 'tableColumns.date', minWidth: 100 },
    { id: 'shop', label: 'tableColumns.shop', minWidth: 100 },
    { id: 'total', label: 'tableColumns.total', minWidth: 100 },
    { id: 'status', label: 'tableColumns.status', minWidth: 100 }
];

const normalizeOrderStatus = (status?: string): string => {
    const normalized = (status ?? 'placed').toLowerCase();
    if (normalized === 'active' || normalized === 'pending') {
        return 'placed';
    }

    return normalized;
};

const OrderHistory: FC = () => {
    const t = useTranslations('OrderHistory');
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const data = await getMyOrders();
                setOrders(data);
            } catch (err: any) {
                setError(err.message || t('loadFailed'));
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleStatusFilterChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value);
        setPage(0);
    };

    const filteredRows = useMemo(() => {
        if (statusFilter === 'all') {
            return orders;
        }

        return orders.filter((order) => normalizeOrderStatus(order.status) === statusFilter.toLowerCase());
    }, [orders, statusFilter]);

    const rows = filteredRows.map((order, index) => {
        const data: Data = {
            id: order._id ?? index,
            date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : t('dateFallback'),
            shop: order.items?.[0]?.shopId ?? t('shopFallback'),
            total: order.totalAmount ?? 0,
            status: normalizeOrderStatus(order.status),
        };

        return {
            orderId: order._id,
            data,
        };
    });

    const getStatusChip = (status: string) => {
        const normalizedStatus = normalizeOrderStatus(status);
        const statusLabelKey = `status.${normalizedStatus}` as const;
        const fallbackLabel = normalizedStatus;
        const translatedLabel = t(statusLabelKey);
        const chipLabel = translatedLabel === statusLabelKey ? fallbackLabel : translatedLabel;

        switch (normalizedStatus) {
            case 'placed':
            case 'active':
                return <Chip label={chipLabel} color="primary" size="small" />;
            case 'confirmed':
            case 'shipped':
                return <Chip label={chipLabel} color="warning" size="small" />;
            case 'delivered':
                return <Chip label={chipLabel} color="success" size="small" />;
            case 'cancelled':
                return <Chip label={chipLabel} color="error" size="small" />;
            default:
                return <Chip label={chipLabel} size="small" />;
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
                                <MenuItem value="all">{t('status.all')}</MenuItem>
                                <MenuItem value="placed">{t('status.active')}</MenuItem>
                                <MenuItem value="confirmed">{t('status.confirmed')}</MenuItem>
                                <MenuItem value="shipped">{t('status.shipped')}</MenuItem>
                                <MenuItem value="delivered">{t('status.delivered')}</MenuItem>
                                <MenuItem value="cancelled">{t('status.cancelled')}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Box sx={{ py: 6, px: 3 }}>
                            <Typography color="error">{error}</Typography>
                        </Box>
                    ) : rows.length === 0 ? (
                        <Box sx={{ py: 6, px: 3 }}>
                            <Typography>{t('empty')}</Typography>
                        </Box>
                    ) : (
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
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        const clickable = Boolean(row.orderId);
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.data.id}
                                                onClick={clickable ? () => router.push(`/orders/${row.orderId}`) : undefined}
                                                sx={clickable ? { cursor: 'pointer' } : undefined}
                                            >
                                                {columns.map((column) => {
                                                    const value = row.data[column.id];
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
                    )}
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
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