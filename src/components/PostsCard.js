import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import store from "../redux/store";

import {
    faComment,
    faHeart,
    faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
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

export default function PostsCard(props) {
    useEffect(() => {
        const jwtDecode = require("jwt-decode");
        const token = sessionStorage.getItem("CWJWT");
        const decodedToken = jwtDecode(token);
        const tokenId = decodedToken._id;
        const posterId = props.post.userId;
        if (tokenId === posterId) {
            setIsOwnPost(true);
        }
    });

    const [isOwnPost, setIsOwnPost] = useState(false);

    const classes = useStyles();
    const post = `/post/${props.post._id}`;
    return (
        <div className="mb-3">
            <Card button className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.post.firstName[0]}
                        </Avatar>
                    }
                    action={
                        isOwnPost ? (
                            <IconButton aria-label="settings">
                                <FontAwesomeIcon size="md" icon={faEllipsisV} />
                            </IconButton>
                        ) : (
                            <div></div>
                        )
                    }
                    title={props.post.title}
                    subheader="September 14, 2016"
                    className="p-1"
                />
                <Link
                    to={post}
                    style={{ textDecoration: "none", color: "black" }}
                >
                    <CardActionArea>
                        <CardContent className="p-1">
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {props.post.subTitle}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton
                                className="p-0 mr-3"
                                aria-label="add to favorites"
                            >
                                <FontAwesomeIcon
                                    size="sm"
                                    className="mr-1"
                                    icon={faHeart}
                                />{" "}
                                {props.post.likes.length}
                            </IconButton>
                            <IconButton className="p-0" aria-label="share">
                                <FontAwesomeIcon
                                    className="mr-1"
                                    size="sm"
                                    icon={faComment}
                                />{" "}
                                {props.post.comments.length}
                            </IconButton>
                        </CardActions>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
}
