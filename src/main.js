/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.1.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2023 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
// import "primeicons/primeicons.css";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
// import PrimeVue from "primevue/config";

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";

// router setup
import routes from "./routes/routes";

import "./registerServiceWorker";

import { BootstrapVue, TabsPlugin, IconsPlugin } from 'bootstrap-vue'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(TabsPlugin)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);
// Vue.use(PrimeVue, {});

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
});
