/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState({
  isLoading: 'idle',
});

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    changeLoadingStatusComments: (state, { payload }) => {
      state.isLoading = payload;
    },
    addComments: commentsAdapter.addMany,
    clearComments: commentsAdapter.removeAll,
  },
});

export const selectors = commentsAdapter.getSelectors((state) => state.comments);
export const { actions } = slice;
export default slice.reducer;
