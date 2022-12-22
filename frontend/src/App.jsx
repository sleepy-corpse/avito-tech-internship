import React, { useEffect } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import Article from './pages/Article';
import NewsFeed from './pages/NewsFeed';
import paths from './routes';
import store from './slices';
import { actions as newsActions } from './slices/newsSlice';

const fetchNews = (isUsersClick = false) => {
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
      if (!isUsersClick) {
        setTimeout(fetchNews, 60000);
      }
    });
};

export default function App() {
  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/article">
          <Article />
        </Route>
        <Route path="/">
          <NewsFeed />
        </Route>
      </Switch>
    </Provider>
  );
}
