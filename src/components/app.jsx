import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Login from './login/LoginComponent';
import UserProfile from './user/UserComponent';
import QuestionDetail from './Question/QuestionDetail';
import PostQuestion from './Question/PostQuestion';

import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'


const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/student/login' component={Login} />
            <Route exact path='/user' component={UserProfile} />
            <Route exact path='/question/detail' component={QuestionDetail} />
            <Route exact path='/question/post' component={PostQuestion} />
            {/* <Route exact path='/question/all' component={Questions} />
            <Route exact path='/question/detail/:question_id' component={Questions} /> */}
        </div>
    </BrowserRouter>
)

render(
    <App />,
    document.getElementById('root')
)
