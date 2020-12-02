import * as firebase from 'firebase/app';
import 'firebase/auth';
import {GoogleSignInResult, SignInOptions} from '../definitions';
import OAuthCredential = firebase.default.auth.OAuthCredential;

export const googleSignInWeb: (options: {providerId: string, data?: SignInOptions}) => Promise<GoogleSignInResult>
    = async () => {
        try {

            const provider = new firebase.default.auth.GoogleAuthProvider();
            firebase.default.auth().useDeviceLanguage();

            const userCredential = await firebase.default.auth().signInWithPopup(provider);

            const {credential}: { credential: OAuthCredential } = userCredential;
            return new GoogleSignInResult(credential.idToken);

        } catch (e) {
            return Promise.reject(e);
        }
    }
