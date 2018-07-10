import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Login from './login/LoginComponent';
import UserProfile from './user/UserComponent';

import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers/reducer'

const store = createStore(reducer);

(store) => {
    console.log(store);
    console.log(store.getState());
}

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/user' component={UserProfile} />
        </div>
    </BrowserRouter>
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
