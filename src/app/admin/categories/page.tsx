"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import CrudTable, { CrudColumn } from "../../components/crudTable";
import { Category } from "@/interfaces/Category";


// Mock data for crud table
const initialCategories: Category[] = [
    {
        _id: "1",
        name: "Vegetables",
        isGlobal: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
    },
    {
        _id: "2",
        name: "Vegetables",
        isGlobal: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
    },
    {
        _id: "3",
        name: "Vegetables",
        isGlobal: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
    },
];


const CategoriesTable = () => {
    const router = useRouter();
    const t = useTranslations('CategoriesTable');
    const [categories, setCategories] = useState<Category[]>(initialCategories);

    const categoryColumns: CrudColumn<Category>[] = [
        {
            key: "name",
            label: t('tableColumns.name'),
            render: (category) => category.name,
        },
        {
            key: "isGlobal",
            label: t('tableColumns.isGlobal'),
            render: (category) => category.isGlobal.toString()
        },
        {
            key: "createdAt",
            label: t('tableColumns.createdAt'),
            render: (category) => category.createdAt.toLocaleDateString(),
        },
    ];

    return (
        <CrudTable
            title={t('title')}
            addHref="/dashboard/categories/add"
            data={categories}
            columns={categoryColumns}
            getId={(category) => category._id}
            getTitle={(category) => category.name}
            emptyMessage={t('noCategories')}
            deleteTitle={t('deleteTitle')}
            deleteMessage={t('deleteMessage')}
            onEdit={(id) => router.push(`/dashboard/categories/${id}`)}
            onDeleteConfirm={(id) =>
                setCategories((prev) => prev.filter((category) => category._id !== id))
            }
        />
    );
};

export default CategoriesTable;