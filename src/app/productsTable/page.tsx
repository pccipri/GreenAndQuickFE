"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

const productColumns: CrudColumn<Product>[] = [
  { key: "name", label: "Name", render: (product) => product.name },
  { key: "shop", label: "Shop", render: (product) => product.shop },
  {
    key: "price",
    label: "Price",
    render: (product) => `${product.price.toFixed(2)} RON`,
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (product) => product.createdAt.toLocaleDateString(),
  },
];

const ProductsTable = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <CrudTable
      title="Products"
      addHref="/dashboard/products/add"
      data={products}
      columns={productColumns}
      getId={(product) => product._id}
      getTitle={(product) => product.name}
      emptyMessage="No products found."
      deleteTitle="Delete product"
      deleteMessage="Are you sure you want to delete this product?"
      onEdit={(id) => router.push(`/dashboard/products/${id}`)}
      onDeleteConfirm={(id) =>
        setProducts((prev) => prev.filter((product) => product._id !== id))
      }
    />
  );
};

export default ProductsTable;