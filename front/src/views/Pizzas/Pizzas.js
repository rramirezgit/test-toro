import React, { useEffect, useState, useContext } from 'react';
// import { DataContext } from '../../components/context/DataContext';
import ListPizzas from '../../components/Pizzas/ListPizzas/ListPizzas';
// import SearchBar from 'material-ui-search-bar';

import './style.css';
import { Container } from '@material-ui/core';



const Pizzas = () => {

    // const { savePizzas } = useContext(DataContext);

    //State to save search from input
    // const [searchValue, setSearchValue] = useState('');

    // //Function to get items by search
    // useEffect(() => {
    //     // history.push('/')
    //     fetch(`api/pizzas?q=${searchValue}`)
    //         .then(res => res.json())
    //         .then(
    //             (data) => {
    //                 data.length !== 0 ?
    //                     savePizzas({
    //                         items: data
    //                     })
    //                     : savePizzas({
    //                         items: data
    //                     })
    //             })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, [searchValue])

    return (
        <>
            <div  className="background-view">
                <div style={{ margin: "100px auto", width: "90%" }} className="containerGrid">
                    <Container>
                        {/* <SearchBar
                            value={searchValue}
                            // onChange={(e) => setSearchValue(e) }  

                            onRequestSearch={(e) => setSearchValue(e)}
                            placeholder="Search ..."
                            autoFocus
                        /> */}
                        
                        <ListPizzas />
                       
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Pizzas;