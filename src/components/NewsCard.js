import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { theme } from "./theme";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function NewsCard(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className="col-xl-3 col-lg-4 col-md-6  mb-3">
        <Card className={classes.card}>
          <CardActionArea disabled>
            <CardMedia
              className={classes.media}
              image={props.articles.urlToImage}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.articles.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.articles.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href={props.articles.url} size="small" color="secondary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    </ThemeProvider>
  );
}
