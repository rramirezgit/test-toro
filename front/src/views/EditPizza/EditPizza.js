import React, { useState, useEffect } from 'react';
import './EditPizza.css';
import {
  Grid,
  Container
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListIngredient from '../../components/Ingredients/ListiIgredients/ListIngredient';
import PageLoading from '../PageLoading/PageLoading';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    width: '52%',
    borderRadius: '0%',
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor: '#ff0015'
  },
}));

const EdditPizza = (props) => {

  const classes = useStyles();
  const [state, setstate] = useState({
    loading: true,
    error: null,
    pizza: {},
    imagePizza: ''
  })

  useEffect(() => {
    fetch(`/api/pizzas/${props.match.params.id}`)
      .then(res => res.json())
      .then((data) => {
        setstate({ ...state, pizza: data.pizza[0] })
      })
  }, [])

  const calculatePrice = () => {
    let totalPrice = 0
    let PizzaIngredients = state.pizza.ingredients
    PizzaIngredients.forEach(element => {
      totalPrice += element.price
    });
    let newPricePercent = parseFloat(((50 * totalPrice) / 100).toFixed(2))
    totalPrice = parseFloat((totalPrice + newPricePercent).toFixed(2))

    totalPrice == 0 ? totalPrice = 1 : totalPrice = totalPrice // 
    return totalPrice
  }

  useEffect(() => {
    if (state.pizza.image) {
      fetch(`/api/pizzas/image/${state.pizza.image}`)
        .then((res) => setstate({ ...state, loading: false, imagePizza: res.url }))
    }
  }, [state.pizza])

  const handleChange = e => {
    let newIngredient = e.target
    let PizzaIngredients = state.pizza.ingredients || []


    if (newIngredient.checked) {
      PizzaIngredients.push({ _id: newIngredient.id, price: parseFloat(newIngredient.value) })
    } else {
      let indexDelete = PizzaIngredients.findIndex(ingredient => ingredient._id == newIngredient.id)
      PizzaIngredients.splice(indexDelete, 1)
    }

    setstate({
      ...state,
      pizza: {
        ...state.pizza,
        ingredients: PizzaIngredients
      }
    });
  };


  if (state.loading) {
    return <PageLoading />;
  }
  if (state.pizza.ingredients) {
    calculatePrice()
  }
  return (
    <>
      <span className="pizzaEdit__hero">{state.pizza.name}</span>
      <div className="containerGrid">
        <Grid container item xs={9}>
          <Container style={{ marginTop: '15%', marginLeft: '1%' }}>
            <img className="pizzaEdit-img" src={state.imagePizza} alt="" />
          </Container>

        </Grid>
        <Grid container item xs={6}>
          <ListIngredient
            ingredientsPizza={(state.pizza.ingredients ? state.pizza.ingredients.map(i => i._id) : [])}
            handleChange={handleChange} />
        </Grid>
      </div>
      <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: "0", backgroundColor: "#000000eb" }}>
        <Toolbar>
          <IconButton edge="end" color="inherit">
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            {`pizza - ${state.pizza.name} €${calculatePrice()}`}
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );


}

export default EdditPizza