import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Main = () => (
    <div>
        <h1>Hello!</h1>
    </div>
)

const Login = () => (
    <div>
        <h2>ok</h2>
    </div>
)

const App = () => (
    <div>
        <Route exact path='/' component={Main} />
        <Route exact path='/login' component={Login} />
    </div>
)

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
  );