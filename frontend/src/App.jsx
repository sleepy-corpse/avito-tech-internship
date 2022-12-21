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

const fetchNews = async () => {
  const resp = await axios.get(paths.getNewsListUrl());
  const newsIdList = resp.data.slice(0, 100);
  const newsPromises = newsIdList.map((newsId) => axios.get(paths.getNewsByIdUrl(newsId)));
  Promise.all(newsPromises).then((newsResponses) => {
    const news = newsResponses.map(({ data }) => data);
    store.dispatch(newsActions.addNews(news));
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
