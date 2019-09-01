import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import './componentsCSS/profileCard.css'

import { theme } from './theme'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export default function ProfileCard(props) {
  const classes = useStyles();
  const name = `${props.user.firstName} ${props.user.lastName}`

  return (
      <div className="mb-3">
        <ThemeProvider theme={theme}>
            <Card className={classes.card}>
            <CardMedia
            component="img"
            alt={name}
            height="140"
            image="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/08/code-1839406_1920-796x531.jpg"
            title={name}
            />
            <div class="text-center" id="profileCardAvatarContainer">
                <img src="data:image/png;base64,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" class="rounded-circle img-thumbnail w-50" style={{ backgroundColor: '#7da2a9' }} id="profileCardAvatar" alt="..."/>
            </div>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
            </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
            </Card>
        </ThemeProvider>
    </div>
  );
}