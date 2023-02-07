import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Link, Paper, Typography } from '@mui/material';
import { selectors } from '../slices/newsSlice';
import { actions as commentsActions } from '../slices/commentsSlice';
import Comments from '../components/Comments';
import fetchComments from '../fetchComments';

export default function Article() {
  const { id } = useParams();
  const store = useStore();
  const currentArticle = useSelector(() => selectors.selectById(store.getState(), Number(id)));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentsActions.clearComments());
    if (currentArticle.descendants) {
      fetchComments(currentArticle.kids);
    }
  }, []);

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
            <Link
              sx={{ overflowWrap: 'break-word' }}
              href={currentArticle.url}
              target="_blank"
              rel="noopener"
            >
              {currentArticle.url}
            </Link>
          </Typography>
        </Container>
        <Container>
          <Typography variant="h5" sx={{ mt: 3 }}>
            {`Comments(${currentArticle.descendants}):`}
          </Typography>
          <Comments />
        </Container>
      </Paper>
    </Container>
  );
}
