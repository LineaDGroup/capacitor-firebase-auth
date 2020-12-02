import {Observable, of, pipe, UnaryFunction} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app';

/**
 * Operator to map firebase.default.User to firebase.default.UserInfo.
 *
 * Sample of use:
 *
 * ```ts
 * import {cfaSignIn, mapUserToUserInfo} from 'capacitor-firebase-auth';
 * import {UserInfo} from 'firebase/app';
 *
 * cfaSignIn('google.com').pipe(
 *     mapUserToUserInfo(),
 * ).subscribe(
 *     (user: UserInfo) => console.log(user.displayName);
 * )
 * ```
 */
export const mapUserToUserInfo = (): UnaryFunction<Observable<firebase.default.User>, Observable<firebase.default.UserInfo>> =>
	pipe(
		switchMap((user: firebase.default.User) => {
			if (user) {
				const {uid, providerId, displayName, photoURL, phoneNumber, email} = user;
				return of({uid, providerId, displayName, photoURL, phoneNumber, email});
			}

			return of(user);
		}),
	);

/**
 * Operator to map firebase.default.auth.UserCredential to firebase.default.UserInfo.
 *
 * For use with alternative facade only.
 *
 * Sample of use:
 *
 * ```ts
 * import {cfaSignIn, mapUserToUserInfo} from 'capacitor-firebase-auth/alternative';
 * import {UserInfo} from 'firebase/app';
 *
 * cfaSignIn('google.com').pipe(
 *     mapUserToUserInfo(),
 * ).subscribe(
 *     (user: UserInfo) => console.log(user.displayName);
 * )
 * ```
 */
export const mapUserCredentialToUserInfo = (): UnaryFunction<Observable<{userCredential: firebase.default.auth.UserCredential}>, Observable<firebase.default.UserInfo>> =>
	pipe(
		switchMap(({userCredential}: {userCredential: firebase.default.auth.UserCredential}) => {
			if (!!userCredential) {
				const {uid, providerId, displayName, photoURL, phoneNumber, email} = userCredential.user;
				return of({uid, providerId, displayName, photoURL, phoneNumber, email});
			}

			return of(null);
		}),
	);
