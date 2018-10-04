import * as React from "react";

export const makeOAuthButton = (WrappedComponent: React.StatelessComponent, oAuthService: IOAuthService) => {
  return class OAuthButton extends React.Component<{onAuthenticated: (userInfo: IUserInfo | void) => void}> {
    constructor(props: {onAuthenticated: (userInfo: IUserInfo | void) => void}) {
      super(props);
    }

    public openOAuthPopup = (mouseEvent: React.MouseEvent) => oAuthService
      .authenticateUser()
      .then(userInfo => this.props.onAuthenticated(userInfo));

    public render(): React.ReactElement<OAuthButton> {
      const {onAuthenticated, ...componentProps} = this.props;
      return <div onClick={this.openOAuthPopup}><WrappedComponent {...componentProps}/></div>
    }
  }
}

export interface IOAuthService {
  authenticateUser(): Promise<void | IUserInfo>;
}

export interface IUserInfo {
  userId?: string;
}