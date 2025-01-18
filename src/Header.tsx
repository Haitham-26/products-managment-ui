import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  h2 {
    margin: 0;
  }
`;

export const Header: React.FC = () => {
  return (
    <Container>
      <h2>Products Management</h2>
    </Container>
  );
};
