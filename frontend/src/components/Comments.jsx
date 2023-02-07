import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { selectors as commentsSelectors } from '../slices/commentsSlice';

export default function Comments() {
  const commentsObj = useSelector(commentsSelectors.selectEntities);
  const comments = Object.values(commentsObj);
  const renderComment = (comment) => {
    const commDate = new Date(comment.time * 1000);
    return (
      <ListItem key={comment.id}>
        <ListItemText
          disableTypography
          primary={(
            <>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {comment.by}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {commDate.toLocaleString()}
              </Typography>
            </>
          )}
          secondary={(
            <Typography dangerouslySetInnerHTML={{ __html: comment.text }} />
          )}
        />
      </ListItem>
    );
  };

  return (
    <List>
      {comments.map((comment) => renderComment(comment))}
    </List>
  );
}
