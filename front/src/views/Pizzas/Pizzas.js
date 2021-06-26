import React  from 'react';
import ListPizzas from '../../components/Pizzas/ListPizzas/ListPizzas';
import './style.css';
import { Container } from '@material-ui/core';

const Pizzas = () => {
    return (
        <>
            <div  className="background-view">
                <div style={{ margin: "100px auto", width: "90%" }} className="containerGrid">
                    <Container>
                        <ListPizzas />                       
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Pizzas;