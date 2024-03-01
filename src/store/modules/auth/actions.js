import { auth } from '../../../firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
    async logIn(context, payload) {
        try {
            const user = await signInWithEmailAndPassword(auth, payload.email, payload.password);
            context.commit('setUser', {
                token: user._tokenResponse.idToken,
                userId: user._tokenResponse.localId,
                tokenExpiration: user._tokenResponse.expiresIn
            });
        }
        catch(error) {
            throw new Error(error.message || "Login failed! No error message provided!");
        }
    },
    async signUp(context, payload) {
        try {
           const user = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
           context.commit('setUser', {
                token: user._tokenResponse.idToken,
                userId: user._tokenResponse.localId,
                tokenExpiration: user._tokenResponse.expiresIn
           });
        }
        catch (error) {
            throw new Error(error.message || "Creating user failed! No error message provided!");
        }
    },
    logOut(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });
    }
};