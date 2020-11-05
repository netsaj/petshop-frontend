<template>
    <!-- BEGIN login -->
    <div>
        <div v-if="serverFound" class="app-content" style="height: 100vh;margin: 0;padding: 0">
            <div class="row" style="height: 100%;margin: 0;padding: 0">
                <div class="col-md-6 login" style="height: 100%;background: white">
                    <div class="login-content">
                        <img :src="appLogo"
                             style="width: 100%;height: auto; position: relative; top:0;bottom: 0;right: 0"
                             alt=""/>
                    </div>
                </div>
                <div class="col-md-6 login">
                    <!-- BEGIN login-content -->
                    <div class="login-content">
                        <form v-on:submit="checkForm" name="login_form">
                            <h1 class="text-center">Inicio de sesión</h1>
                            <div class="text-muted text-center mb-4">

                            </div>

                            <b-form-group label="Usuario:">
                                <b-input v-model="username" size="lg" class="fs-15px" autocomplete="username"
                                         placeholder="Escribe tu usuario"></b-input>
                            </b-form-group>

                            <b-form-group>
                                <b-input v-model="password" type="password" size="lg" autocomplete="current-password"
                                         class="fs-15px"
                                         placeholder="Escribe tu clave"></b-input>
                                <div class="d-flex">
                                    <label>Contraseña</label>
                                    <b-link a href="#" class="ml-auto text-muted">Forgot password?</b-link>
                                </div>
                            </b-form-group>

                            <b-form-group>
                                <!--
                                <b-form-checkbox id="rememberMe" name="remember_me">Remember me</b-form-checkbox>
                                -->
                            </b-form-group>
                            <template v-if="serverFound">
                                <button type="submit" @click="login"
                                        class="btn btn-primary btn-lg btn-block fw-500 mb-3">
                                    Ingresar
                                </button>
                            </template>
                            <div v-else class="text-center text-muted">
                                ... Buscando el servidor ...
                                <!--
                                Don't have an account yet?
                                <router-link to="/page/register">Sign up</router-link>
                                -->
                            </div>
                        </form>
                    </div>
                    <!-- END login-content -->
                </div>
            </div>
        </div>
        <div v-else id="loader-screen" class="d-flex justify-content-between bg-light text-center"
             :style="`opacity:${opacity}%`"
             style="width: 100vw; height: 100vh; z-index: 99999;position: absolute; top: 0;left: 0">
            <div style="display:block;margin:auto;">
                <img src="/assets/logo.png" style=" width: 200px; height: 200px;"
                />
                <br>
                <br>
                <h4>{{ mensaje }}</h4>
                <button v-if="mensaje ==='No se encuentra el servidor'" class="btn btn-primary" @click="loadLogo()">
                    Intentar de nuevo
                </button>
            </div>

        </div>
    </div>
    <!-- END login -->
</template>

<script>
import AppOptions from '../../config/AppOptions.vue'
import {mapActions, mapState} from "vuex";

export default {

    data() {
        return {
            operador: 1,
            opacity: 10,
            logo: "",
            username: "",
            password: "",
            serverFound: false,
            intervalo: null,
            mensaje: 'Buscando servidor...'
        }
    },
    computed: {
        ...mapState(["appLogo"])
    },
    mounted() {
        AppOptions.appWithoutSidebar = true;
        AppOptions.appWithoutHeader = true;
        AppOptions.appContentFullWidth = true;
    },
    beforeRouteLeave(to, from, next) {
        AppOptions.appWithoutSidebar = false;
        AppOptions.appWithoutHeader = false;
        AppOptions.appContentFullWidth = false;
        next();
    },
    methods: {
        ...mapActions(["setUser", "setLogo"]),
        checkForm: function (e) {
            e.preventDefault();
            //this.$router.push({path: '/home'})
        },
        login() {
            if (this.username === "" || this.password === "") {
                //this.$alerts.notificationError("Usuario y contraseña son requeridos.");
                return;
            }
            this.$http.post("/v1/auth/login", {
                "username": this.username,
                "password": this.password
            }).then(response => {
                //console.log(response.data);
                this.$http.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                localStorage.setItem("token", response.data.token);
                this.setUser(response.data.token)
                this.$router.push({name: 'home'});
            }).catch(err => {
                if (err.message.indexOf("Request failed") > -1) {
                    if (err.response.status === 401) {
                        console.log(
                            "No se pudo iniciar sesión",
                            "El usuario o la contraseña de acceso no son correctos."
                        )
                        return;
                    }
                }
                //this.$httpErrors.axiosErrorHandler(err)
            })
        },
        async loadLogo() {
            this.intervaloLoading()
            this.mensaje = 'Buscando servidor...'
            this.serverFound = false
            let routes = [`http://192.168.0.100:3000`, `http://192.168.1.100:3000`, `http://192.168.10.100:3000`, 'http://localhost:3000']
            return new Promise((resolve, reject) => {
                let count = 0;
                for (let i = 0; i < routes.length; i++) {
                    const url = routes[i]
                    console.log(url)
                    this.$http.get(`/logo`, {
                        baseURL: url,
                        responseType: "arraybuffer"
                    }).then(res => {
                        console.log(res)
                        console.log(`works!!! in ${url}/logo`)
                        this.$http.defaults.baseURL = url
                        this.logo = `${url}/logo`
                        this.setLogo(`${url}/logo`)
                        setTimeout(() => {
                            clearInterval(this.intervalo)
                            this.serverFound = true
                            this.opacity = 0
                            console.log(url)
                            this.validateUser()
                            resolve(true)
                        }, 5000)
                    }).catch(e => {
                        count++
                        if (count >= routes.length) {
                            this.serverFound = false
                            this.mensaje = "No se encuentra el servidor"
                            clearInterval(this.intervalo)
                            this.opacity = 100
                            reject(false)
                        }
                    })
                }
            })

        },
        intervaloLoading() {
            this.intervalo = setInterval(() => {
                if (this.opacity >= 100) {
                    this.operador = -1
                }
                this.opacity += this.operador
                console.log(this.opacity)
                if (this.opacity <= 40) {
                    this.operador = +1
                }
            }, 25)
        },
        validateUser() {
            let token = localStorage.getItem("token")
            if (token !== undefined && token !== null) {
                let user_id = localStorage.getItem("user_id")
                this.setUser(user_id)
                this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                this.$router.push({name: 'home'})
            }
        },
    },
    async created() {
        await this.loadLogo()
        console.log("server found:", this.serverFound)


    }
}
</script>
