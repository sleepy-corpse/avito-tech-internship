import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import { Provider } from 'react-redux';
import Article from './pages/Article';
import NewsFeed from './pages/NewsFeed';
import store from './slices';
import fetchNews from './fetchNews';

export default function App() {
  useEffect(() => {
    fetchNews();
  }, []);
  const history = useHistory();

  const redirectToMainPage = () => {
    history.push('/');
  };
  return (
    <Provider store={store}>
      <AppBar sx={{ px: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button sx={{ display: 'block', color: 'white' }} onClick={redirectToMainPage}>
          <Typography variant="h5">
            Hacker News
          </Typography>
        </Button>
        <IconButton sx={{ display: 'block', color: 'white', borderRadius: 0 }}>
          <ReplayIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
      </AppBar>
      <Switch>
        <Route path="/article/:id">
          <Article />
        </Route>
        <Route path="/">
          <NewsFeed />
        </Route>
      </Switch>
    </Provider>
  );
}
