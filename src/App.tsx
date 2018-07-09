import * as React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import { getToken } from './utils/lsUtil';

class App extends React.Component {
    public render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={this.getDefaultPath} />
                    <Route path="/login" component={Login} />
                    <Route path="/main" component={Main} />
                </Switch>
            </HashRouter>
        );
    }

    private getDefaultPath = (): JSX.Element => {
        return !!getToken() ? <Redirect to="/main" /> : <Redirect to="/login" />;
    };
}

export default App;
