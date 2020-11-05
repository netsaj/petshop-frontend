<template>
    <div id="content" class="app-content">
        <h1 class="page-header mb-3">
            {{
                documentoPrevio && documento != null ? `Servicio No. ${documento.numero}  |  Fecha ` + $calendar.cambiarFormatoFecha(documento.created_at) : 'Nueva consulta medica'
            }}
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
                <Mascota :mascota="mascota" ref="mascota" :editable="true" @nuevo="(nuevo)=>{mascota = nuevo}"/>
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

        <div class="row" v-if="documento !== null && documentoPrevio">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">Fecha servicio:</label>
                    <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                v-model="documento['created_at']"/>
                </div>
            </div>
        </div>
        <!-- hairdressing -->
        <!-- Service check -->

        <div class="row" v-show="mascota != null">
            <div class="col-md-12">
                <hr>
            </div>
            <div class="col-md-12" v-show="cliente['id']!=='' && mascota['id']!==''">
                <div class="card border-secondary">
                    <div class="card-body" style="">
                        <b-tabs content-class="pt-3">
                            <b-tab title="Consulta medica" active>
                                <div class="col-md-12 text-center align-middle"
                                     v-show="cliente['id']!=='' && mascota['id']!==''">

                                    <span class="font-weight-bolder" v-show="!documentoPrevio">
                                        &emsp;Servicios medicos disponibles:&emsp;<br>
                                    </span>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons"
                                         v-show="!documentoPrevio">
                                        <label class="btn btn-outline-primary "
                                               :class="availableServices.historia ? 'active' : '' ">
                                            <input v-model="availableServices.historia" type="checkbox"
                                                   autocomplete="off"
                                            > Consulta medica
                                        </label>
                                        <label class="btn btn-outline-primary "
                                               :class="availableServices.laboratory ? 'active' : '' ">
                                            <input v-model="availableServices.laboratory" type="checkbox"
                                                   autocomplete="off"
                                            > Laboratorio
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <br>
                                    <br>
                                    <div class="row" v-show="availableServices.historia">
                                        <HistoriaClinicaNueva ref="historiaclinicass"
                                                              :historial="historial"
                                                              @value="(value) =>{historiaclinica = value}"/>
                                    </div>
                                    <!-- laboratory -->
                                    <div v-show="availableServices.laboratory">
                                        <Laboratorio ref="laboratorio" @value="(value) =>{laboratorio = value}"/>
                                    </div>
                                </div>
                            </b-tab>
                            <b-tab title="Historia clinica">

                            </b-tab>
                            <b-tab title="General">
                                <div class="row">
                                    <div class="col-6">
                                        <h4>Historico</h4>
                                        <br>
                                        <div
                                            v-if="historial.length === 0">
                                            <div class="row">
                                                <div class="col-md-4 text-center">
                                                    <img :src="`/assets/animals/${mascota.especie}.svg`"
                                                         style="width: 80%">
                                                </div>
                                                <div class="col-md-8">
                                                    <span style="font-size: 2.2em" class="display-4 mb-5  mt-4">Este paciente aún no tiene historia con nosotros :(</span>
                                                    <hr class="my-4">
                                                    <p class="mb-5">Aquí veras un historial de las últimas visitas de
                                                        nuestro amig@</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="timeline-alter">
                                            <template v-for="row in historial">
                                                <div class="item-timeline" v-for="row2 in row.timeline">
                                                    <div class="t-time">
                                                        {{ calendar.getDateOnly(row2.date) }}<br>
                                                        {{ calendar.getTimeOnly(row2.date) }}
                                                    </div>
                                                    <div class="t-img">
                                                        <img src="/assets/vaccinate.svg"
                                                             class="rounded-circle bg-gradient-info">
                                                    </div>
                                                    <div class="t-meta-time">
                                                        {{ row2.employee }}<br>
                                                        <span class="font-weight-bold">{{ row2.title }}</span>
                                                        {{ row2.description }}
                                                    </div>
                                                    <div class="t-text">
                                                    </div>
                                                </div>
                                            </template>
                                        </div>


                                    </div>
                                </div>
                            </b-tab>
                        </b-tabs>
                    </div>
                </div>
            </div>

        </div>
        <!-- end service check -->
        <div class="row" v-if="availableServices.historia || availableServices.laboratory">
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
                        {{ documentoPrevio ? 'Actualizar' : 'Registrar' }} servicio medico
                    </button>
                </center>
                <br>
                <br>
            </div>
            <div class="col-md-4">
                <hr/>
                <center>
                    <button v-if="documentoPrevio && documento.id !== $root.$uuidNull"
                            class="btn  btn-primary btn-lg"
                            style="width: 100%"
                            @click="modificarEstadoServicio()">
                        <i class="fa fa-1x fa-floppy-o"></i> &emsp;
                        {{ documento['servicio_terminado'] ? 'Abrir' : 'Cerrar' }} Servicio
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
    </div>
</template>

<script>

import {es} from 'vuejs-datepicker/dist/locale'
import Datepicker from 'vuejs-datepicker';

const moment = require('moment');
const models = require('../utils/models');
const calendar = require('../utils/calendar');
const autoHistoriaClinica = require('../utils/autoHistoriaClinica');

import Search from "../components/search/Search";
import Cliente from "../components/Formularios/Cliente";
import Mascota from "../components/Formularios/Mascota";
import Peluqueria from "../components/Formularios/Peluqueria";
import Laboratorio from "../components/Formularios/Laboratorio";
import Vacunacion from "../components/Formularios/Vacunacion";
import Desparasitacion from "../components/Formularios/Desparasitacion";
import HistoriaClinicaNueva from "../components/Formularios/HistoriaClinicaNueva";


export default {
    name: "NewService",
    components: {
        HistoriaClinicaNueva,
        Desparasitacion,
        Vacunacion,
        Peluqueria,
        Mascota,
        Cliente,
        Datepicker,
        Search,
        Laboratorio
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
            laboratorio: {},
            historiaclinica: models.HistoriaClinicaModel(),
            historial: [],
            availableServices: {
                laboratory: false,
                historia: false,
            },
            // reporte animal
            documentos: [],
            contador: {
                peluqueria: 0,
                vacunacion: 0,
                desparasitacion: 0,
                laboratorio: 0,
            },
        }
    },
    computed: {
        documentoDiligenciado() {
            //return this.historiaclinica !== models.HistoriaClinicaModel()
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

            if (mascota != null) {
                console.log(mascota.historia_clinica);
                this.mascota = mascota;
                this.cliente = mascota["tercero"];
                this.consultarHistoriasPrevias()
            } else {
                this.cargarDefaults();
            }
        },
        async consultarHistoriasPrevias() {
            if (this.mascota.historia_clinica === undefined || this.mascota.historia_clinica === null || this.mascota.historia_clinica === "") {
                try {
                    const res = await this.$http.get(`/v1/reportes/mascota/${this.mascota.id}`)
                    this.documentos = res.data.documentos
                    this.contador.peluqueria = res.data.total_peluqueria
                    this.contador.vacunacion = res.data.total_vacunacion
                    this.contador.desparasitacion = res.data.total_desparasitacion
                    this.contador.laboratorio = res.data.total_laboratorio
                    this.contador.historiaclinica = res.data.total_historiaclinica
                    if (this.contador.historiaclinica === 0) {
                        if (this.contador.vacunacion > 0 || this.contador.vacunacion > 0 || this.contador.desparasitacion > 0 || this.contador.laboratorio > 0) {
                            this.$alerts.confirm(
                                "Mascota sin historia clinica",
                                `Se ha econtrado uno o mas documentos con los cuales se puede generar una historia clinica automatica.<br/>
                                         ¿Desea iniciar la historia clinica con esta información?`,
                                () => {
                                    let auto = autoHistoriaClinica.generar(res.data.documentos)
                                    let request = {
                                        "tercero_id": this.cliente.id,
                                        "mascota_id": this.mascota.id,
                                        "usuario_id": localStorage.getItem("user_id"),
                                        "terminado": true,
                                        "observaciones": "documento generado automaticamente por el sistema en base al historial de la mascota."
                                    };
                                    request['historiaclinica'] = auto
                                    this.$http.post("/v1/documentos/servicios", request)
                                        .then(res => {
                                            console.log("documento creado")
                                            console.log(res)
                                            this.$alerts.notification(`Servicio creado: ${res.data["documento"].numero}`)
                                        }).catch(err => {
                                        this.$httpErrors.axiosErrorHandler(err)
                                    })
                                    this.historial.unshift(auto)

                                    console.log("historia clinica: ", this.historial)
                                }
                            )
                        }
                    } else {
                        for (let documento of res.data.documentos) {
                            let temp = []
                            if (documento['historiaclinica'].id !== this.$root.$uuidNull) {
                                temp.push(documento['historiaclinica'])
                                console.log("item in array",documento['historiaclinica'])
                            }
                            this.historial.push(...temp)
                        }
                    }
                    //this.historiaclinica = models.HistoriaClinicaModel()
                    console.log("consulta done, documentos ", this.documentos.length)
                } catch (e) {
                    console.log(e)
                }

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
                if (this.availableServices.laboratory) {
                    request["laboratorio"] = this.laboratorio
                }
                if (this.availableServices.historia) {
                    this.historiaclinica.timeline = [{
                        'employee': '',
                        'date': this.historiaclinica.created_at,
                        'title': 'Consulta médica',
                        'description': `${this.historiaclinica.contenido.anamnesis.motivo_consulta === "" ? "(Sin especificar)" : this.historiaclinica.contenido.anamnesis.motivo_consulta}`
                    }]
                    request["historiaclinica"] = this.historiaclinica
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
                if (this.availableServices.historia) {
                    this.historiaclinica.timeline = [{
                        'employee': '',
                        'date': this.historiaclinica.created_at,
                        'title': 'Consulta médica',
                        'description': `${this.historiaclinica.contenido.anamnesis.motivo_consulta === "" ? "(Sin especificar)" : this.historiaclinica.contenido.anamnesis.motivo_consulta}`
                    }]
                    request["historiaclinica"] = this.historiaclinica
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
        },
        // metodos reportes
        totalPeluqueria() {
            let total = 0
            this.documentos.forEach(row => {
                if (row['peluqueria'].id !== '00000000-0000-0000-0000-000000000000') {
                    total += row['peluqueria']['total']
                }
            })
            return total
        },
        totalVacunacion() {
            let total = 0
            this.documentos.forEach(row => {
                if (row['vacunacion'].id !== '00000000-0000-0000-0000-000000000000') {
                    total += row['vacunacion']['total']
                }
            })
            return total
        },
        totalDesparasitacion() {
            let total = 0
            this.documentos.forEach(row => {
                if (row['desparasitacion'].id !== '00000000-0000-0000-0000-000000000000') {
                    total += row['desparasitacion']['total']
                }
            })
            return total
        },
        totalLaboratorio() {
            let total = 0
            this.documentos.forEach(row => {
                if (row['laboratorio'].id !== '00000000-0000-0000-0000-000000000000') {
                    total += row['laboratorio']['total']
                }
            })
            return total
        },
        async syncData() {
            if (this.$route.name === 'consulta') {
                console.log("consultando historia medica ", this.$route.params.id)
                this.documentoPrevio = true;
                this.$http.get(`/v1/documentos/servicios/${this.$route.params.id}`)
                    .then(async (res) => {
                        console.log("request medical, ", res)
                        let data = res.data['documento']
                        if (data.laboratorio.archivos === null) {
                            data.laboratorio.archivos = []
                        }
                        this.documento = data
                        this.mascota = this.documento.mascota
                        this.cliente = this.documento["tercero"]
                        this.estado = 'editando'
                        await this.consultarHistoriasPrevias()
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
                        if (this.documento.historiaclinica.id !== this.$uuidNull) {
                            this.$refs['historiaclinicass'].setValue(this.documento.historiaclinica)
                            this.availableServices.historia = true;
                        }
                    })
            }
        }

    },
    created() {
        console.log(this.$route)
        if (this.$route.name === "consulta") {
            this.syncData()
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
