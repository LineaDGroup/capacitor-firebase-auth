import * as firebase from 'firebase/app';
import 'firebase/auth';
import {FacebookSignInResult, SignInOptions} from '../definitions';
import OAuthCredential = firebase.default.auth.OAuthCredential;

export const facebookSignInWeb: (options: {providerId: string, data?: SignInOptions}) => Promise<FacebookSignInResult>
    = async () => {
    const provider = new firebase.default.auth.FacebookAuthProvider();
    firebase.default.auth().useDeviceLanguage();

    const userCredential = await firebase.default.auth().signInWithPopup(provider);

    const {credential}: { credential: OAuthCredential; } = userCredential;
    return new FacebookSignInResult(credential.accessToken);
}
