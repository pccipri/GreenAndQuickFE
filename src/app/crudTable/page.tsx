"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Product } from "@/interfaces/Product";


// Mock data for products table
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
    price: 29.99,
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
    price: 29.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    _id: "4",
    shop: "Marcel's Shop",
    name: "Product Four",
    description: "This is the fourth product.",
    imageUrl: "",
    price: 29.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    _id: "5",
    shop: "Marcel's Shop",
    name: "Product Five",
    description: "This is the fifth product.",
    imageUrl: "",
    price: 29.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    _id: "6",
    shop: "Marcel's Shop",
    name: "Product Six",
    description: "This is the sixth product.",
    imageUrl: "",
    price: 29.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    _id: "7",
    shop: "Marcel's Shop",
    name: "Product Seven",
    description: "This is the seventh product.",
    imageUrl: "",
    price: 29.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    _id: "8",
    shop: "Marcel's Shop",
    name: "Product Eight",
    description: "This is the eighth product.",
    imageUrl: "",
    price: 29.99,
    reducedPrice: 19.99,
    category: "Category A",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-02"),
  },
];

const ProductsTable = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [productToDelete, setProductToDelete] = useState<string>("");

  const handleDeleteConfirm = () => {
    setProducts((prev) => prev.filter((product) => product._id !== productToDelete));
    setProductToDelete("");
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
            Products
          </Typography>

          <Button
            component={Link}
            href="/dashboard/products/add"
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
            Add new
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
                <TableCell>Name</TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Reduced Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #ECECEC",
                      color: "#24282C",
                      fontSize: "1rem"
                    },
                  }}
                >
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.shop}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.imageUrl}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.reducedPrice}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{product.updatedAt.toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => router.push(`/dashboard/products/${product._id}`)}
                      aria-label={`Edit ${product.name}`}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => setProductToDelete(product._id)}
                      aria-label={`Delete ${product.name}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <Typography sx={{ py: 3, color: "#666" }}>
                      No products found.
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
          {products.map((product) => (
            <Card
              key={product._id}
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
                    {product.name}
                  </Typography>

                  <Box>
                    <IconButton
                      onClick={() => router.push(`/dashboard/products/${product._id}`)}
                      aria-label={`Edit ${product.name}`}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => setProductToDelete(product._id)}
                      aria-label={`Delete ${product.name}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Stack spacing={1}>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Shop</Typography>
                    <Typography>{product.shop}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Name</Typography>
                    <Typography>{product.name}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Description</Typography>
                    <Typography>{product.description}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Image</Typography>
                    <Typography>{product.imageUrl}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Price</Typography>
                    <Typography>{product.price}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Reduced Price</Typography>
                    <Typography>{product.reducedPrice}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Category</Typography>
                    <Typography>{product.category}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Created At</Typography>
                    <Typography>{product.createdAt.toLocaleDateString()}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Typography sx={{ fontWeight: 600 }}>Updated At</Typography>
                    <Typography>{product.updatedAt.toLocaleDateString()}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}

          {products.length === 0 && (
            <Typography align="center" sx={{ color: "#666", py: 3 }}>
              No products found.
            </Typography>
          )}
        </Box>
      </Box>

      <Dialog
        open={Boolean(productToDelete)}
        onClose={() => setProductToDelete("")}
      >
        <DialogTitle>Delete product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductToDelete("")}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductsTable;