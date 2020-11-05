<template>
    <!-- BEGIN #content -->
    <div id="content" class="app-content">
        <!--
        <h1 class="page-header">
            Inicio
        </h1>
        <hr/>
        -->
        <div class="container-fluid">
            <div class="row" style="margin-bottom: 20px">
                <div class="col-md-2">
                    <div class="card overflow-hidden fs-13px border-0 bg-info"
                         style="min-height: 170px;font-weight: bold !important"><!----><!---->
                        <div class="card-img-overlay mb-n4 mr-n4 d-flex" style="bottom: 30px; top: auto;"><img
                            src="/assets/vaccinate.svg" alt=""
                            class="ml-auto d-block mb-n3" style="max-height: 105px; opacity: 70%"></div>
                        <div class="card-body position-relative">
                            <h5 class="text-white-border-black mb-3 fs-16px">Vacunación</h5>
                            <h3 class="text-white-border-black mt-n1">{{ contador.vacunacion }}</h3>
                            <span class="text-white-border-black">pendientes</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card overflow-hidden fs-13px border-0 bg-primary"
                         style="min-height: 170px;font-weight: bold !important"><!----><!---->
                        <div class="card-img-overlay mb-n4 mr-n4 d-flex" style="bottom: 30px; right:-10px; top: auto;">
                            <img
                                src="/assets/haircut.svg" alt=""
                                class="ml-auto d-block mb-n3" style="max-height: 105px; opacity: 50%"></div>
                        <div class="card-body position-relative">
                            <h5 class="text-white-border-black mb-3 fs-16px">Peluqueria</h5>
                            <h3 class="text-white-border-black mt-n1">{{ contador.peluqueria }}</h3>
                            <span class="text-white-border-black">pendientes</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card overflow-hidden fs-13px border-0 bg-success"
                         style="min-height: 170px;font-weight: bold !important"><!----><!---->
                        <div class="card-img-overlay mb-n4 mr-n4 d-flex" style="bottom: 30px; right:-10px; top: auto;">
                            <img
                                src="/assets/deworming.svg" alt=""
                                class="ml-auto d-block mb-n3" style="max-height: 105px; opacity: 50%"></div>
                        <div class="card-body position-relative">
                            <h5 class="text-white-border-black mb-3 fs-16px">Desparasitación</h5>
                            <h3 class="text-white-border-black mt-n1">{{ contador.desparasitacion }}</h3>
                            <span class="text-white-border-black">pendientes</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card overflow-hidden fs-13px border-0 bg-dark"
                         style="min-height: 170px;font-weight: bold !important"><!----><!---->
                        <div class="card-img-overlay mb-n4 mr-n4 d-flex" style="bottom: 30px; right:-10px; top: auto;">
                            <img
                                src="/assets/medico.svg" alt=""
                                class="ml-auto d-block mb-n3" style="max-height: 105px; opacity: 70%"></div>
                        <div class="card-body position-relative">
                            <h5 class="text-white-border-black mb-3 fs-16px">Consultas</h5>
                            <h3 class="text-white-border-black mt-n1">{{ contador.historiaclinica }}</h3>
                            <span class="text-white-border-black">pendientes</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card overflow-hidden fs-13px border-0 bg-warning"
                         style="min-height: 170px;font-weight: bold !important"><!----><!---->
                        <div class="card-img-overlay mb-n4 mr-n4 d-flex" style="bottom: 30px; right:-10px; top: auto;">
                            <img
                                src="/assets/biological.png" alt=""
                                class="ml-auto d-block mb-n3" style="max-height: 105px; opacity: 50%"></div>
                        <div class="card-body position-relative">
                            <h5 class="text-white-border-black mb-3 fs-16px">Laboratorios</h5>
                            <h3 class="text-white-border-black mt-n1">{{ contador.laboratorio }}</h3>
                            <span class="text-white-border-black">pendientes</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card overflow-hidden fs-13px border-0 bg-danger"
                         style="min-height: 170px;font-weight: bold !important"><!----><!---->
                        <div class="card-img-overlay mb-n4 mr-n4 d-flex" style="bottom: 30px; right:-10px; top: auto;">
                            <img
                                src="/assets/call.svg" alt=""
                                class="ml-auto d-block mb-n3" style="max-height: 105px; opacity: 50%"></div>
                        <div class="card-body position-relative">
                            <h5 class="text-white-border-black mb-3 fs-16px">Por llamar</h5>
                            <h3 class="text-white-border-black mt-n1">{{ calendarios.length }}</h3>
                            <span class="text-white-border-black">agendadas</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row card">
                <div class="col-md-12 card-body">
                    <b-tabs content-class="pt-3">
                        <b-tab title="Servicios activos" :active="documentos.length > 0">
                            <ListaServicios :documentos="documentos" :empty="'Sin servicios abiertos'"/>
                        </b-tab>
                        <b-tab title="LLamadas pendientes" :active="documentos.length === 0">
                            <LLamadasAgendadas :calendarios="calendarios" @cerrado="(value)=>{onCerrarCalendario()}"/>
                        </b-tab>
                        <b-tab title="Disabled" disabled>...</b-tab>
                    </b-tabs>
                </div>

            </div>
        </div>
    </div>
    <!-- END #content -->
</template>
<script>
import ListaServicios from "../components/home/ListaServicios";
import LLamadasAgendadas from "../components/home/LLamadasAgendadas";
import {mapActions, mapState} from "vuex";

export default {
    computed: mapState(["user"]),
    components: {ListaServicios, LLamadasAgendadas,},
    data() {
        return {
            documentos: [],
            contador: {
                peluqueria: 0,
                vacunacion: 0,
                desparasitacion: 0,
                laboratorio: 0,
                historiaclinica:0,
            },
            calendarios: [],
            interval: null
        }
    },
    methods: {
        ...mapActions(["setUser"]),
        async validateLogin() {
            if (this.user == null) {
                console.log("user is null, goTo login")
                await this.$router.push({name: 'login'})
            } else {
                console.log("user is not null", this.user)
                try {
                    let response = await this.$http.get("/v1/auth/user");
                    localStorage.setItem("user_id", response.data.user.id)
                    this.setUser(response.data.user)
                    console.log("user_id", response.data.user.id)
                } catch (e) {
                    this.setUser(null)
                    localStorage.removeItem("user_id")
                    localStorage.removeItem("token")
                }
            }
        },
        contarPendientes() {
            this.$http.get("/v1/documentos/servicios/contar")
                .then(res => {
                    console.log(res.data)
                    this.contador.peluqueria = res.data.peluqueria;
                    this.contador.vacunacion = res.data.vacunacion;
                    this.contador.desparasitacion = res.data.desparasitacion;
                    this.contador.historiaclinica = res.data.historiaclinica
                })
                .catch(err => {
                    console.error(err)
                })
        },
        consultarCalendario() {
            this.$http.get("/v1/calendarios/pendientes")
                .then(res => {
                    console.log(res.data)
                    this.calendarios = res.data.calendarios
                })
                .catch(err => {
                    console.error(err)
                })
        },
        consultarServicios() {
            this.$http.get("/v1/documentos/servicios")
                .then(res => {
                    console.log(res.data)
                    this.documentos = res.data.documentos;
                    if (this.documentos.length === 0) {
                        //jQuery('#llamadas-tab').click()
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },
        onCerrarCalendario() {
            console.log("Agendamiento cerrado correctamente")
            this.consultarCalendario();
            this.contarPendientes();
        },
        async loadLogo() {
            const res = await this.$http.get(`/logo`, {
                responseType: "arraybuffer"
            })
            console.log(res)
            this.logo = `${this.$http.defaults.baseURL}/logo`
        },
        reloadData() {
            console.log("sync data...", new Date().toLocaleTimeString())
            this.consultarCalendario();
            this.consultarServicios();
            this.contarPendientes();
        }

    },
    async created() {
        console.log("created")
        await this.validateLogin()
        await this.loadLogo()
        this.reloadData()
        this.interval = setInterval(this.reloadData, 30000)
    },
    destroyed() {
        clearInterval(this.interval)
    }
}


</script>
