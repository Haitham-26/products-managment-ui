import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Product } from "../../../model/product/types/Product";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { UpdateProductDto } from "../../../model/product/dto/UpdateProductDto";
import { useAppDispatch } from "../../../redux/store";
import { productActions } from "../../../redux/product/product.slice";

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

type ProductUpdateModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
};

export const ProductUpdateModal: React.FC<ProductUpdateModalProps> = ({
  open = false,
  onClose,
  product,
}) => {
  const [loading, setLoading] = useState(false);

  const { control, getValues, handleSubmit, reset } =
    useForm<UpdateProductDto>();

  const dispatch = useAppDispatch();

  const updateProduct = async () => {
    try {
      setLoading(true);

      const dto = getValues();

      await dispatch(productActions.updateProduct(dto)).unwrap();

      await dispatch(productActions.getAllProducts()).unwrap();

      reset();

      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && product) {
      reset({
        name: product?.name,
        price: product?.price,
        quantity: product?.quantity,
        _id: product?._id,
      });
    }
  }, [open, product, reset]);

  if (!product) {
    return;
  }

  return (
    <Modal open={open} onCancel={onClose} title="Update Product" footer={null}>
      <InputsWrapper>
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputWrapper>
              <label>Product Name </label>
              <Input value={value} onChange={onChange} />
            </InputWrapper>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputWrapper>
              <label>Product Price </label>
              <Input value={value} onChange={onChange} />
            </InputWrapper>
          )}
        />

        <Controller
          name="quantity"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputWrapper>
              <label>Product Quantity </label>
              <Input value={value} onChange={onChange} />
            </InputWrapper>
          )}
        />

        <Button
          type="primary"
          loading={loading}
          onClick={handleSubmit(updateProduct)}
        >
          Update
        </Button>
      </InputsWrapper>
    </Modal>
  );
};
