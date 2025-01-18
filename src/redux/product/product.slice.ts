import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../model/product/types/Product";
import { Thunk } from "../Thunk";
import { CreateProductDto } from "../../model/product/dto/CreateProductDto";
import { ProductAxios } from "../../axios/product/product.axios";
import { GetProductByIdDto } from "../../model/product/dto/GetProductByIdDto";
import { DeleteProductDto } from "../../model/product/dto/DeleteProductDto";
import { UpdateProductDto } from "../../model/product/dto/UpdateProductDto";

interface ProductReducer {
  products: Product[];
}

const initialState = Object.freeze<ProductReducer>({
  products: [],
});

const createProduct = Thunk<void, CreateProductDto>(`/products`, (dto) =>
  ProductAxios.createProduct(dto)
);

const getAllProducts = Thunk<Product[], void>(`/products`, () =>
  ProductAxios.getAllProducts()
);

const getProductById = Thunk<GetProductByIdDto, Product>(
  `/product/:id`,
  (dto) => {
    return ProductAxios.getProductById(dto);
  }
);

const updateProduct = Thunk<void, UpdateProductDto>(`/product/:id`, (dto) => {
  return ProductAxios.updateProduct(dto);
});

const deleteProduct = Thunk<void, DeleteProductDto>(`/product/:id`, (dto) => {
  return ProductAxios.deleteProduct(dto);
});

const productSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload || [];
    });
  },
});

export const productActions = {
  ...productSlice.actions,
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};

export default productSlice.reducer;
