import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

export default function NewsFeed(props) {
  const { news } = props;
  const newsDate = new Date(news.time * 1000);

  return (
    <ListItem>
      <ListItemButton>
        <ListItemText
          disableTypography
          primary={(
            <Typography>
              {news.title}
            </Typography>
          )}
          secondary={(
            <>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {`by ${news.by}`}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {newsDate.toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {`score: ${news.score}`}
              </Typography>
            </>
          )}
        />
      </ListItemButton>
    </ListItem>
  );
}

NewsFeed.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    score: PropTypes.number,
    time: PropTypes.number,
    by: PropTypes.string,
  }).isRequired,
};
