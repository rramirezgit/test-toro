import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '45%',
    marginBottom: '11px',

  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const ProductCard = ({ item }) => {

  const [img, setImg] = useState(item.image)
  useEffect(() => {
    if (img) {
      fetch(`api/pizzas/image/${item.image}`)
        .then((res) => {
          setImg(res.url)
        })
        .catch(error => {
          setImg('')
        });
    }
  }, [])

  const history = useHistory();

  const classes = useStyles();

  const redirectToProduct = (e) => {
    history.push(`/pizza/${e.currentTarget.id}`);
  }

  return (
    <Card className={classes.root} id={item._id}
      onClick={redirectToProduct}>
      <CardMedia
        className={classes.cover}
        image={img}
        title={item.name}
      />
      <CardActionArea>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              €{item.price}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>

    </Card>
  )
}

export default ProductCard;

