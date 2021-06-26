import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const BtnIngredient = ({ item, PizzaIngredients, handleChange }) => {

  const [img, setImg] = useState(item.image)
  useEffect(() => {
    if (img) {
      fetch(`api/Ingredient/image/${item.image}`)
        .then((res) => {
          setImg(res.url)
        })
        .catch(error => {
          setImg('')
        });
    }
  }, [])
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={(PizzaIngredients ? (PizzaIngredients.includes(item._id)) : false)}
          onChange={handleChange}
          id={item._id}
          value={item.price}
          name={item.name}
          color="primary"
        />
      }
      label={`${item.name}  -   € ${item.price} `}
    />
  )
}

export default BtnIngredient;

