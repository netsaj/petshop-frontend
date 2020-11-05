export default {
    setUser({ commit }, user) {
        console.log('user',user)
        commit('setUser', user);
    },
    setLogo({ commit }, logo) {
        console.log('appLogo',logo)
        commit('setLogo', logo);
    },
}
