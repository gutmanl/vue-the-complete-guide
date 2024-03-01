import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App';

import BaseCard from './components/ui/BaseCard';
import BaseButton from './components/ui/BaseButton';
import BaseBadge from './components/ui/BaseBadge';
import BaseSpinner from './components/ui/BaseSpinner';

const app = createApp(App);
app.use(router).use(store);

app.component('BaseCard', BaseCard).component('BaseButton', BaseButton).component('BaseBadge', BaseBadge).component('BaseSpinner', BaseSpinner);

app.mount('#app');
