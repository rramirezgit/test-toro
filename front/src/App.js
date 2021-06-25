import React from 'react';
import Pizzas from "./views/Pizzas/Pizzas";
// import NewPizza from './views/NewPizza/NewPizza';
// import PizzaEdit from './views/EditPizza/PizzaEdit';
// import DetailsPizzaContainer from './views/DetailsPizza/DetailsPizzaContainer'
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
          {/* <Route exact path="/newPizza" component={NewPizza} /> 
          <Route exact path="/Pizza/:PizzaId" component={DetailsPizzaContainer} /> 
          <Route exact path="/Pizza/:PizzaId/edit" component={PizzaEdit} />  */}
                  
          </Switch>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;

