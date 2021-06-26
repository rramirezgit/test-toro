import React from 'react';
import Pizzas from "./views/Pizzas/Pizzas";
import editPizza from "./views/EditPizza/EditPizza";
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import DataProvider from './components/context/DataContext';

function App() {

  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Switch>
          <Route exact path="/" component={Pizzas} />
          <Route exact path="/pizza/:id" component={editPizza} />                  
          </Switch>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;

