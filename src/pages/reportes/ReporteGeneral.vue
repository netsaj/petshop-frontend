<template>
    <div>
        <div id="content" class="app-content">
            <h1 class="page-header mb-3">
                Listado de mascotas registradas
            </h1>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label class="form-label">Fecha inicio</label>
                                            <datepicker :language="es" :input-class="'form-control'"
                                                        :format="'yyyy/MM/dd'"
                                                        v-model="fecha_inicio"
                                                        style="background-color: white !important;"/>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label class="form-label">Fecha final</label>
                                            <datepicker :language="es" :input-class="'form-control'"
                                                        :format="'yyyy/MM/dd'"
                                                        v-model="fecha_fin"
                                                        style="background-color: white !important;"/>
                                        </div>
                                    </div>
                                    <div class="col-md-2" style="padding-top: 20px">
                                        <button class="btn btn-primary" @click="generar()">Generar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="nav nav-tabs">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" href="#home">Consolidado</a>
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
                                                <a class="nav-link" data-toggle="tab" href="#laboratorio">Laboratorio</a>
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
                                                    <div class="col-md-6">
                                                        <div class="row">
                                                            <div class="col-md-3 mb-4">
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
                                                            <div class="col-md-3 mb-4">
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
                                                            <div class="col-md-3 mb-4">
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
                                                            <div class="col-md-3 mb-4">
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
                                                            <div class="col-md-3 mb-4">
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
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <table class="table table-hover">
                                                            <thead>
                                                            <tr>
                                                                <th scope="col" colspan="3">
                                                                    <center>Totales</center>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th scope="col">Tipo de servicio</th>
                                                                <th scope="col">Total recaudado</th>
                                                                <th scope="col">Promedio por servicio</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <th>Peluqueria</th>
                                                                <td>{{ $moneyFormat(totalPeluqueria) }}</td>
                                                                <td>{{
                                                                        contador.peluqueria > 0 ?
                                                                            $moneyFormat(parseFloat(totalPeluqueria / contador.peluqueria)) :
                                                                            0
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>vacunación</th>
                                                                <td>{{ $moneyFormat(totalVacunacion) }}</td>
                                                                <td>{{
                                                                        contador.vacunacion > 0 ?
                                                                            $moneyFormat(parseFloat(totalVacunacion / contador.vacunacion)) :
                                                                            0
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Desparasitación</th>
                                                                <td>{{ $moneyFormat(totalDesparasitacion) }}</td>
                                                                <td>{{
                                                                        contador.desparasitacion > 0 ?
                                                                            $moneyFormat(
                                                                                parseFloat(totalDesparasitacion / contador.desparasitacion)) :
                                                                            0
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Consultas medicas</th>
                                                                <td>{{ $moneyFormat(totalHistoriaClinica) }}</td>
                                                                <td>{{
                                                                        contador.historiaclinica > 0 ? $moneyFormat(
                                                                            parseFloat(totalHistoriaClinica / contador.historiaclinica)) : 0
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Laboratorio</th>
                                                                <td>{{ $moneyFormat(totalLaboratorio) }}</td>
                                                                <td>{{
                                                                        contador.laboratorio > 0 ? $moneyFormat(
                                                                            parseFloat(totalLaboratorio / contador.laboratorio)) : 0
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    Total recaudado
                                                                </th>
                                                                <td colspan="2">{{
                                                                        $moneyFormat((totalPeluqueria + totalVacunacion + totalDesparasitacion + totalLaboratorio))
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="Peluqueria">
                                                <button @click="descargarPeluqueria()" class="btn btn-primary">Descargar excel
                                                </button>
                                                <br/>
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Cliente</th>
                                                        <th scope="col">Mascota</th>
                                                        <th scope="col">Observaciones</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['peluqueria'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{ cambiarFormatoFecha(row.created_at) }}</td>
                                                            <td>{{ row['tercero'].nombre }}</td>
                                                            <td>{{ row['mascota'].nombre }} ({{ row['mascota'].especie }}
                                                                {{ row['mascota'].raza }})
                                                            </td>
                                                            <td>{{ row['peluqueria'].observaciones }}</td>
                                                            <td>{{ $moneyFormat(row['peluqueria'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="4">
                                                            <center>Total</center>
                                                        </td>
                                                        <td>{{ $moneyFormat(totalPeluqueria) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade" id="vacunacion">
                                                <button @click="descargarVacunacion()" class="btn btn-primary">Descargar excel
                                                </button>
                                                <br/>
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Cliente</th>
                                                        <th scope="col">Mascota</th>
                                                        <th scope="col">Grupo vacuna</th>
                                                        <th scope="col">Vacuna</th>
                                                        <th scope="col">Revacunación</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['vacunacion'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{ cambiarFormatoFecha(row.created_at) }}</td>
                                                            <td>{{ row['tercero'].nombre }}</td>
                                                            <td>{{ row['mascota'].nombre }} ({{ row['mascota'].especie }}
                                                                {{ row['mascota'].raza }})
                                                            </td>
                                                            <td>{{ row['vacunacion']['grupo_vacuna'].nombre }}</td>
                                                            <td>{{ row['vacunacion']['vacuna'].nombre }}</td>
                                                            <td>{{ cambiarFormatoFecha(row['vacunacion'].revacunacion) }}</td>
                                                            <td>{{ $moneyFormat(row['vacunacion'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="6">
                                                            <center>Total</center>
                                                        </td>
                                                        <td>{{ $moneyFormat(totalVacunacion) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade" id="desparasitacion">
                                                <button @click="descargarDesparasitacion()" class="btn btn-primary">Descargar
                                                    excel
                                                </button>
                                                <br/>
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Cliente</th>
                                                        <th scope="col">Mascota</th>
                                                        <th scope="col">Grupo</th>
                                                        <th scope="col">Desparasitante</th>
                                                        <th scope="col">Redesparasitación</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['desparasitacion'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{ cambiarFormatoFecha(row.created_at) }}</td>
                                                            <td>{{ row['tercero'].nombre }}</td>
                                                            <td>{{ row['mascota'].nombre }} ({{ row['mascota'].especie }}
                                                                {{ row['mascota'].raza }})
                                                            </td>
                                                            <td>{{ row['desparasitacion']['grupo_desparasitante'].nombre }}</td>
                                                            <td>{{ row['desparasitacion']['desparasitante'].nombre }}</td>
                                                            <td>{{
                                                                    cambiarFormatoFecha(row['desparasitacion'].redesparacitacion)
                                                                }}
                                                            </td>
                                                            <td>{{ $moneyFormat(row['desparasitacion'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="6">
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
                                                        <th scope="col">Cliente</th>
                                                        <th scope="col">Mascota</th>
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
                                                            <td>{{ row['tercero'].nombre }}</td>
                                                            <td>{{ row['mascota'].nombre }} ({{ row['mascota'].especie }}
                                                                {{ row['mascota'].raza }})
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
                                                        <td colspan="6">
                                                            <center>Total</center>
                                                        </td>
                                                        <td>{{ $moneyFormat(totalHistoriaClinica) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade" id="laboratorio">
                                                <button @click="descargarLaboratorio()" class="btn btn-primary">Descargar
                                                    excel
                                                </button>
                                                <br/>
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Cliente</th>
                                                        <th scope="col">Mascota</th>
                                                        <th scope="col">Tipo examén</th>
                                                        <th scope="col">Observaciones</th>
                                                        <th scope="col" style="width: 20%">Valor</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <template v-for="row in documentos">
                                                        <tr v-if="row['laboratorio'].id !== '00000000-0000-0000-0000-000000000000' ">
                                                            <td>{{ cambiarFormatoFecha(row.created_at) }}</td>
                                                            <td>{{ row['tercero'].nombre }}</td>
                                                            <td>{{ row['mascota'].nombre }} ({{ row['mascota'].especie }}
                                                                {{ row['mascota'].raza }})
                                                            </td>
                                                            <td>{{ row['laboratorio'].examen }}</td>
                                                            <td>{{ row['laboratorio'].observaciones }}</td>
                                                            <td>{{ $moneyFormat(row['laboratorio'].total) }}</td>
                                                        </tr>
                                                    </template>
                                                    <tr style="font-weight: bold">
                                                        <td colspan="5">
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
import {en, es} from 'vuejs-datepicker/dist/locale'
import Datepicker from 'vuejs-datepicker'

const calendar = require('../../utils/calendar')
export default {
    components: {Datepicker},
    name: "ReporteGeneral",
    data() {
        return {
            es: es,
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
            documentos: [],
            contador: {
                peluqueria: 0,
                vacunacion: 0,
                desparasitacion: 0,
                laboratorio: 0,
                historiaclinica:0,
            },
        }
    },
    created() {
        let date = new Date()
        date.setDate(1)
        this.fecha_inicio = date
        this.generar()
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
        }
    },
    methods: {
        cambiarFormatoFecha(date) {
            return calendar.getDateOnly(date) + " " + calendar.getTimeOnly(date)
        },
        generar() {
            let fecha_inicio = this.fecha_inicio !== null ? calendar.toGoDatetime(this.fecha_inicio) : ''
            let fecha_fin = this.fecha_fin !== null ? calendar.toGoDatetime(this.fecha_fin) : ''
            this.$http.get(`/v1/reportes/general?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`)
                .then(res => {
                    console.log(res.data)
                    this.documentos = res.data.documentos
                    this.contador.peluqueria = res.data.total_peluqueria
                    this.contador.vacunacion = res.data.total_vacunacion
                    this.contador.desparasitacion = res.data.total_desparasitacion
                    this.contador.laboratorio = res.data.total_laboratorio
                    this.contador.historiaclinica = res.data.total_historiaclinica
                }).catch(err => {
                this.$httpErrors.axiosErrorHandler(err)
            })
        },
        descargarPeluqueria() {
            let datos = [];
            this.documentos.forEach(row => {
                if (row['peluqueria'].id !== '00000000-0000-0000-0000-000000000000') {
                    datos.push([
                        this.cambiarFormatoFecha(row.created_at),
                        row['tercero'].nombre,
                        row['mascota'].nombre,
                        row['mascota'].especie,
                        row['mascota'].raza,
                        row['peluqueria'].total,
                        row['peluqueria'].observaciones
                    ])
                }
            })
            const header = ['fecha', 'cliente', 'mascota', 'especie', 'raza', 'valor', 'observaciones']
            this.descargarExcel(header, datos)
        },
        descargarVacunacion() {
            let datos = [];
            this.documentos.forEach(row => {
                if (row['vacunacion'].id !== '00000000-0000-0000-0000-000000000000') {
                    datos.push([
                        this.cambiarFormatoFecha(row.created_at),
                        row['tercero'].nombre,
                        row['mascota'].nombre,
                        row['mascota'].especie,
                        row['mascota'].raza,
                        row['vacunacion'].total,
                        row['vacunacion']['grupo_vacuna'].nombre,
                        row['vacunacion']['vacuna'].nombre,
                        this.cambiarFormatoFecha(row['vacunacion'].revacunacion)

                    ])
                }
            })
            const header = ['fecha', 'cliente', 'mascota', 'especie', 'raza', 'valor', 'grupo vacuna', 'vacuna', 'revacunacion']
            this.descargarExcel(header, datos)
        },
        descargarDesparasitacion() {
            let datos = [];
            this.documentos.forEach(row => {
                if (row['desparasitacion'].id !== '00000000-0000-0000-0000-000000000000') {
                    datos.push([
                        this.cambiarFormatoFecha(row.created_at),
                        row['tercero'].nombre,
                        row['mascota'].nombre,
                        row['mascota'].especie,
                        row['mascota'].raza,
                        row['desparasitacion'].total,
                        row['desparasitacion']['grupo_desparasitante'].nombre,
                        row['desparasitacion']['desparasitante'].nombre,
                        this.cambiarFormatoFecha(row['desparasitacion'].redesparacitacion)
                    ])
                }
            })
            const header = ['fecha', 'cliente', 'mascota', 'especie', 'raza', 'valor', 'grupo desparasitante', 'desparasitante', 'redesparasitación']
            this.descargarExcel(header, datos)
        },
        descargarLaboratorio() {
            let datos = [];
            this.documentos.forEach(row => {
                if (row['laboratorio'].id !== '00000000-0000-0000-0000-000000000000') {
                    datos.push([
                        this.cambiarFormatoFecha(row.created_at),
                        row['tercero'].nombre,
                        row['mascota'].nombre,
                        row['mascota'].especie,
                        row['mascota'].raza,
                        row['laboratorio'].total,
                        row['laboratorio'].examen,
                        row['laboratorio'].observaciones
                    ])
                }
            })
            const header = ['fecha', 'cliente', 'mascota', 'especie', 'raza', 'valor', 'examen', 'observaciones']
            this.descargarExcel(header, datos)
        },
        descargarExcel(header, rows) {
            import('../../utils/excelExporter/Export2Excel').then(excel => {
                const tHeader = header
                const data = rows
                excel.export_json_to_excel({
                    header: tHeader, //Header Required
                    data, //Specific data Required
                    filename: 'reporte-excel', //Optional
                    autoWidth: true, //Optional
                    bookType: 'xlsx' //Optional
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
