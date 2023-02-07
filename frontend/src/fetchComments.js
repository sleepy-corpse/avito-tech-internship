import axios from 'axios';
import paths from './routes/index';
import store from './slices/index';
import { actions as commentsActions } from './slices/commentsSlice';

export default async (commentIds) => {
  store.dispatch(commentsActions.changeLoadingStatusComments('pending'));
  const promises = commentIds.map((id) => axios.get(paths.getItemByIdUrl(id)));
  const comments = (await Promise.all(promises)).map((response) => response.data);
  store.dispatch(commentsActions.changeLoadingStatusComments('idle'));
  store.dispatch(commentsActions.addComments(comments));
};
