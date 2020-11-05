<template>
    <div
        id="app"
        class="app"
        v-bind:class="{
      'app-sidebar-minified': appOptions.appSidebarMinified,
      'app-sidebar-mobile-toggled': appOptions.appSidebarMobileToggled,
      'app-sidebar-mobile-closed': appOptions.appSidebarMobileClosed,
      'app-content-full-height': appOptions.appContentFullHeight,
      'app-content-full-width': appOptions.appContentFullWidth,
      'app-without-sidebar': appOptions.appWithoutSidebar,
      'pt-0': appOptions.appWithoutHeader,
      'app-boxed-layout': appOptions.appBoxedLayout,
      'app-footer-fixed': appOptions.appWithFooter,
    }"
    >
        <vue-ins-progress-bar></vue-ins-progress-bar>
        <Header v-if="!appOptions.appWithoutHeader"/>
        <Sidebar v-if="!appOptions.appWithoutSidebar"/>
        <router-view></router-view>
        <Footer v-if="appOptions.appWithFooter"/>

        <div class="toast fade hide" data-autohide="false" id="toast-1">
            ...
        </div>

    </div>
</template>

<script>
import AppOptions from "./config/AppOptions.vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import {mapState} from "vuex";

export default {
    name: "App",
    data() {
        return {
            appOptions: AppOptions,
        };
    },
    components: {
        Sidebar,
        Header,
        Footer,
    },
    computed: mapState(["user"]),
    methods:{

    },
    mounted() {
        this.$insProgress.finish();
    },
    created() {
        this.$insProgress.start();
        this.$router.beforeEach((to, from, next) => {
            this.$insProgress.start();
            if (this.appOptions.appSidebarMobileToggled === true) {
                this.appOptions.appSidebarMobileClosed = true;

                setTimeout(() => {
                    this.appOptions.appSidebarMobileClosed = false;
                    this.appOptions.appSidebarMobileToggled = false;
                }, 250);
            }
            next();
        });
        this.$router.afterEach(() => {
            this.$insProgress.finish();
        });
    },
};
</script>
