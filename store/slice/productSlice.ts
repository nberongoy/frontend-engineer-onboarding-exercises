import { IProduct, IProductEdge } from '@modules/ProductComponent/Products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  productList: IProductEdge[];
  selectedProduct: IProduct;
}

const initialState: ProductState = {
  productList: [],
  selectedProduct: { id: '', name: '', description: '' },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<IProductEdge[]>) => {
      state.productList = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<IProduct>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProductList, setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
