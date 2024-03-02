import { createRouter, createWebHistory } from "vue-router";

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachesList},
        {path: '/coaches/:id', component: CoachDetails, 
        props: true,
        children: [
            {path: 'contact', component: ContactCoach}
        ]},
        {path: '/register', component: CoachRegistration, meta: {requiresAuth: true}},
        {path: '/requests', component: RequestsReceived, meta: {requiresAuth: true}},
        {path: '/auth', component: UserAuth, meta: {requiresUnauth: true}},
        {path: '/:catchAll(.*)', component: NotFound}
    ]
});

router.beforeEach(async function(to, from, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if(to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else if(to.path === '/register') {
        //This was missing in the course, but I decided to add it anyway. Looked pretty unclean otherwise
        if(store.getters['coaches/isCoach']) {
            next('/requests');
        } else {
            //This covers the case where the user has logged in but the coaches page hasn't been visited yet, so coach data
            //is still unavailable
            await store.dispatch('coaches/loadCoaches');
            if(store.getters['coaches/isCoach']) {
                    next('/requests');
                }
                else {
                    next();
                }
        }
    }
    else {
        next();
    }

});

export default router;