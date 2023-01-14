/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const newsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.id > b.id,
});

const initialState = newsAdapter.getInitialState({
  isLoading: 'idle',
});

const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    changeLoadingStatus: (state, { payload }) => {
      state.isLoading = payload;
    },
    addNews: (state, { payload }) => {
      if (state.ids.length) {
        const { ids } = state;
        const payloadSize = payload.length;
        newsAdapter.removeMany(state, ids.slice(0, payloadSize));
      }
      newsAdapter.addMany(state, payload);
    },
  },
});

export const selectors = newsAdapter.getSelectors((state) => state.news);
export const { actions } = slice;
export default slice.reducer;
