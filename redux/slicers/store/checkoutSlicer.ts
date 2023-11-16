import { Refund } from '@a2seven/yoo-checkout';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from 'common/axios.instance';
import {
  getErrorMassage,
  handleChangeError,
  handleChangePending,
  handleError,
  handlePending,
} from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TDeliveryInfo, TOrderInfo, TStoreCheckoutState } from 'redux/types';
import { Checkout, CheckoutService } from 'swagger/services';

export const fetchCheckouts = createAsyncThunk<
  Checkout[],
  undefined,
  { rejectValue: string }
>(
  'checkout/fetchCheckouts',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = (await CheckoutService.getCheckouts({
        limit: '1000',
      })) as unknown as { rows: Checkout[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const cancelCheckout = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  'checkout/cancelCheckout',
  async function (paymentId, { rejectWithValue }): Promise<any> {
    try {
      const response = await axiosInstance.delete<Refund>('/payments', {
        data: {
          paymentId,
        },
      } as any);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TStoreCheckoutState = {
  checkouts: [],
  deliveryInfo: null,
  orderInfo: null,
  loading: false,
  saveLoading: false,
};

const storeCheckoutSlicer = createSlice({
  name: 'storeCheckout',
  initialState,
  reducers: {
    setDeliveryInfo(state, action: PayloadAction<TDeliveryInfo>) {
      state.deliveryInfo = action.payload;
    },
    setOrderInfo(state, action: PayloadAction<TOrderInfo>) {
      state.orderInfo = action.payload;
    },
    clearDeliveryInfo(state) {
      state.deliveryInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCheckouts
      .addCase(fetchCheckouts.pending, handlePending)
      .addCase(fetchCheckouts.fulfilled, (state, action) => {
        state.checkouts = action.payload;
        state.deliveryInfo = action.payload[0].address;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchCheckouts.rejected, (state, action) => {
        state.checkouts = initialState.checkouts;
        state.loading = false;

        console.log('rejected');
      });
    builder
      // cancelCheckout
      .addCase(cancelCheckout.pending, handleChangePending)
      .addCase(cancelCheckout.fulfilled, (state, action) => {
        state.checkouts = state.checkouts!.filter(
          (checkout) => checkout.paymentId !== action.payload.payment_id,
        );
        state.saveLoading = false;
        openSuccessNotification('Ваш Заказ успешно отменен');
        console.log('fulfilled');
      })
      .addCase(cancelCheckout.rejected, handleChangeError);
  },
});

export const { clearDeliveryInfo, setDeliveryInfo, setOrderInfo } =
  storeCheckoutSlicer.actions;

export default storeCheckoutSlicer.reducer;
