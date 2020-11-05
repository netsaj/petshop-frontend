<template>
    <div>
        <div id="content" class="app-content">
            <h1 class="page-header mb-3">
                Listado de mascotas registradas
            </h1>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <Search ref="search" v-show=" estado === 'buscando' " @seleccionarResultado="seleccionar"
                                :allow-new="false"/>

                        <div class="row" v-show=" estado !== 'buscando' ">
                            <!-- form new user -->
                            <div class="col-md-6" v-if=" estado !== 'buscando' ">
                                <Cliente :cliente="cliente" ref="cliente"/>
                            </div>
                            <!-- end form for new user -->

                            <!-- form for new pet -->
                            <div class="col-md-6">
                                <Mascota :mascota="mascota" ref="mascota" :editable="true"
                                         @nuevo="(nuevo)=>{mascota = nuevo}"/>
                            </div>
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <ul class="nav nav-tabs">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab"
                                                   href="#home">Consolidado</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#Peluqueria">Peluqueria</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#vacunacion">Vacunación</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab"
                                                   href="#desparasitacion">Desparasitación</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab"
                                                   href="#historiaclinica">consultas medicas</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab"
                                                   href="#laboratorio">Laboratorio</a>
                                            </li>
                                        </ul>
                                        <div id="myTabContent" class="tab-content">
                                            <div class="tab-pane fade show active" id="home">
                                                <!-- contadores -->
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <br>
                                                        <br>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="card overflow-hidden fs-13px border-0 bg-info"
                                                             style="min-height: 170px;font-weight: bold !important">
                                                            <!----><!---->
                                                            <div class="card-img-overlay mb-n4 mr-n4 d-flex"
                                                                 style="bottom: 30px; top: auto;"><img
                                                                src="/assets/vaccinate.svg" alt=""
                                                                class="ml-auto d-block mb-n3"
                                                                style="max-height: 105px; opacity: 70%"></div>
                                                            <div class="card-body position-relative">
                                                                <h5 class="text-white-border-black mb-3 fs-16px">
                                                                    Vacunación</h5>
                                                                <h3 class="text-white-border-black mt-n1">
                                                                    {{ contador.vacunacion }}</h3>
                                                                <span class="text-white-border-black">pendientes</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="card overflow-hidden fs-13px border-0 bg-primary"
                                                             style="min-height: 170px;font-weight: bold !important">
                                                            <!----><!---->
                                                            <div class="card-img-overlay mb-n4 mr-n4 d-flex"
                                                                 style="bottom: 30px; right:-10px; top: auto;">
                                                                <img
                                                                    src="/assets/haircut.svg" alt=""
                                                                    class="ml-auto d-block mb-n3"
                                                                    style="max-height: 105px; opacity: 50%"></div>
                                                            <div class="card-body position-relative">
                                                                <h5 class="text-white-border-black mb-3 fs-16px">
                                                                    Peluqueria</h5>
                                                                <h3 class="text-white-border-black mt-n1">
                                                                    {{ contador.peluqueria }}</h3>
                                                                <span class="text-white-border-black">pendientes</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="card overflow-hidden fs-13px border-0 bg-success"
                                                             style="min-height: 170px;font-weight: bold !important">
                                                            <!----><!---->
                                                            <div class="card-img-overlay mb-n4 mr-n4 d-flex"
                                                                 style="bottom: 30px; right:-10px; top: auto;">
                                                                <img
                                                                    src="/assets/deworming.svg" alt=""
                                                                    class="ml-auto d-block mb-n3"
                                                                    style="max-height: 105px; opacity: 50%"></div>
                                                            <div class="card-body position-relative">
                                                                <h5 class="text-white-border-black mb-3 fs-16px">
                                                                    Desparasitación</h5>
                                                                <h3 class="text-white-border-black mt-n1">
                                                                    {{ contador.desparasitacion }}</h3>
                                                                <span class="text-white-border-black">pendientes</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="card overflow-hidden fs-13px border-0 bg-dark"
                                                             style="min-height: 170px;font-weight: bold !important">
                                                            <!----><!---->
                                                            <div class="card-img-overlay mb-n4 mr-n4 d-flex"
                                                                 style="bottom: 30px; right:-10px; top: auto;">
                                                                <img
                                                                    src="/assets/medico.svg" alt=""
                                                                    class="ml-auto d-block mb-n3"
                                                                    style="max-height: 105px; opacity: 70%"></div>
                                                            <div class="card-body position-relative">
                                                                <h5 class="text-white-border-black mb-3 fs-16px">
                                                                    Consultas</h5>
                                                                <h3 class="text-white-border-black mt-n1">
                                                                    {{ contador.historiaclinica }}</h3>
                                                                <span class="text-white-border-black">pendientes</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="card overflow-hidden fs-13px border-0 bg-warning"
                                                             style="min-height: 170px;font-weight: bold !important">
                                                            <!----><!---->
                                                            <div class="card-img-overlay mb-n4 mr-n4 d-flex"
                                                                 style="bottom: 30px; right:-10px; top: auto;">
                                                                <img
                                                                    src="/assets/biological.png" alt=""
                                                                    class="ml-auto d-block mb-n3"
                                                                    style="max-height: 105px; opacity: 50%"></div>
                                                            <div class="card-body position-relative">
                                                                <h5 class="text-white-border-black mb-3 fs-16px">
                                                                    Laboratorios</h5>
                                                                <h3 class="text-white-border-black mt-n1">
                                                                    {{ contador.laboratorio }}</h3>
                                                                <span class="text-white-border-black">pendientes</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="card overflow-hidden fs-13px border-0"
                                                             style="min-height: 170px;font-weight: bold !important; background-color: mediumpurple">
                                                            <!----><!---->
                                                            <div class="card-img-overlay mb-n4 mr-n4 d-flex"
                                                                 style="bottom: 30px; right:-10px; top: auto;">
                                                                <img
                                                                    src="/assets/calendario.svg" alt=""
                                                                    class="ml-auto d-block mb-n3"
                                                                    style="max-height: 105px; opacity: 50%"></div>
                                                            <div class="card-body position-relative">
                                                                <h5 class="text-white-border-black mb-3 fs-16px">
                                                                    Nos visito el</h5>
                                                                <h3 class="text-white-border-black mt-n1">
                                                                    {{ $calendar.getDateOnly(ultimaVisita) }}</h3>
                                                                <span class="text-white-border-black">la ultima vez</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="Peluqueria">
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Observaciones</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['peluqueria'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{
                                                                    cambiarFormatoFecha(row['peluqueria'].created_at)
                                                                }}
                                                            </td>
                                                            <td>{{ row['peluqueria'].observaciones }}</td>
                                                            <td>{{ $moneyFormat(row['peluqueria'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="2">
                                                            <center>Total</center>
                                                        </td>
                                                        <td>{{ $moneyFormat(totalPeluqueria) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade" id="vacunacion">
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Grupo vacuna</th>
                                                        <th scope="col">Vacuna</th>
                                                        <th scope="col">Revacunación</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['vacunacion'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{
                                                                    cambiarFormatoFecha(row['vacunacion'].created_at)
                                                                }}
                                                            </td>
                                                            <td>{{ row['vacunacion']['grupo_vacuna'].nombre }}</td>
                                                            <td>{{ row['vacunacion']['vacuna'].nombre }}</td>
                                                            <td>{{
                                                                    cambiarFormatoFecha(row['vacunacion'].revacunacion)
                                                                }}
                                                            </td>
                                                            <td>{{ $moneyFormat(row['vacunacion'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="4">
                                                            <center>Total</center>
                                                        </td>
                                                        <td>{{ $moneyFormat(totalVacunacion) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade" id="desparasitacion">
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Grupo</th>
                                                        <th scope="col">Desparasitante</th>
                                                        <th scope="col">Redesparasitación</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['desparasitacion'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{
                                                                    cambiarFormatoFecha(row['desparasitacion'].created_at)
                                                                }}
                                                            </td>
                                                            <td>{{
                                                                    row['desparasitacion']['grupo_desparasitante'].nombre
                                                                }}
                                                            </td>
                                                            <td>{{
                                                                    row['desparasitacion']['desparasitante'].nombre
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    cambiarFormatoFecha(row['desparasitacion'].redesparacitacion)
                                                                }}
                                                            </td>
                                                            <td>{{ $moneyFormat(row['desparasitacion'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="4">
                                                            <center>Total</center>
                                                        </td>
                                                        <td>{{ $moneyFormat(totalDesparasitacion) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade" id="historiaclinica">
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Motivo de consulta</th>
                                                        <th scope="col">Diagnostico</th>
                                                        <th scope="col">Plan teraupetico</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['historiaclinica'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{
                                                                    cambiarFormatoFecha(row['historiaclinica'].created_at)
                                                                }}
                                                            </td>
                                                            <td>{{
                                                                    row['historiaclinica']['contenido']["anamnesis"].motivo_consulta === "" ?
                                                                        "(Sin especificar)" : row['historiaclinica']['contenido']["anamnesis"].motivo_consulta
                                                                }}
                                                            </td>
                                                            <td>{{
                                                                    row['historiaclinica']['contenido']["diagnostico"].descripcion === "" ?
                                                                        "(Sin especificar)" : row['historiaclinica']['contenido']["anamnesis"].motivo_consulta
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row['historiaclinica']['contenido']["plan_terapeutico"].descripcion === "" ?
                                                                        "(Sin especificar)" : row['historiaclinica']['contenido']["anamnesis"].motivo_consulta
                                                                }}
                                                            </td>
                                                            <td>{{ $moneyFormat(row['historiaclinica'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="4">
                                                            <center>Total</center>
                                                        </td>
                                                        <td>{{ $moneyFormat(totalHistoriaClinica) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade" id="laboratorio">
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Tipo examén</th>
                                                        <th scope="col">Observaciones</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['laboratorio'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{
                                                                    cambiarFormatoFecha(row['laboratorio'].created_at)
                                                                }}
                                                            </td>
                                                            <td>{{ row['laboratorio'].examen }}</td>
                                                            <td>{{ row['laboratorio'].observaciones }}</td>
                                                            <td>{{ $moneyFormat(row['laboratorio'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="3">
                                                            <center>Total</center>
                                                        </td>
                                                        <td>{{ $moneyFormat(totalLaboratorio) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

const moment = require('moment');
const models = require('../../utils/models');
const calendar = require('../../utils/calendar');

import Search from "../../components/search/Search";
import Cliente from "../../components/Formularios/Cliente";
import Mascota from "../../components/Formularios/Mascota";

export default {
    name: "Mascotas",
    components: {Search, Cliente, Mascota},
    data() {
        return {
            estado: 'buscando',
            mascota: models.mascotaModel(),
            cliente: models.clienteModel(),
            documentos: [],
            contador: {
                peluqueria: 0,
                vacunacion: 0,
                desparasitacion: 0,
                laboratorio: 0,
                historiaclinica: 0
            },
        }
    },
    computed: {
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
        totalHistoriaClinica() {
            let total = 0
            this.documentos.forEach(row => {
                if (row['historiaclinica'].id !== '00000000-0000-0000-0000-000000000000') {
                    total += row['historiaclinica']['total']
                }
            })
            return total
        },
        ultimaVisita() {
            let fecha = new Date(0)
            this.documentos.forEach(row => {
                if (calendar.parseToDate(row.created_at).getTime() > fecha.getTime()) {
                    fecha = calendar.parseToDate(row.created_at)
                }
            })
            return fecha
        }
    },
    methods: {
        cambiarFormatoFecha(date) {
            return calendar.getDateOnly(date) + " " + calendar.getTimeOnly(date)
        },
        seleccionar(mascota) {
            this.estado = 'seleccionado';
            if (mascota != null) {
                this.mascota = mascota;
                this.cliente = mascota["tercero"];
                this.$http.get(`/v1/reportes/mascota/${mascota.id}`).then(res => {
                    this.documentos = res.data.documentos
                    this.contador.peluqueria = res.data.total_peluqueria
                    this.contador.vacunacion = res.data.total_vacunacion
                    this.contador.desparasitacion = res.data.total_desparasitacion
                    this.contador.laboratorio = res.data.total_laboratorio
                    this.contador.historiaclinica = res.data.total_historiaclinica
                })
            } else {
                this.cargarDefaults();
                this.documentos = []
                this.contador.peluqueria = 0
                this.contador.vacunacion = 0
                this.contador.desparasitacion = 0
                this.contador.laboratorio = 0
                this.contador.historiaclinica = 0
            }
        },
    }, created() {
        this.documentos = []
        this.contador.peluqueria = 0
        this.contador.vacunacion = 0
        this.contador.desparasitacion = 0
        this.contador.laboratorio = 0
        this.contador.historiaclinica = 0
    }
}
</script>

<style scoped>

</style>
