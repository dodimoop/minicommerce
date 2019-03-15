import React, { Component } from 'react';
import './app.module.scss';
import HeaderComponent from './Components/Headers/headers';
import CardComponent from './Components/Cards/cards';
import DetailsCard from './Components/DetailsCard/detailsCard';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={CardComponent} />
          <Route path="/product/:id" component={DetailsCard} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
