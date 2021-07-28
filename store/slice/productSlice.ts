import { IProduct, IProductEdge } from '@modules/ProductComponent/Products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  productList: IProductEdge[];
  selectedProduct: IProduct | null;
}

const initialState: ProductState = {
  productList: [],
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<IProductEdge[]>) => {
      state.productList = action.payload;
    },
    setSelectedProdcut: (state, action: PayloadAction<IProduct>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProductList, setSelectedProdcut } = productSlice.actions;

export default productSlice.reducer;
