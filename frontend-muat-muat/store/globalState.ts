import { Product } from "@/interface/product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IStateInit {
  sort: string,
  keyword: string,
  product: Product[]
}

const initState: IStateInit = {
  sort: "-stock",
  keyword: "",
  product: []
}

const globalState = createSlice({
  name: "global",
  initialState: initState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setProduct(state, action: PayloadAction<Product[]>) {
      state.product = action.payload;
    }
  },
});

export const {
  setSort,
  setKeyword,
  setProduct
} = globalState.actions; // Action

export default globalState.reducer; // Reducer