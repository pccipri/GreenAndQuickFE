"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CrudTable, { CrudColumn } from "../components/crudTable";
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

const categoryColumns: CrudColumn<Category>[] = [
    { key: "name", label: "Name", render: (category) => category.name },
    { key: "isGlobal", label: "Is Global", render: (category) => category.isGlobal.toString() },
    {
        key: "createdAt",
        label: "Created At",
        render: (category) => category.createdAt.toLocaleDateString(),
    },
];

const CategoriesTable = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>(initialCategories);

    return (
        <CrudTable
            title="Categories"
            addHref="/dashboard/categories/add"
            data={categories}
            columns={categoryColumns}
            getId={(category) => category._id}
            getTitle={(category) => category.name}
            emptyMessage="No categories found."
            deleteTitle="Delete category"
            deleteMessage="Are you sure you want to delete this category?"
            onEdit={(id) => router.push(`/dashboard/categories/${id}`)}
            onDeleteConfirm={(id) =>
                setCategories((prev) => prev.filter((category) => category._id !== id))
            }
        />
    );
};

export default CategoriesTable;