import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Container,
    Divider
} from '@material-ui/core';
import BtnIngredient from '../BtnIngredients/BtnIngredient';
import PageLoading from '../../../views/PageLoading/PageLoading';
import "./style.css"

const ListIngredient = ({ ingredientsPizza, handleChange }) => {

    const [loading, setLoadig] = useState(true);
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        fetch(`/api/ingredients`)
            .then(res => res.json())
            .then((data) => {
                setIngredients({ items: data.Ingredients })
                setLoadig(false)
            })
            .catch(error => {
                setIngredients({ items: [] })
                setLoadig(false)
            });
    }, [])

    if (loading === true) {
        return <PageLoading />;
    }

    return (
        <Container>
            <Box className="containerBox_Ingredient" style={{ display: "flex", flexWrap: "wrap", marginTop: '10%', border: 'solid #ff00006e', borderRadius: '8%' }}>
                <span className="text_Ingredients"> Carnes</span>
                {
                    ingredients.items.map(Ingredient => (
                        Ingredient.type == "carne" ?
                            <Box>
                                <ul key={Ingredient.id}>
                                    <BtnIngredient
                                        key={Ingredient.id}
                                        item={Ingredient}
                                        PizzaIngredients={ingredientsPizza}
                                        handleChange={handleChange}
                                    />
                                </ul>
                            </Box> : <span></span>
                    ))
                }
            </Box>
            <Box className="containerBox_Ingredient" style={{ display: "flex", flexWrap: "wrap", marginTop: '1%', border: 'solid #ff00006e', borderRadius: '8%' }}>
                <span className="text_Ingredients"> vergetales</span>
                {
                    ingredients.items.map(Ingredient => (
                        Ingredient.type != "carne" ?
                            <Box>
                                <ul key={Ingredient.id}>
                                    <BtnIngredient
                                        key={Ingredient.id}
                                        item={Ingredient}
                                        PizzaIngredients={ingredientsPizza}
                                        handleChange={handleChange}
                                    />
                                </ul>
                            </Box> : <span></span>
                    ))
                }
            </Box>
        </Container>
    );
}

export default ListIngredient;