import React, { useState } from "react";
import styled from "styled-components";
import { Product as ProductModel } from "../../../model/product/types/Product";
import { Button } from "antd";
import { useAppDispatch } from "../../../redux/store";
import { productActions } from "../../../redux/product/product.slice";
import { ProductUpdateModal } from "./ProductUpdateModal";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  background-color: #f4efef;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #4848e8c2;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

type ProductProps = {
  product: ProductModel;
};

export const Product: React.FC<ProductProps> = ({ product }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(
        productActions.deleteProduct({ _id: product._id })
      ).unwrap();

      await dispatch(productActions.getAllProducts()).unwrap();
    } catch (e) {
      console.log(e);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Container>
      <DetailsWrapper>
        <span>Product Name: {product.name}</span>

        <span>Product Price: {product.price}</span>

        <span>Product Quantity: {product.quantity}</span>
      </DetailsWrapper>

      <ActionsWrapper>
        <Button
          loading={deleteLoading}
          type="primary"
          danger
          onClick={handleDelete}
        >
          Delete
        </Button>

        <Button type="primary" onClick={() => setUpdateModalOpen(true)}>
          Edit
        </Button>
      </ActionsWrapper>

      <ProductUpdateModal
        product={product}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      />
    </Container>
  );
};
