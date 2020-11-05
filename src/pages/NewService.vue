<template>
    <div id="content" class="app-content">
        <h1 class="page-header mb-3">
            {{ documentoPrevio && documento != null ? `Servicio No. ${documento.numero}  |  Fecha `+$calendar.cambiarFormatoFecha(documento.created_at) : 'Nuevo servicio'}}
        </h1>
        <Search ref="search" v-show="!documentoPrevio && estado === 'buscando' " @seleccionarResultado="seleccionar"/>

        <div class="row" v-show=" estado !== 'buscando' ">
            <!-- form new user -->
            <div class="col-md-6" v-if=" estado !== 'buscando' " style="height: 100%">
                <Cliente :cliente="cliente" ref="cliente"/>
            </div>
            <!-- end form for new user -->

            <!-- form for new pet -->
            <div class="col-md-6">
                <Mascota :mascota="mascota" ref="mascota" :editable="true" :disable-new-mascota="documentoPrevio" @nuevo="(nuevo)=>{mascota = nuevo}"/>
            </div>
            <!-- end form for new pet -->

            <!-- botones de control -->
            <div class="col-md-12">
                <hr/>
            </div>
            <div :class="!documentoPrevio ? 'col-md-2' : 'col-md-4' "/>
            <div class="col-md-4" v-if="!documentoPrevio">
                <button class="btn  btn-danger" style="width: 100%" @click="cancelarSeleccion()">
                    <i class="fa fa-1x fa-minus-circle"/> &emsp;
                    Cancelar selección
                </button>
            </div>
            <div class="col-md-4">
                <button class="btn  btn-success" style="width: 100%" @click="guardarDatosCliente()">
                    <i class="fa fa-1x fa-floppy-o"/> &emsp;
                    Guardar información
                </button>
            </div>
        </div>
        <!-- hairdressing -->
        <!-- Service check -->
        <div class="row mb-3" v-show="mascota != null">
            <div class="col-md-12">
                <hr>
            </div>
            <div class="col-md-12 text-center align-middle" v-show="cliente['id']!=='' && mascota['id']!==''">

                <span class="font-weight-bolder" v-show="!documentoPrevio">
                    &emsp;Servicios disponibles:&emsp;<br>
                </span>
                <div class="btn-group btn-group-toggle" data-toggle="buttons" v-show="!documentoPrevio">
                    <label class="btn btn-outline-primary " :class="availableServices.hairdressing ? 'active' : '' ">
                        <input v-model="availableServices.hairdressing" type="checkbox" autocomplete="off"
                        > Peluqueria
                    </label>
                    <label class="btn  btn-outline-primary" :class="availableServices.vaccinate ? 'active' : '' ">
                        <input v-model="availableServices.vaccinate" type="checkbox" autocomplete="off"
                        > Vacunación
                    </label>
                    <label class="btn  btn-outline-primary" :class="availableServices.deworming ? 'active' : '' ">
                        <input v-model="availableServices.deworming" @change="calculateDateDeworming()" type="checkbox"
                               autocomplete="off"> Desparasitación
                    </label>
                    <label class="btn btn-outline-primary " :class="availableServices.laboratory ? 'active' : '' ">
                        <input v-model="availableServices.laboratory" type="checkbox" autocomplete="off"
                        > Laboratorio
                    </label>
                </div>

                <br>
            </div>
        </div>
        <!-- end service check -->
        <div class="row" v-if="documento !== null && documentoPrevio">
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-label" style="background: transparent !important; top:-7px !important;">Fecha servicio:</label>
                    <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                v-model="documento['created_at']"/>
                </div>
            </div>
        </div>
        <div v-show="availableServices.hairdressing">
            <Peluqueria ref="peluqueria" @value="(value)=>{peluqueria=value}"/>
        </div>


        <!-- vaccinate -->
        <div v-show="availableServices.vaccinate">
            <Vacunacion ref="vacunacion" :especie="mascota.especie" @value="(value)=>{vacunacion = value}"/>
        </div>

        <!-- deworming -->
        <div v-show="availableServices.deworming">
            <Desparasitacion ref="desparasitacion" :peso="mascota.peso" @value="(value) =>{desparasitacion = value}"/>
        </div>

        <!-- laboratory -->
        <div v-show="availableServices.laboratory">
            <Laboratorio ref="laboratorio" @value="(value) =>{laboratorio = value}"/>
        </div>


        <div class="row"
             v-show="availableServices.vaccinate || availableServices.hairdressing || availableServices.deworming || this.availableServices.laboratory">
            <div class="col-md-4">
                <hr/>
                <button v-if="documentoPrevio" class="btn  btn-warning btn-lg"
                        @click="EliminarServicio()">
                    <i class="fa fa-1x fa-trash-alt"></i> &emsp;
                    Eliminar
                </button>
                <br>
                <br>
            </div>
            <div class="col-md-4">
                <hr/>
                <center>
                    <button class="btn  btn-success btn-lg" style="width: 100%" @click="guardarServicio()">
                        <i class="fa fa-1x fa-floppy-o"></i> &emsp;
                        {{documentoPrevio ? 'Actualizar' : 'Registrar'}} Servicio
                    </button>
                </center>
                <br>
                <br>
            </div>
            <div class="col-md-4">
                <hr/>
                <center>
                    <button v-if="documentoPrevio && documento !==null" class="btn  btn-primary btn-lg"
                            style="width: 100%"
                            @click="modificarEstadoServicio()">
                        <i class="fa fa-1x fa-floppy-o"></i> &emsp;
                        {{documento['servicio_terminado'] ? 'Abrir' : 'Cerrar'}} Servicio
                    </button>
                </center>
                <br>
                <br>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>

<script>

    import {es} from 'vuejs-datepicker/dist/locale'
    import Datepicker from 'vuejs-datepicker';

    const moment = require('moment');
    const models = require('../utils/models');
    const calendar = require('../utils/calendar');

    import Search from "../components/search/Search";
    import Cliente from "../components/Formularios/Cliente";
    import Mascota from "../components/Formularios/Mascota";
    import Peluqueria from "../components/Formularios/Peluqueria";
    import Laboratorio from "../components/Formularios/Laboratorio";
    import Vacunacion from "../components/Formularios/Vacunacion";
    import Desparasitacion from "../components/Formularios/Desparasitacion";
    import HistoriaClinica from "../components/Formularios/HistoriaClinica";


    export default {
        name: "NewService",
        components: {
            Desparasitacion,
            Vacunacion,
            Peluqueria,
            Mascota,
            Cliente,
            Datepicker,
            Search,
            Laboratorio,
            HistoriaClinica
        },
        data() {
            return {
                documento: null,
                documentoPrevio: false,
                es: es,
                calendar: calendar,
                fechaHandler: '',
                estado: 'buscando',
                isNewUser: false,
                cliente: models.clienteModel(),
                mascota: models.mascotaModel(),
                peluqueria: {},
                vacunacion: {},
                desparasitacion: {},
                laboratorio: {},
                historiaclinica : {},
                availableServices: {
                    hairdressing: false,
                    vaccinate: false,
                    deworming: false,
                    laboratory: false,
                    historia : false,
                },
                deworming: {
                    nextDate: moment().format("L"),
                    type: 0
                },
                desparacitante_menor_1mes_liquido: [],
                desparacitante_mayor_1mes_liquido: [],
                desparacitante_mayor_1mes_pastilla: [],
            }
        },
        watch: {
            mascota(Old, New) {
                try {
                    New.peso = parseFloat(New.peso)
                } catch (e) {

                }
            }
        },
        methods: {
            seleccionar(mascota) {
                this.estado = 'seleccionado';
                console.log("mascota seleccionada");
                console.log(mascota);
                if (mascota != null) {
                    this.mascota = mascota;
                    this.cliente = mascota["tercero"];
                } else {
                    this.cargarDefaults();
                }
            },
            cargarDefaults() {
                this.fechaHandler = '';
                this.mascota = models.mascotaModel()
                this.cliente = models.clienteModel()
            },
            cancelarSeleccion() {
                this.estado = 'buscando';
                this.$refs.search.search();
                this.cargarDefaults();
            },
            guardarDatosCliente() {
                this.guardarCliente();
            },
            calculateDateDeworming() {
                if (this.deworming.type === 1) { // neonato;
                    this.deworming.nextDate = moment().add(15, 'days').toDate();
                } else if (this.deworming.type === 2) { // cachorro
                    this.deworming.nextDate = moment().add(30, 'days').toDate();
                } else if (this.deworming.type === 3) { // adulto
                    this.deworming.nextDate = moment().add(60, 'days').toDate();
                }
            },

            guardarCliente() {
                if (this.cliente.id === "") {
                    // creo nuevo cliente
                    let cliente = {...this.cliente};
                    delete cliente["id"];
                    this.$http.post("/v1/clientes", cliente).then(res => {
                        //console.log("cliente creado");
                        console.log(res);
                        console.log("entre por el then")
                        this.cliente = res.data.cliente;
                        this.$alerts.notification("Nuevo cliente registrado en el sistema.");
                        this.guardarMascota();
                    }).catch(err => {
                        //console.log("entre por el catch");
                        //console.log(err);
                        this.$httpErrors.axiosErrorHandler(err)
                    });
                } else {
                    //console.log("cliente ya existe, enviando actualizacion");
                    this.$http.put("/v1/clientes", this.cliente).then(res => {
                        this.$alerts.notification("Cliente actualizado.");
                        this.cliente = res.data.cliente;
                        this.guardarMascota()
                    }).catch(err => {
                        //console.log("entre por el catch");
                        this.$httpErrors.axiosErrorHandler(err);
                    });
                }
            },

            guardarMascota() {
                //console.log(this.mascota);
                if (typeof (this.mascota.peso) === 'string') {
                    this.mascota.peso = parseFloat(this.mascota.peso)
                }
                if (this.mascota.id === "") {
                    let mascota = {...this.mascota};
                    delete mascota["id"];
                    mascota["tercero_id"] = this.cliente.id;
                    //mascota["fecha_nacimiento"] = //calendar.toGoDatetime(mascota.fecha_nacimiento);
                    mascota["peso"] = parseFloat(mascota["peso"]);
                    // creo una nueva mascota
                    this.$http.post("/v1/mascotas", mascota).then(res => {
                        //console.log("mascota creada");
                        //console.log(res);
                        this.mascota.id = res.data.mascota.id;
                        this.$alerts.notification("Nueva mascota registrado en el sistema.");
                    }).catch(err => {
                        this.$httpErrors.axiosErrorHandler(err)
                    })
                } else {
                    let mascota = {...this.mascota};
                    mascota["tercero_id"] = this.cliente.id;
                    //mascota["fecha_nacimiento"] = //calendar.toGoDatetime(mascota.fecha_nacimiento);
                    mascota["peso"] = parseFloat(mascota["peso"]);
                    this.$http.put("/v1/mascotas", this.mascota).then(res => {
                        //console.log("mascota creada");
                        //console.log(res);
                        this.mascota = res.data.mascota;
                        this.$alerts.notification("Mascota actualizada.");
                    }).catch(err => {
                        this.$httpErrors.axiosErrorHandler(err)
                    })
                }
            },

            guardarServicio() {
                /// ES UN DOCUMENTO NUEVO
                if (!this.documentoPrevio) {
                    let request = {
                        "tercero_id": this.cliente.id,
                        "mascota_id": this.mascota.id,
                        "usuario_id": localStorage.getItem("user_id")
                    };
                    if (this.availableServices.hairdressing) {
                        if ((this.peluqueria.total - this.peluqueria.abono) < 0) {
                            this.$alerts.show(
                                "Error en el formulario",
                                "Error en 'peluqueria', <b>saldo</b> no puede ser menor a cero (0.0)<br>Revise los campos 'total' o 'abono' y ajuste los valores."
                            )
                            return;
                        }
                        if ((this.vacunacion.total - this.vacunacion.abono) < 0) {
                            this.$alerts.show(
                                "Error en el formulario",
                                "Error en 'peluqueria', <b>saldo</b> no puede ser menor a cero (0.0)<br>Revise los campos 'total' o 'abono' y ajuste los valores."
                            )
                            return;
                        }
                        request["peluqueria"] = this.peluqueria;
                    }
                    if (this.availableServices.vaccinate) {
                        if (this.vacunacion.revacunacion.getTime() <= new Date().getTime()) {
                            this.$alerts.show("Error en el formulario de vacunación", "La fecha de revacunacion debe ser mayor al dia actual.")
                            return;
                        }
                        request["vacunacion"] = this.vacunacion;
                    }
                    if (this.availableServices.deworming) {
                        if (this.desparasitacion.redesparacitacion.getTime() <= new Date().getTime()) {
                            this.$alerts.show("Error en el formulario de desparasitación", "La fecha de redesparacitacion debe ser mayor al dia actual.")
                            return;
                        }
                        request['desparasitacion'] = this.desparasitacion
                    }
                    if (this.availableServices.laboratory) {
                        request["laboratorio"] = this.laboratorio
                    }
                    this.$http.post("/v1/documentos/servicios", request)
                        .then(res => {
                            //console.log("documento creado")
                            //console.log(res)
                            this.$alerts.notification(`Servicio creado: ${res.data["documento"].numero}`)
                            this.$router.push({name: 'home'})
                        }).catch(err => {
                        this.$httpErrors.axiosErrorHandler(err)
                    })
                }
                /// ES UN DOCUMENTO PREVIO
                else {
                    let request = {
                        "id": this.documento.id,
                        "prefijo_id": this.documento["prefijo_id"],
                        "numero": this.documento.numero,
                        "tercero_id": this.cliente.id,
                        "mascota_id": this.mascota.id,
                        "usuario_id": localStorage.getItem("user_id"),
                        "servicio_terminado": this.documento['servicio_terminado'],
                        "created_at": this.documento['created_at']
                    };
                    if (this.availableServices.hairdressing) {
                        if ((this.peluqueria.total - this.peluqueria.abono) < 0) {
                            this.$alerts.show(
                                "Error en el formulario",
                                "Error en 'peluqueria', <b>saldo</b> no puede ser menor a cero (0.0)<br>Revise los campos 'total' o 'abono' y ajuste los valores."
                            )
                            return;
                        }
                        if ((this.vacunacion.total - this.vacunacion.abono) < 0) {
                            this.$alerts.show(
                                "Error en el formulario",
                                "Error en 'peluqueria', <b>saldo</b> no puede ser menor a cero (0.0)<br>Revise los campos 'total' o 'abono' y ajuste los valores."
                            )
                            return;
                        }
                        request["peluqueria"] = this.peluqueria;
                    }
                    if (this.availableServices.vaccinate) {
                        if (this.vacunacion.revacunacion.getTime() <= new Date().getTime()) {
                            this.$alerts.show("Error en el formulario de vacunación", "La fecha de revacunacion debe ser mayor al dia actual.")
                            return;
                        }
                        request["vacunacion"] = this.vacunacion;
                    }
                    if (this.availableServices.deworming) {
                        if (this.desparasitacion.redesparacitacion.getTime() <= new Date().getTime()) {
                            this.$alerts.show("Error en el formulario de desparasitación", "La fecha de redesparacitacion debe ser mayor al dia actual.")
                            return;
                        }
                        request['desparasitacion'] = this.desparasitacion
                    }
                    if (this.availableServices.laboratory) {
                        request["laboratorio"] = this.laboratorio
                    }
                    this.$http.put("/v1/documentos/servicios", request)
                        .then(res => {
                            //console.log("documento creado")
                            //console.log(res)
                            this.$alerts.notification(`Servicio actualizado: ${res.data["documento"].numero}`)
                            this.$router.go(-1)
                        }).catch(err => {
                        this.$httpErrors.axiosErrorHandler(err)
                    })
                }
            },
            modificarEstadoServicio() {
                this.documento['servicio_terminado'] = !this.documento['servicio_terminado'];
                this.guardarServicio();
            },
            EliminarServicio() {
                this.$alerts.confirm(
                    "Eliminación de servicio",
                    "¿Esta seguro de eliminar el servicio?<br>Esto eliminará también las llamadas agendadas asociadas a este servicio",
                    () => {
                        this.$http.delete(`/v1/documentos/${this.documento.id}`)
                            .then(res => {
                                this.$alerts.notification("eliminado el servicio : " + this.documento.numero)
                                this.$router.go(-1)
                            })
                            .catch(err => {
                                this.$httpErrors.axiosErrorHandler(err)
                            })

                    }
                )
            }

        },
        created() {
            console.log(this.$route)

        },
        mounted() {
            if (this.$route.name === 'service') {
                this.documentoPrevio = true;
                this.$http.get(`/v1/documentos/servicios/${this.$route.params.id}`)
                    .then(res => {
                        console.log(res)
                        let data = res.data['documento']
                        if (data.laboratorio.archivos === null) {
                            data.laboratorio.archivos = []
                        }
                        this.documento = data
                        this.mascota = this.documento.mascota
                        this.cliente = this.documento["tercero"]
                        this.estado = 'editando'
                        if (this.documento.peluqueria.id !== this.$uuidNull) {
                            this.$refs['peluqueria'].setValue(this.documento.peluqueria)
                            //this.peluqueria = this.documento.peluqueria
                            this.availableServices.hairdressing = true;

                        }
                        if (this.documento.vacunacion.id !== this.$uuidNull) {
                            this.$refs['vacunacion'].setValue(this.documento.vacunacion)
                            this.availableServices.vaccinate = true;
                        }
                        if (this.documento.desparasitacion.id !== this.$uuidNull) {
                            this.$refs['desparasitacion'].setValue(this.documento.desparasitacion)
                            this.availableServices.deworming = true;
                        }
                        if (this.documento.laboratorio.id !== this.$uuidNull) {

                            this.$refs['laboratorio'].setValue(res.data['documento'].laboratorio)
                            this.availableServices.laboratory = true;
                        }
                    })
            }
        }
    }
</script>

<style scoped>

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0 !important;
    }
</style>
