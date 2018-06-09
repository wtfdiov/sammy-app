import React, { Component } from 'react';
import './App.css';
import 'react-chat-elements/dist/main.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from './Dashboard';
import Chat from './Chat';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/Chat/:name/:email" component={Chat} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
