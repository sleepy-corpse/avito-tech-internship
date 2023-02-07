import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import Article from './pages/Article';
import NewsFeed from './pages/NewsFeed';
import fetchNews from './fetchNews';

export default function App() {
  useEffect(() => {
    fetchNews();
  }, []);
  const history = useHistory();
  const isLoading = useSelector((state) => state.news.isLoading === 'pending');

  const redirectToMainPage = () => {
    history.push('/');
  };

  return (
    <>
      <AppBar sx={{ px: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button sx={{ display: 'block', color: 'white' }} onClick={redirectToMainPage}>
          <Typography variant="h5">
            Hacker News
          </Typography>
        </Button>
        <IconButton
          sx={{ display: 'block', color: 'white', borderRadius: 0 }}
          onClick={() => fetchNews(true)}
          disabled={isLoading}
        >
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
    </>
  );
}
