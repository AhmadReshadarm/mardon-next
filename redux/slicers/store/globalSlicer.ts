import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFilters, TGlobalState } from 'redux/types';
import {
  Category,
  CategoryInTree,
  CategoryService,
  Product,
  ProductService,
  Tag,
  TagService,
  NewsService,
  NewsPosts,
  Basket,
} from 'swagger/services';
import {
  getErrorMassage,
  handleError,
  handlePending,
  openErrorNotification,
} from '../../../common/helpers';

export const fetchCategories = createAsyncThunk<
  CategoryInTree[],
  undefined,
  { rejectValue: string }
>(
  'global/fetchCategories',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await CategoryService.getCategoriesTree();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchMainPageProducts = createAsyncThunk<
  Product[],
  TFilters,
  { rejectValue: string }
>(
  'catalog/fetchMainPageProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await ProductService.getProducts(
        payload,
      )) as unknown as { rows: Product[]; length: number };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchBestProducts = createAsyncThunk<
  Product[],
  TFilters,
  { rejectValue: string }
>(
  'catalog/fetchBestProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await ProductService.getProducts(
        payload,
      )) as unknown as { rows: Product[]; length: number };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchHistoryProducts = createAsyncThunk<
  Product[],
  TFilters,
  { rejectValue: string }
>(
  'catalog/fetchHistoryProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await ProductService.getProducts(
        payload,
      )) as unknown as { rows: Product[]; length: number };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchTags = createAsyncThunk<
  Tag[],
  undefined,
  { rejectValue: string }
>('global/fetchTags', async function (_, { rejectWithValue }): Promise<any> {
  try {
    const response = (await TagService.getTags({
      limit: '1000',
    })) as unknown as { rows: Tag[] };
    return response.rows;
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

export const fetchNewsPost = createAsyncThunk<
  NewsPosts,
  undefined,
  { rejectValue: string }
>(
  'global/fetchNewsPost',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await NewsService.getNews({
        showOnMain: true,
      });
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const searchProducts = createAsyncThunk<
  Product[],
  { name?: string; artical?: string },
  { rejectValue: string }
>(
  'global/searchProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await ProductService.getProducts(
        payload,
      )) as unknown as { rows: Category[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const handleProductsPending = (state: { productsLoading: boolean }) => {
  state.productsLoading = true;
};

const handleProductsError = (
  state,
  action: PayloadAction<any, any, any, any>,
) => {
  state.productsLoading = false;
  openErrorNotification(action.payload);
};

const initialState: TGlobalState = {
  wishlist: null,
  searchQuery: '',
  categories: [],
  products: [],
  tags: [],
  newsPosts: [],
  caroselProducts: [],
  bestProduct: [],
  historyProducts: [],
  historyProductsSource: [],
  loading: false,
  loadingAddRemoveWishlist: false,
  loadingCarosel: false,
  productsLoading: false,
  bestProductLoading: false,

  loadingHistory: false,
};

const globalSlicer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearSearchQuery(state) {
      state.searchQuery = initialState.searchQuery;
    },
    clearSearchProducts(state) {
      state.products = [];
    },
    // In globalSlicer.ts - Update the reducer
    filterHistoryProducts(
      state,
      action: PayloadAction<{
        cart: Basket | null;
        historyProducts: Product[];
      }>,
    ) {
      const { cart, historyProducts } = action.payload;

      // Clone the original history products to preserve source data
      const originalHistory = state.historyProductsSource || historyProducts;

      const cartVariantIds = new Set(
        cart?.orderProducts?.map((op) => op.productVariant?.id),
      );

      const filteredHistory = originalHistory
        .map((product) => ({
          ...product,
          productVariants: product.productVariants?.filter(
            (variant) => !cartVariantIds.has(variant.id),
          ),
        }))
        .filter((product) => product.productVariants?.length);

      // Store both source and filtered versions
      state.historyProducts = filteredHistory;
      state.historyProductsSource = originalHistory; // Preserve original data
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, handleError)
      //fetchMainPageProducts
      .addCase(fetchMainPageProducts.pending, (state, action) => {
        state.loadingCarosel = true;
      })
      .addCase(fetchMainPageProducts.fulfilled, (state, action) => {
        state.caroselProducts = action.payload;
        state.loadingCarosel = false;
      })
      .addCase(fetchMainPageProducts.rejected, handleError)
      // fetchHistoryProducts
      .addCase(fetchHistoryProducts.pending, (state) => {
        state.loadingHistory = true;
      })
      .addCase(fetchHistoryProducts.fulfilled, (state, action) => {
        state.historyProducts = action.payload;
        state.loadingHistory = false;
      })
      .addCase(fetchHistoryProducts.rejected, (state, action) => {
        state.loadingHistory = false;
        openErrorNotification(action.payload!);
      })
      //fetchBestProducts
      .addCase(fetchBestProducts.pending, (state, action) => {
        state.bestProductLoading = true;
      })
      .addCase(fetchBestProducts.fulfilled, (state, action) => {
        state.bestProduct = action.payload;
        state.bestProductLoading = false;
      })
      .addCase(fetchBestProducts.rejected, handleError)
      //fetchTags
      .addCase(fetchTags.pending, handlePending)
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.loading = false;
      })
      .addCase(fetchTags.rejected, handleError)
      //fetchNewsPost
      .addCase(fetchNewsPost.pending, handlePending)
      .addCase(fetchNewsPost.fulfilled, (state, action) => {
        state.newsPosts = action.payload;
        state.loading = false;
      })
      .addCase(fetchNewsPost.rejected, handleError)
      //searchProducts
      .addCase(searchProducts.pending, handleProductsPending)
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsLoading = false;
      })
      .addCase(searchProducts.rejected, handleProductsError);
  },
});

export const {
  clearSearchProducts,
  changeSearchQuery,
  clearSearchQuery,
  filterHistoryProducts,
} = globalSlicer.actions;

export default globalSlicer.reducer;
