import * as React from 'react'; 
import { Redirect, Route, Switch } from 'react-router';

import Authentication from './authentication/Authentication';
import CharacterEdit from './characters/CharacterEdit';
import Characters from './characters/Characters';
import sessionService from './SessionService';

const LoggedInRoutes = () => {
  return <Switch>
            <Route path='/characters' component={Characters} />
            <Route path='/character/:id?' component={CharacterEdit} />
            <Redirect from='/' to='characters' />
          </Switch>;
}

const LoggedOutRoutes = () => {
  return  <Switch>
            <Route path='/login' component={Authentication}/>
            <Redirect from='/' to='/login' />
          </Switch>; 
}

const Content = () => {
  return sessionService.getUserId() ?  <LoggedInRoutes /> : <LoggedOutRoutes />;
}

export default Content;