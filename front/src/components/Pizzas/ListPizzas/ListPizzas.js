import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Container
} from '@material-ui/core';
import { DataContext } from '../../context/DataContext';
import PizzaCard from '../PizzaCard/PizzaCard';
import PageLoading from '../../../views/PageLoading/PageLoading';
import './style.css';


const ListPizzas = () => {

    const [loading, setLoadig] = useState(true);
    const { Pizzas, savePizzas } = useContext(DataContext);

    useEffect(() => {
        fetch(`/api/pizzas`)
            .then(res => res.json())
            .then(
                (data) => {
                    savePizzas({
                        items: data.pizzas
                    })
                    setLoadig(false)
                })
            .catch(error => {
                savePizzas({
                    items: []
                })
                setLoadig(false)

            });
    }, [])

    if (loading === true) {
        return <PageLoading />;
    }

    return (
        <Container className="mainContainer_Pizzas" >
            <Box className="containerBox_Pizza"  style={{ display: "flex", flexWrap: "wrap",justifyContent: "space-around" }}>
                {
                    Pizzas.items.map(Pizza => (
                        <PizzaCard
                            key={Pizza.id}
                            item={Pizza}
                        />
                    ))
                }
            </Box>
        </Container>
    );
}

export default ListPizzas;