import Vue from 'vue'
import App from './App.vue'
import routes from './config/AppRoutes'

// plugins
import VueRouter from 'vue-router'
import VueBootstrap from 'bootstrap-vue'
import VueInsProgressBar from 'vue-ins-progress-bar'
import VueCustomScrollbar from 'vue-custom-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import VueHljs from 'vue-hljs'
import DateRangePicker from 'vue2-daterange-picker'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import VueColorPicker from '@caohenghu/vue-colorpicker'
import VueCountdown from '@chenfengyuan/vue-countdown'
import VueMaskedInput from 'vue-maskedinput'
import wysiwyg from "vue-wysiwyg"

// VueStudio SCSS
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/bootstrap/main.css'
import 'vue-hljs/dist/vue-hljs.min.css'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import './scss/styles.scss'
import store from './store'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import VModal from 'vue-js-modal'
import VueSelect from './utils/vue-select/src'
// template requirements
require('jquery/dist/jquery.min');
require('bootstrap/dist/js/bootstrap.min');
require('bootstrap-select/dist/js/bootstrap-select.min');
window.$ = window.jQuery = require("jquery/dist/jquery.min");
import Notifications from 'vue-notification'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import ScrollLoader from 'vue-scroll-loader';
import 'beautify-scrollbar/dist/index.css';
import V2LazyList from 'v2-lazy-list';


window.$ = window.jQuery = require("jquery/dist/jquery.min");
// template requirements
const alerts = require('./utils/alerts');
// eslint-disable-next-line no-unused-vars
const calendar = require('./utils/calendar')
const moment = require('moment');
const dayjs = require('dayjs')



// eslint-disable-next-line no-unused-vars
var formats = [
    moment.ISO_8601,
    "MM/DD/YYYY  :)  HH*mm*ss"
];

axios.interceptors.request.use((config) => {
    config.paramsSerializer = (params) => JSON.stringify(params, {
        serializeDate: (date) => dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ')
    });
    return config;
})
const dateFormat = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

function reviver(key, value) {
    if (typeof value === "string" && dateFormat.test(value)) {
        let date = new Date(value);
        return date.getFullYear() > 0 ? date : null;
    }
    return value;
}

axios.interceptors.response.use(res => {
    try {
        res.data = JSON.parse(JSON.stringify(res.data), reviver);
    } catch (e) {
        console.log(e)
    }
    return res
})

Vue.config.productionTip = false

Vue.use(wysiwyg, {maxHeight: '300px'})
Vue.use(VueRouter)
Vue.use(VueBootstrap)
Vue.use(VueHljs)
Vue.use(V2LazyList)
Vue.use(ScrollLoader)

Vue.component('v-select', VueSelect);
Vue.use(Notifications);
Vue.use(VModal);

Vue.use(VueInsProgressBar, {
    position: 'fixed',
    show: true,
    height: '3px'
})
Vue.use(VueGoogleMaps, {
    load: {
        key: '',
        libraries: 'places'
    }
})

Vue.component('vue-custom-scrollbar', VueCustomScrollbar)
Vue.component('apexchart', VueApexCharts)
Vue.component('date-range-picker', DateRangePicker)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.component('vue-color-picker', VueColorPicker)
Vue.component('vue-masked-input', VueMaskedInput)
Vue.component(VueCountdown.name, VueCountdown);

const router = new VueRouter({
    routes,
    history: false
})

Vue.prototype.$calendar = calendar
Vue.prototype.$httpErrors = require('./utils/axios');
Vue.prototype.$alerts = alerts
Vue.prototype.$uuidNull = "00000000-0000-0000-0000-000000000000"
Vue.prototype.$moneyFormat = (value) => {
    return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
Vue.prototype.$http = axios

new Vue({
    render: h => h(App),
    store,
    router,
    created() {
        this.$router.push({name:'home'})
    }
}).$mount('#app')
