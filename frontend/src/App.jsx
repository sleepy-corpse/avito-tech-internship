import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Article from './pages/Article';
import NewsFeed from './pages/NewsFeed';

export default function App() {
  return (
    <Switch>
      <Route path="/article">
        <Article />
      </Route>
      <Route path="/">
        <NewsFeed />
      </Route>
    </Switch>
  );
}
