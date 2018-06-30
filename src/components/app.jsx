import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import Header from './header/HeaderComponet';
import Login from './login/LoginComponent';

const Main = () => (
    <div>
        <h1>Hello!</h1>
    </div>
)

class test extends React.Component{
    render(){
        return(
            <div>test</div>
        )
    }
}

const App = () => (
    <div>
        <Header />
        <Route exact path='/' component={Main} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/test' component={test} />
    </div>
)

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
  );