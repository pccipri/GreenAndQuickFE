"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import CrudTable, { CrudColumn } from "@/app/components/crudTable";
import { Category } from "@/interfaces/Category";
import { deleteCategory, getCategories } from "@/services/categoryService";
import { notify } from "@/utils/toast";

const CategoriesTable = () => {
    const router = useRouter();
    const t = useTranslations("CategoriesTable");
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCategories = async () => {
        try {
            setError(null);
            const data = await getCategories();
            setCategories(data);
        } catch (err: any) {
            setError(err.message || "Unable to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadCategories();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory(id);
            setCategories((prev) => prev.filter((category) => category._id !== id));
            notify("Category deleted successfully", "success");
        } catch (err: any) {
            setError(err.message || "Unable to delete category.");
        }
    };

    const categoryColumns: CrudColumn<Category>[] = [
        {
            key: "name",
            label: t("tableColumns.name"),
            render: (category) => category.name,
        },
        {
            key: "isGlobal",
            label: t("tableColumns.isGlobal"),
            render: (category) => (category.isGlobal ? "Yes" : "No"),
        },
        {
            key: "createdAt",
            label: t("tableColumns.createdAt"),
            render: (category) => (category.createdAt ? new Date(category.createdAt).toLocaleDateString() : "—"),
        },
    ];

    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                {t("title")}
            </Typography>

            {error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            ) : null}

            {loading ? (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <CrudTable
                    title={t("title")}
                    addHref="/admin/categories/add"
                    data={categories}
                    columns={categoryColumns}
                    getId={(category) => category._id}
                    getTitle={(category) => category.name}
                    emptyMessage={t("noCategories")}
                    deleteTitle={t("deleteTitle")}
                    deleteMessage={t("deleteMessage")}
                    onEdit={(id) => router.push(`/admin/categories/${id}`)}
                    onDeleteConfirm={(id) => {
                        void handleDelete(id);
                    }}
                />
            )}
        </Box>
    );
};

export default CategoriesTable;