import { auth } from '../../../firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

let logoutTimer;

export default {
    async logIn(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signUp(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },
    async auth(context, payload) {
        try {
            let user = null;
            if(payload.mode === 'login') {
                user = await signInWithEmailAndPassword(auth, payload.email, payload.password);
            }
            else {
                user = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
            }

            localStorage.setItem('token', user._tokenResponse.idToken);
            localStorage.setItem('userId', user._tokenResponse.localId);

            //Adding a + before the value forces a conversion to a number
            //We also need it in milliseconds, therefore *1000
            const expiresIn = +user._tokenResponse.expiresIn * 1000 ;
            const expirationDate = new Date().getTime() + expiresIn;
            localStorage.setItem('tokenExpiration', expirationDate);

            logoutTimer = setTimeout(() => {
                context.dispatch('autoLogout');
            }, expiresIn);

            context.commit('setUser', {
                token: user._tokenResponse.idToken,
                userId: user._tokenResponse.localId,
           });
        }
        catch(error) {
            throw new Error(error.message || "Authentication failed! No error message provided!");
        }
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        //The + will convert even null or undefined to a 0
        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn < 0) {
            return;
        }

        logoutTimer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        if(token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
           });
        }
    },
    logOut(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(logoutTimer);

        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });
    },
    autoLogout(context) {
        context.dispatch('logOut');
        context.commit('setAutoLogout');
    }
};