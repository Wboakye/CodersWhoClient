import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import renderHTML from "react-render-html";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    padding: "16px"
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

export default function PostComment(props) {
  const classes = useStyles();
  return (
    <div>
      <Card className="p-3 mb-1" style={{ minWidth: 275 }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.comment.firstName[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <FontAwesomeIcon size="md" icon={faEllipsisV} />
            </IconButton>
          }
          title={`${props.comment.firstName} ${props.comment.lastName}`}
          subheader="September 14, 2016"
          className="p-1"
        />
        <CardContent className="p-1">
          <Typography variant="body2" color="textSecondary" component="p">
            {renderHTML(props.comment.comment)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
