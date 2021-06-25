import React, { createContext, useState } from 'react';

export const DataContext = createContext(); 

const DataProvider = (props) => {

    //Status to pass the pizzas globally through the app
    const [ Pizzas, savePizzas ] = useState([]);

    return (
        <DataContext.Provider
            value={{
                Pizzas,
                savePizzas
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;