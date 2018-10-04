import * as React from 'react';
import { Redirect } from 'react-router';

import sessionService from '../SessionService';
import googleOAuthService from './GoogleOAuthService'; 
import { IUserInfo, makeOAuthButton } from './OAuthButton';

const GoogleSignInButton = () => <button className="pure-button pure-button-primary">Sign in with Google</button>;
const GoogleOAuthButton = makeOAuthButton(GoogleSignInButton, googleOAuthService);

class Authentication extends React.Component<{}, {toCharacters: boolean}> {
  constructor(props: React.Props<{}>) {
    super(props);
    this.state = {toCharacters: false};
  }
  public handleOnAuthenticaticated = ({userId}: IUserInfo) =>  {
    if(typeof userId !== 'undefined'){
      sessionService.setUserId(userId);
      this.setState({toCharacters: true});      
    }
  }

  public render() {
    return this.state.toCharacters ? 
      <Redirect to="/characters" /> :
      <GoogleOAuthButton onAuthenticated={this.handleOnAuthenticaticated}/>;  
  }
}

export default Authentication;