import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

export const productSelector = (state: RootState) => state.product || [];

const productsSelector = createSelector(
  productSelector,
  (state) => state.products
);

export const productSliceSelectors = { productsSelector };
