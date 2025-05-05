import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleError,
  handlePending,
  openErrorNotification,
} from 'common/helpers';
import { TCartState } from 'redux/types';
import {
  Basket,
  BasketDTO,
  BasketService,
  OrderProduct,
  OrderProductDTO,
  OrderProductWithJoins,
  ProductVariant,
} from 'swagger/services';

export const fetchCart = createAsyncThunk<
  Basket,
  string,
  { rejectValue: string }
>(
  'cart/fetchCart',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await BasketService.findBasketById({ basketId: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const clearCart = createAsyncThunk<
  Basket,
  string,
  { rejectValue: string }
>(
  'cart/clearCart',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await BasketService.clearBasket({ basketId: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createCart = createAsyncThunk<
  Basket,
  undefined,
  { rejectValue: string }
>('cart/createCart', async function (_, { rejectWithValue }): Promise<any> {
  try {
    return await BasketService.createBasket();
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

export const updateCart = createAsyncThunk<
  Basket,
  BasketDTO,
  { rejectValue: string }
>(
  'cart/updateCart',
  async function (payload: BasketDTO, { rejectWithValue }): Promise<any> {
    try {
      const basketId = localStorage.getItem('basketId') ?? '';

      return await BasketService.updateBasket({ basketId, body: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const addToCart = createAsyncThunk<
  Basket,
  OrderProductDTO,
  { rejectValue: string }
>(
  'cart/addToCart',
  async function (payload: OrderProductDTO, { rejectWithValue }): Promise<any> {
    try {
      const basketId = localStorage.getItem('basketId') ?? '';

      return await BasketService.addToCart({
        basketId,
        body: payload,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateCartQty = createAsyncThunk<
  Basket,
  OrderProduct,
  { rejectValue: string }
>(
  'cart/updateCartQty',
  async function (payload: OrderProduct, { rejectWithValue }): Promise<any> {
    try {
      const basketId = localStorage.getItem('basketId') ?? '';

      return await BasketService.updateCartQty({
        basketId,
        body: payload,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const removeFromCart = createAsyncThunk<
  Basket,
  OrderProductWithJoins,
  { rejectValue: string }
>(
  'cart/removeFromCart',
  async function (
    payload: OrderProductWithJoins,
    { rejectWithValue },
  ): Promise<any> {
    try {
      const basketId = localStorage.getItem('basketId') ?? '';

      return await BasketService.removeFromCart({
        basketId,
        body: payload,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TCartState = {
  cart: null,
  variant: null,
  productSize: '',
  isOneClickBuy: false,
  loading: false,
  countLoading: false,
};

const cartSlicer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setVariant(state, action: PayloadAction<ProductVariant>) {
      state.variant = action.payload;
    },
    clearVariant(state) {
      state.variant = initialState.variant;
    },
    setproductSize(state, action: PayloadAction<string>) {
      state.productSize = action.payload;
    },
    clearproductSize(state) {
      state.productSize = initialState.productSize;
    },
    setOneClickBy(state, action) {
      state.isOneClickBuy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCart
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(
        fetchCart.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          state.loading = false;
          localStorage.removeItem('basketId');
          openErrorNotification(action.payload);
        },
      )
      //createCart
      .addCase(createCart.pending, handlePending)
      .addCase(createCart.fulfilled, (state, action) => {
        state.cart = {
          ...action.payload,
          orderProducts: [],
        };
        localStorage.setItem('basketId', action.payload.id!);
        state.loading = false;
      })
      .addCase(createCart.rejected, handleError)
      //updateCart
      .addCase(updateCart.pending, (state: { countLoading: boolean }) => {
        state.countLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        localStorage.setItem('basketId', action.payload.id!);
        state.countLoading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.countLoading = false;
        openErrorNotification(action.payload!);
      })
      //addToCart
      .addCase(addToCart.pending, (state: { countLoading: boolean }) => {
        state.countLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.countLoading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.countLoading = false;
        openErrorNotification(action.payload!);
      })
      //updateCartQty
      .addCase(updateCartQty.pending, handlePending)
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(updateCartQty.rejected, handleError)
      //removeFromCart
      .addCase(removeFromCart.pending, (state: { countLoading: boolean }) => {
        state.countLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.countLoading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.countLoading = false;
        openErrorNotification(action.payload!);
      })
      // clearCart
      .addCase(clearCart.pending, handlePending)
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(clearCart.rejected, handleError);
  },
});

export const {
  setVariant,
  clearVariant,
  setproductSize,
  setOneClickBy,
  clearproductSize,
} = cartSlicer.actions;

export default cartSlicer.reducer;
