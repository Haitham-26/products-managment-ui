import { Button } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CreateProductModal } from "../../components/ProductCreateModal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { productSliceSelectors } from "../../redux/product/product.selector";
import { productActions } from "../../redux/product/product.slice";
import { Product } from "./components/Product";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
  gap: 2rem;
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const products = useAppSelector(productSliceSelectors.productsSelector);

  useEffect(() => {
    dispatch(productActions.getAllProducts());
  }, [dispatch]);

  return (
    <Container>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Add Product
      </Button>

      <ProductsWrapper>
        {products?.map?.((product) => (
          <Product key={product._id} product={product} />
        ))}
      </ProductsWrapper>

      <CreateProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Container>
  );
};
