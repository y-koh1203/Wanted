import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <AppFrame />
  </BrowserRouter>
  ),
  document.getElementById('root'),
);

class AppFrame extends Component {
  render() {
    return (
      <main>
        <Switch>
            <Route exact path='/get'   component={Login} />
            <Route exact path='/getbook' component={GetBooks} />
            <Route exact path='/addbook' component={Addbook} />
        </Switch>
      </main>
    );
  }
}

class Login extends React.Component{
    render(){
        return(
            <div>
                test
            </div>
        )
    }
}

class GetBooks extends React.Component{
    render(){
        return(
            <div>
                testa
            </div>
        )
    }
}

class Addbook extends React.Component{
    render(){
        return(
            <div>
                testb
            </div>
        )
    }
}