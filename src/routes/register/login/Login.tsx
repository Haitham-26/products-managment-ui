import { Button } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../../../redux/store";
import { userActions } from "../../../redux/user/user.slice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #5347ff;
  background-color: #ffbbbb;
  width: min(100%, 30rem);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #5347ff;
  border-radius: 0.5rem;
  outline: none;
`;

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { control, getValues, handleSubmit } = useForm<LoginDto>();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);

      const dto = getValues();

      await dispatch(userActions.login(dto)).unwrap();

      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <InputWrapper>
              <label htmlFor="email">Email</label>

              <Input value={value} onChange={onChange} />
            </InputWrapper>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <InputWrapper>
              <label htmlFor="password">Password</label>

              <Input value={value} onChange={onChange} type="password" />
            </InputWrapper>
          )}
        />

        <Button loading={loading} type="primary" onClick={handleSubmit(login)}>
          Login
        </Button>
      </FormWrapper>
    </Container>
  );
};
