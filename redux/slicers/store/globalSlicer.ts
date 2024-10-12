import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { handlePaginationDataFormatter } from 'redux/helpers';
import { TFilters, TGlobalState } from 'redux/types';
import {
  Category,
  CategoryInTree,
  CategoryService,
  Product,
  ProductService,
  // Wishlist,
  // WishlistService,
  Tag,
  TagService,
  NewsService,
  NewsPosts,
} from 'swagger/services';
import {
  getErrorMassage,
  handleError,
  handlePending,
  openErrorNotification,
} from '../../../common/helpers';

// export const fetchWishlist = createAsyncThunk<
//   Wishlist,
//   string,
//   { rejectValue: string }
// >(
//   'global/fetchWishlist',
//   async function (payload, { rejectWithValue }): Promise<any> {
//     // const userId = localStorage.getItem('userId');
//     try {
//       return await WishlistService.findWishlistById({ wishlistId: payload });
//     } catch (error: any) {
//       localStorage.removeItem('wishlistId');
//       return rejectWithValue(getErrorMassage(error.response.status));
//     }
//   },
// );

// export const createWishlist = createAsyncThunk<
//   Wishlist,
//   undefined,
//   { rejectValue: string }
// >(
//   'global/createWishlist',
//   async function (_, { rejectWithValue }): Promise<any> {
//     try {
//       return await WishlistService.createWishlist();
//     } catch (error: any) {
//       return rejectWithValue(getErrorMassage(error.response.status));
//     }
//   },
// );

// export const updateWishlist = createAsyncThunk<
//   Wishlist,
//   Wishlist,
//   { rejectValue: string }
// >(
//   'global/updateWishlist',
//   async function (payload: BasketDTO, { rejectWithValue }): Promise<any> {
//     try {
//       const wishlistId = localStorage.getItem('wishlistId') ?? '';

//       return await WishlistService.updateWishlist({
//         wishlistId,
//         body: payload,
//       });
//     } catch (error: any) {
//       return rejectWithValue(getErrorMassage(error.response.status));
//     }
//   },
// );

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
  loading: false,
  loadingAddRemoveWishlist: false,
  loadingCarosel: false,
  productsLoading: false,
  bestProductLoading: false,
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
  },
  extraReducers: (builder) => {
    builder
      //fetchWishlist
      // .addCase(fetchWishlist.pending, handlePending)
      // .addCase(fetchWishlist.fulfilled, (state, action) => {
      //   state.wishlist = action.payload;
      //   state.loading = false;
      // })
      // .addCase(fetchWishlist.rejected, handleError)
      // // createWishlist
      // .addCase(createWishlist.pending, handlePending)
      // .addCase(createWishlist.fulfilled, (state, action) => {
      //   state.wishlist = action.payload;
      //   localStorage.setItem('wishlistId', action.payload.id!);
      //   state.loading = false;
      // })
      // .addCase(createWishlist.rejected, handleError)
      // //updateWishlist
      // .addCase(
      //   updateWishlist.pending,
      //   (state: { loadingAddRemoveWishlist: boolean }) => {
      //     state.loadingAddRemoveWishlist = true;
      //   },
      // )
      // .addCase(updateWishlist.fulfilled, (state, action) => {
      //   state.wishlist = action.payload;
      //   localStorage.setItem('wishlistId', action.payload.id!);
      //   state.loadingAddRemoveWishlist = false;
      // })
      // .addCase(updateWishlist.rejected, handleError)
      //fetchCategories
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

export const { clearSearchProducts, changeSearchQuery, clearSearchQuery } =
  globalSlicer.actions;

export default globalSlicer.reducer;
