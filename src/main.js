import { createApp, defineAsyncComponent } from 'vue';

import router from './router';
import store from './store';
import App from './App';

import BaseCard from './components/ui/BaseCard';
import BaseButton from './components/ui/BaseButton';
import BaseBadge from './components/ui/BaseBadge';
import BaseSpinner from './components/ui/BaseSpinner';
// import BaseDialog from './components/ui/BaseDialog';

const BaseDialog = defineAsyncComponent(() => import("./components/ui/BaseDialog"));

const app = createApp(App);
app.config.devTools = true;
app.use(router).use(store);

app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseBadge', BaseBadge);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseDialog', BaseDialog);

app.mount('#app');
