import actions from './actions.js';
import mutations from './mutations.js'
import getters from './getters.js';

//No namespacing for this module - this would require changing all code parts that access user ID
export default {
    state() {
        return {
            userId: null,
            token: null,
            tokenExpiration: null
        };
    },
    actions: actions,
    mutations: mutations,
    getters: getters
}