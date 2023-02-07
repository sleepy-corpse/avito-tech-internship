import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import commentsReducer from './commentsSlice';

export default configureStore({
  reducer: {
    news: newsReducer,
    comments: commentsReducer,
  },
});
