/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = window.jQuery = require('jquery');

require('bootstrap-sass');

// TODO: Import this only where needed (e.g. in a component)
require('bootstrap-datepicker');

window.Vue = require('vue');

Vue.component('citizenship-value-fields', require('./components/CitizenshipValueFields.vue'));
Vue.component('dual-list', require('./components/DualList.vue'));
Vue.component('registration-auth-fields', require('./components/RegistrationAuthFields.vue'));
Vue.component('registration-form', require('./Registration/RegistrationForm.vue'));
Vue.component('v-modal', require('./components/VModal.vue'));



// Instantiate root Vue
app = new Vue({
    el: '#app'
});
