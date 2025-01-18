import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { CreateProductDto } from "../model/product/dto/CreateProductDto";
import { useAppDispatch } from "../redux/store";
import { productActions } from "../redux/product/product.slice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

type CreateProductModalProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateProductModal: React.FC<CreateProductModalProps> = ({
  open = false,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const { control, getValues, handleSubmit, reset } = useForm<CreateProductDto>(
    {
      defaultValues: {
        name: "",
        price: 0,
        quantity: 0,
      },
    }
  );

  const dispatch = useAppDispatch();

  const createProduct = async () => {
    try {
      setLoading(true);

      const dto = getValues();

      await dispatch(productActions.createProduct(dto)).unwrap();

      await dispatch(productActions.getAllProducts()).unwrap();

      reset();

      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={"Create Product"}
      footer={null}
    >
      <Wrapper>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <InputWrapper>
              <label>Product Name</label>
              <Input value={value} onChange={onChange} />
            </InputWrapper>
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field: { value, onChange } }) => (
            <InputWrapper>
              <label>Product Price</label>
              <Input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
              />
            </InputWrapper>
          )}
        />

        <Controller
          control={control}
          name="quantity"
          render={({ field: { value, onChange } }) => (
            <InputWrapper>
              <label>Product Quantity</label>
              <Input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
              />
            </InputWrapper>
          )}
        />

        <Button
          onClick={handleSubmit(createProduct)}
          loading={loading}
          type="primary"
        >
          Create
        </Button>
      </Wrapper>
    </Modal>
  );
};
