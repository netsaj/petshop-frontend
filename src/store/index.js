import Vue from 'vue'
import Vuex from 'vuex'


import states from "@/store/states";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

Vue.use(Vuex)

export default new Vuex.Store({
    state: states,
    mutations: mutations,
    actions: actions,
    modules: {},
})
