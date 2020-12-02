import * as firebase from 'firebase/app';
import 'firebase/auth';
import {SignInOptions, TwitterSignInResult} from '../definitions';
import OAuthCredential = firebase.default.auth.OAuthCredential;

export const twitterSignInWeb: (options: {providerId: string, data?: SignInOptions}) => Promise<TwitterSignInResult>
    = async () => {

    try {
        const provider = new firebase.default.auth.TwitterAuthProvider();
        firebase.default.auth().useDeviceLanguage();

        const userCredential = await firebase.default.auth().signInWithPopup(provider);

        const {credential}: { credential: OAuthCredential; } = userCredential;
        return new TwitterSignInResult(credential.accessToken, credential.secret);
    } catch (e) {
        return Promise.reject(e);
    }

}
