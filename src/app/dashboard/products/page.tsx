"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { Alert, Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
import CrudTable, { CrudColumn } from "../../components/crudTable";
import { Product } from "@/interfaces/Product";
import { deleteProduct, getProducts } from "@/services/productService";
import { getShopByOwner } from "@/services/shopService";
import { notify } from "@/utils/toast";
import { useAuth } from "@/contexts/AuthProvider";

const ProductsTable = () => {
  const router = useRouter();
  const t = useTranslations('ProductsTable');
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shopContextMessage, setShopContextMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        setError(null);
        setShopContextMessage(null);
        const params: Record<string, string | number> = { limit: 50, page: 1 };

        if (user?.role === "shopOwner" && user.id) {
          const ownerShop = await getShopByOwner(user.id);
          const ownerShopId = ownerShop?._id ?? ownerShop?.id;
          if (ownerShopId) {
            params.shopId = ownerShopId;
          } else {
            if (active) {
              setProducts([]);
              setShopContextMessage(t('noShopFound'));
            }
            return;
          }
        }

        const response = await getProducts(params);
        if (active) {
          setProducts(response.items);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || t('loadFailed'));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      active = false;
    };
  }, [t, user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => (product._id ?? product.id ?? product.name) !== id));
      notify(t('deleteSuccess'), "success");
    } catch (err: any) {
      setError(err.message || t('deleteFailed'));
    }
  };

  const productColumns: CrudColumn<Product>[] = [
    {
      key: "name",
      label: t('tableColumns.name'),
      render: (product) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{product.name}</Typography>
          {product.category ? <Typography variant="caption" color="text.secondary">{product.category}</Typography> : null}
        </Box>
      ),
    },
    {
      key: "shop",
      label: t('tableColumns.shop'),
      render: (product) => product.shop || product.shopId || t('notSpecified'),
    },
    {
      key: "price",
      label: t('tableColumns.price'),
      render: (product) => (
        <Box>
          <Typography variant="body2">{product.price.toFixed(2)} RON</Typography>
          {product.reducedPrice && product.reducedPrice < product.price ? (
            <Typography variant="caption" color="success.main">{t('salePrice', { price: product.reducedPrice.toFixed(2) })} RON</Typography>
          ) : null}
        </Box>
      ),
    },
    {
      key: "status",
      label: t('tableColumns.status'),
      render: (product) => (
        <Chip
          label={product.isAvailable === false ? t('status.unavailable') : (product.stock !== undefined && product.stock <= 0 ? t('status.outOfStock') : t('status.available'))}
          color={product.isAvailable === false || (product.stock !== undefined && product.stock <= 0) ? "warning" : "success"}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      key: "createdAt",
      label: t('tableColumns.createdAt'),
      render: (product) => {
        const createdAt = product.createdAt ? new Date(product.createdAt) : null;
        return createdAt ? createdAt.toLocaleDateString() : t('notSpecified');
      },
    },
  ];

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : null}

      {shopContextMessage ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {shopContextMessage}
          <Button
            size="small"
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => router.push('/dashboard/shop/create')}
          >
            {t('createShopAction')}
          </Button>
        </Alert>
      ) : null}

      <CrudTable
        title={t('title')}
        addHref="/dashboard/products/create"
        data={products}
        columns={productColumns}
        getId={(product) => product._id ?? product.id ?? product.name}
        getTitle={(product) => product.name}
        emptyMessage={t('noProducts')}
        deleteTitle={t('deleteTitle')}
        deleteMessage={t('deleteMessage')}
        onEdit={(id) => router.push(`/dashboard/products/${id}/edit`)}
        onDeleteConfirm={(id) => {
          void handleDelete(id);
        }}
      />
    </>
  );
};

export default ProductsTable;