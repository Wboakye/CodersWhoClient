import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import {
  faComment,
  faHeart,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "#7da2a9"
  }
}));

export default function PostsCard(props) {
  const classes = useStyles();
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
