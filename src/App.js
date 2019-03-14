import React, { Component } from 'react';
import './app.module.scss';
import HeaderComponent from './Components/Headers/headers';
import CardComponent from './Components/Cards/cards';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <CardComponent />
      </div>
    );
  }
}

export default App;
