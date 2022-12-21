import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const newsAdapter = createEntityAdapter();

const initialState = newsAdapter.getInitialState();

const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: newsAdapter.addMany,
  },
});

export const selectors = newsAdapter.getSelectors((state) => state.news);
export const { actions } = slice;
export default slice.reducer;
