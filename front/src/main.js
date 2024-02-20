import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

createApp(App).use(store).use(router).mount('#app')
// library.add(fas)
// library.add(far)
// App.component('font-awesome-icon', FontAwesomeIcon)