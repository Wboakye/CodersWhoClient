import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import { faComment, faHeart, faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { theme } from './theme'



const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#7da2a9',
  },
}));

export default function PostsCard(props) {
    const classes = useStyles();
    const name = `${props.post.firstName} ${props.post.lastName}`
  return (
      <div className="mb-3">
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.post.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <FontAwesomeIcon size="lg" icon={faEllipsisV} />
          </IconButton>
        }
        title={props.post.title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.post.subTitle}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <FontAwesomeIcon size="lg" icon={faHeart} />
        </IconButton>
        <IconButton aria-label="share">
            <FontAwesomeIcon size="lg" icon={faComment} />
        </IconButton>
      </CardActions>
    </Card>
    </div>
  );
}
