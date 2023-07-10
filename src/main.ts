import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { vuetify } from "@/plugins/vuetify";
import "./registerServiceWorker";

// Create Vue app and mount it to the DOM
createApp(App).use(store).use(router).use(vuetify).mount("#app");
