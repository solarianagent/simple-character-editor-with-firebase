import { firebase, googleProvider } from '../firebase';
import { IOAuthService } from './OAuthButton';

class GoogleOAuthService implements IOAuthService{
  public authenticateUser() {
      return firebase.auth().signInWithPopup(googleProvider)
        .then(result => result && result.user && result.user.uid ? {userId: result.user.uid} : {})
        .catch(() => ({}));
  }
}

export default new GoogleOAuthService();