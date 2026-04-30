"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import CrudTable, { CrudColumn } from "../components/crudTable";
import { Product } from "@/interfaces/Product";


// Mock data for crud table
const initialProducts: Product[] = [
  {
    _id: "1",
    shop: "Marcel's Shop",
    name: "Product One",
    description: "This is the first product.",
    imageUrl: "",
    price: 29.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    _id: "2",
    shop: "Marcel's Shop",
    name: "Product Two",
    description: "This is the second product.",
    imageUrl: "",
    price: 39.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    _id: "3",
    shop: "Marcel's Shop",
    name: "Product Three",
    description: "This is the third product.",
    imageUrl: "",
    price: 49.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
];

const ProductsTable = () => {
  const router = useRouter();
  const t = useTranslations('ProductsTable');

  const [products, setProducts] = useState<Product[]>(initialProducts);

  const productColumns: CrudColumn<Product>[] = [
    {
      key: "name",
      label: t('tableColumns.name'),
      render: (product) => product.name,
    },
    {
      key: "shop",
      label: t('tableColumns.shop'),
      render: (product) => product.shop,
    },
    {
      key: "price",
      label: t('tableColumns.price'),
      render: (product) => `${product.price.toFixed(2)} RON`,
    },
    {
      key: "createdAt",
      label: t('tableColumns.createdAt'),
      render: (product) => product.createdAt.toLocaleDateString(),
    },
  ];

  return (
    <CrudTable
      title={t('title')}
      addHref="/dashboard/products/add"
      data={products}
      columns={productColumns}
      getId={(product) => product._id}
      getTitle={(product) => product.name}
      emptyMessage={t('noProducts')}
      deleteTitle={t('deleteTitle')}
      deleteMessage={t('deleteMessage')}
      onEdit={(id) => router.push(`/dashboard/products/${id}`)}
      onDeleteConfirm={(id) =>
        setProducts((prev) => prev.filter((p) => p._id !== id))
      }
    />
  );
};

export default ProductsTable;