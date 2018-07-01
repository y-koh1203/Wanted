import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import Header from './header/HeaderComponet';
import Login from './login/LoginComponent';

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
        <Route exact path='/' component={Login} />
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