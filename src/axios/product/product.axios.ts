import { CreateProductDto } from "../../model/product/dto/CreateProductDto";
import { DeleteProductDto } from "../../model/product/dto/DeleteProductDto";
import { GetProductByIdDto } from "../../model/product/dto/GetProductByIdDto";
import { UpdateProductDto } from "../../model/product/dto/UpdateProductDto";
import { Product } from "../../model/product/types/Product";
import { MyApi } from "../AxiosClient";

export class ProductAxios {
  static async createProduct(dto: CreateProductDto) {
    return MyApi.post<void>("/products/create", dto).then(({ data }) => data);
  }

  static async getAllProducts() {
    return MyApi.get<Product[]>("/products").then(({ data }) => data);
  }

  static async deleteProduct(dto: DeleteProductDto) {
    return MyApi.delete<void>(`/products/${dto._id}`).then(({ data }) => data);
  }

  static async updateProduct(dto: UpdateProductDto) {
    return MyApi.put<void>(`/products/${dto._id}`, dto).then(
      ({ data }) => data
    );
  }

  static async getProductById(dto: GetProductByIdDto) {
    return MyApi.get<Product>(`/products/${dto._id}`).then(({ data }) => data);
  }
}
