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
Vue.component('welcome-form', require('./welcome/WelcomeForm.vue'));
Vue.component('my-students', require('./students/MyStudents.vue'));

Vue.component('user-list', require('./users/UserList.vue'));
// Vue.component('create-modal', require('./students/CreateModal.vue'));

// Report components
Vue.component('demographic-summary', require('./Reports/DemographicSummary.vue'));
Vue.component('demographic-report', require('./Reports/DemographicReport.vue'));
Vue.component('citizenship-mentoring', require('./Reports/CitizenshipMentoring.vue'));
Vue.component('usage-report', require('./Reports/UsageReport.vue'));


import Toasted from 'vue-toasted';
import Vuetify from 'vuetify';
window.toastr = require('toastr/build/toastr.min.js');

Vue.use(Vuetify);

Vue.use(Toasted);


// Instantiate root Vue
var app = new Vue({
    el: '#app',
    data: {
        reportType: 'type',
    },
    methods: {
        clickReport: function() {
            console.log(this.reportType);
            if(this.reportType == 'type')
                toastr["error"]("Please select a report type!", "Error!");
            else
                this.$refs.reporttypeform.submit();
        }
    },
    mounted() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
});
