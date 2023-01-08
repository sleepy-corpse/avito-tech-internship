import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Paper, Typography } from '@mui/material';
import { selectors } from '../slices/newsSlice';

export default function Article() {
  const { id } = useParams();
  const store = useStore();
  const currentArticle = useSelector(() => selectors.selectById(store.getState(), Number(id)));
  const articleDate = new Date(currentArticle.time * 1000);
  return (
    <Container>
      <Paper sx={{ mt: '60px' }} elevation={3}>
        <Container>
          <Typography variant="h4" sx={{ textAlign: 'center', py: 3, fontWeight: 'bold' }}>
            {currentArticle.title}
          </Typography>
          <Typography fontSize="1.5rem">
            {currentArticle.by}
          </Typography>
          <Typography>
            {articleDate.toLocaleString()}
          </Typography>
          <hr />
          <Typography variant="h5">
            Link:
            <a href={currentArticle.url}>{currentArticle.url}</a>
          </Typography>
        </Container>
      </Paper>
    </Container>
  );
}
