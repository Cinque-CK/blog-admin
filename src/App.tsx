import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';

class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Switch>
          
          <Route path="/login" component={Login}/>
          <Route path="/main" component={Main}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
