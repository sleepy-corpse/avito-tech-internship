import React from 'react';
import List from '@mui/material/List';
import {
  Container,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  Snackbar,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/newsSlice';
import NewsItem from '../components/NewsItem';

function Placeholder() {
  const listItems = [0, 1, 3, 4, 5];
  return (
    <>
      {listItems.map((i) => (
        <ListItem key={i}>
          <Stack width="100%">
            <Skeleton sx={{ width: '60%', height: '2rem' }} />
            <Skeleton sx={{ width: '20%', height: '1rem' }} />
            <Skeleton sx={{ width: '30%', height: '1rem' }} />
            <Skeleton sx={{ width: '20%', height: '1rem' }} />
          </Stack>
        </ListItem>
      ))}
    </>
  );
}

export default function NewsFeed() {
  const newsObj = useSelector(selectors.selectEntities);
  const news = Object.values(newsObj).reverse();
  const isSnackbarOpen = useSelector((state) => state.news.isLoading) === 'pending';

  return (
    <Container sx={{ mt: '50px' }}>
      <Paper elevation={4}>
        <List>
          {news.length
            ? news.map((newsItem) => (
              <NewsItem
                news={newsItem}
                key={newsItem.id}
              />
            ))
            : <Placeholder />}
        </List>
      </Paper>
      <Snackbar
        open={isSnackbarOpen}
      //  onClose={handleToastClose}
        autoHideDuration={4000}
        message="Updating the feed..."
      />
    </Container>
  );
}
