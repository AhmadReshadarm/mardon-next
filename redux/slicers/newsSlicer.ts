import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TNewsRequest, TNewsState } from 'redux/types';
import { News, NewsDTO, NewsService } from 'swagger/services';
import { handlePaginationDataFormatter } from 'redux/helpers';
import { PayloadNews } from 'common/interfaces/payload-news.interface';

export const fetchNewsposts = createAsyncThunk<
  { rows: News[]; length: number },
  TNewsRequest,
  { rejectValue: string }
>(
  'tags/fetchNewsposts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await NewsService.getNews({
        ...payload,
        // limit: payload?.limit,
        // offset: payload?.offset,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchNewsById = createAsyncThunk<
  News,
  { id: string },
  { rejectValue: string }
>(
  'tags/fetchNewsById',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await NewsService.findNewsById({ newsId: payload.id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchNewsByUrl = createAsyncThunk<
  News,
  { url: string },
  { rejectValue: string }
>(
  'tags/fetchNewsByUrl',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await NewsService.findNewsByUrl({ url: payload.url });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createNews = createAsyncThunk<
  NewsDTO,
  PayloadNews,
  { rejectValue: string }
>(
  'tags/createNews',
  async function (payload: PayloadNews, { rejectWithValue }): Promise<any> {
    try {
      const { id, ...rest } = payload;
      return await NewsService.createNews({
        body: {
          ...rest,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const editNews = createAsyncThunk<
  NewsDTO,
  PayloadNews,
  { rejectValue: string }
>(
  'tags/editNews',
  async function (payload: PayloadNews, { rejectWithValue }): Promise<any> {
    try {
      const { id, ...rest } = payload;
      return await NewsService.updateNews({
        newsId: payload.id,
        body: { ...rest },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteNews = createAsyncThunk<
  News,
  string,
  { rejectValue: string }
>('tags/deleteNews', async function (id, { rejectWithValue }): Promise<any> {
  try {
    return await NewsService.deleteNews({ newsId: id });
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

const initialState: TNewsState = {
  newsPosts: [],
  news: null,
  loading: false,
  saveLoading: false,
  newsLenght: 0,
};

const newsSlicer = createSlice({
  name: 'newsPosts',
  initialState,
  reducers: {
    clearNewsPosts(state) {
      state.newsPosts = [];
    },
    clearNews(state) {
      state.news = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchNewsPosts
      .addCase(fetchNewsposts.pending, handlePending)
      .addCase(fetchNewsposts.fulfilled, (state, action) => {
        state.newsPosts = action.payload.rows;
        state.newsLenght = action.payload.length;
        // handlePaginationDataFormatter(action);
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchNewsposts.rejected, handleError)
      //fetchNews by ID
      .addCase(fetchNewsById.pending, handlePending)
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchNewsById.rejected, handleError)
      //fetchNews by URL
      .addCase(fetchNewsByUrl.pending, handlePending)
      .addCase(fetchNewsByUrl.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchNewsByUrl.rejected, handleError)
      //createNews
      .addCase(createNews.pending, handleChangePending)
      .addCase(createNews.fulfilled, (state) => {
        state.saveLoading = false;
        openSuccessNotification('Новости успешно создан');
        console.log('fulfilled');
      })
      .addCase(createNews.rejected, handleChangeError)
      //editNews
      .addCase(editNews.pending, handleChangePending)
      .addCase(editNews.fulfilled, (state, action) => {
        let news = state.newsPosts.find(
          (news) => news.id === action.payload.id,
        );
        news = {
          ...news,
          ...action.payload,
        };
        openSuccessNotification('Новости успешно обновлен');
        state.saveLoading = false;
        console.log('fulfilled');
      })
      .addCase(editNews.rejected, handleChangeError)
      //deleteNews
      .addCase(deleteNews.pending, handleChangePending)
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.newsPosts = state.newsPosts.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Новости успешно удален');
        console.log('fulfilled');
      })
      .addCase(deleteNews.rejected, handleChangeError);
  },
});

export const { clearNews, clearNewsPosts } = newsSlicer.actions;

export default newsSlicer.reducer;
