import axios from 'axios';
import paths from './routes';
import store from './slices';
import { actions as newsActions } from './slices/newsSlice';

const fetchNews = () => {
  const currentNewsIds = store.getState().news.ids;
  axios.get(paths.getNewsListUrl())
    .then((resp) => {
      const newsIdList = resp.data.slice(0, 100);
      const idsToFetch = currentNewsIds.length
        ? newsIdList.filter((newsId) => !currentNewsIds.includes(newsId))
        : newsIdList;
      const newsPromises = idsToFetch.map((newsId) => axios.get(paths.getNewsByIdUrl(newsId)));
      return Promise.all(newsPromises);
    })
    .then((newsResponses) => {
      const news = newsResponses.map((resp) => {
        const { data } = resp;
        /* sometimes the response data is null, so to avoid errors
        I return an object with only one field that contain the id of the current request */
        if (!data) {
          return {
            id: Number(resp.request.responseURL.split('/').at(-1).split('.')[0]),
          };
        }
        return data;
      });
      if (news.length) {
        store.dispatch(newsActions.addNews(news));
      }
    })
    .finally(() => {
      setTimeout(fetchNews, 60000);
    });
};

export default fetchNews;
