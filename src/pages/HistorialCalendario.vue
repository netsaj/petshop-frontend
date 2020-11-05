<template>
    <div>
        <div id="content" class="app-content">
            <h1 class="page-header mb-3">
                Historial Agenda
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
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label class="form-label">Buscar coincidencias para</label>
                                            <div class="input-group">
                                                <input type="text" v-model="criteria" class="form-control"
                                                       placeholder=""
                                                       @keyup="$event.key === 'Enter' ? search() : ()=>{}">
                                                <div class="input-group-prepend text-center">
                                                    <button class="btn btn-primary" @click="search()">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">

                                        <table class="table table-hover">
                                            <thead>
                                            <tr>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Cierre</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Cliente</th>
                                                <th scope="col">Mascota</th>
                                                <th scope="col">Observaciones cierre</th>
                                                <th scope="col">Detalle</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="row in calendarios">
                                                <td>
                                                    {{ $calendar.getDateOnly(row['fecha_agendada']) }}<br>
                                                    {{ $calendar.getTimeOnly(row['fecha_agendada']) }}
                                                </td>
                                                <td>
                                                    {{
                                                        row['fecha_cierre'] !== '' ? $calendar.getDateOnly(row['fecha_cierre']) : ''
                                                    }}
                                                    <br/>
                                                    {{
                                                        row['fecha_cierre'] !== '' ? $calendar.getTimeOnly(row['fecha_cierre']) : ''
                                                    }}
                                                </td>
                                                <td style="text-transform: capitalize">
                                                    {{ row['tipo'] }}
                                                </td>
                                                <td style="text-transform: capitalize">
                                                    {{ row['tercero'].nombre }}
                                                </td>
                                                <td style="text-transform: capitalize">
                                                    <span class="font-weight-bold" style="text-transform: capitalize !important"><img
                                                        :src="`/assets/animals/${row['mascota'].especie}.svg`" style="width: 26px">&emsp;{{ row['mascota'].nombre }}
                                                    </span><br>
                                                    <small
                                                        class="font-weight-bold text-primary">{{ row['mascota'].especie.toUpperCase() }}</small> -
                                                    <small class="font-weight-bold text-primary"
                                                           style="text-transform: capitalize">{{ row['mascota'].raza }}</small>
                                                </td>
                                                <td>
                                                    {{ row['observaciones_cerrado'] }}
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <button @click="mostrarModal(row)"
                                                                class="btn btn-outline-info btn-sm">
                                                            <i class="fa fa-1x fa-eye"/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <div class="col-md-12 mt-4">
                                        <hr>
                                        <div class="float-md-left">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#"
                                                       @click="pagina > 0 ? setPagina(pagina-1): setPagina(1)">Anterior</a>
                                                </li>
                                                <li class="page-item" v-if="pagina > 5">
                                                    <a class="page-link" href="#" @click="setPagina(1)">...</a>
                                                </li>
                                                <li class="page-item" v-for="i in numPaginas"
                                                    v-if="i > pagina-5-(pagina+5 > numPaginas ? pagina+5-numPaginas : 0) && i < pagina+5+(pagina-5 < 0 ? 5-pagina : 0)"
                                                    :class="pagina === i ? 'active': ''">
                                                    <a class="page-link" href="#" @click="setPagina(i)">{{ i }}</a>
                                                </li>
                                                <li class="page-item"
                                                    v-if="numPaginas > 10 && pagina <= (numPaginas-5)">
                                                    <a class="page-link" href="#" @click="setPagina(pagina+10)">...</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#"
                                                       @click="pagina <numPaginas ? setPagina(pagina+1): setPagina(numPaginas)">Siguiente</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <span class="float-md-right text-right"><b>Resultados</b>: {{ total }}<br><b>Paginas: </b>{{
                                                numPaginas
                                            }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <CerrarAgendamientoModal ref="info_modal" :read-only="true"/>
    </div>
</template>

<script>
import {en, es} from 'vuejs-datepicker/dist/locale'
import Datepicker from 'vuejs-datepicker'
import CerrarAgendamientoModal from "../components/agenda/CerrarAgendamientoModal";

const calendar = require('../utils/calendar')

export default {
    components: {CerrarAgendamientoModal, Datepicker},
    name: "HistorialCalendario",
    data() {
        return {
            es: es,
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
            criteria: '',
            calendarios: [],
            pagina: 1,
            cantidad: 10,
            total: 0
        }
    },
    computed: {
        numPaginas() {
            return Math.ceil(this.total / this.cantidad);
        }
    },
    methods: {
        cambiarFormatoFecha(date) {
            return calendar.cambiarFormatoFecha(date)
        },
        setPagina(i) {
            this.pagina = i;
            this.search()
        },
        search() {
            let fecha_inicio = this.fecha_inicio !== null ? calendar.toGoDatetime(this.fecha_inicio) : ''
            let fecha_fin = this.fecha_fin !== null ? calendar.toGoDatetime(this.fecha_fin) : ''


            this.$http.get(`/v1/calendarios/historial?page=${this.pagina}&q=${this.criteria}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`)
                .then(res => {
                    console.log(res.data)
                    this.calendarios = res.data.calendarios;
                    this.total = res.data.total
                })
                .catch(err => {
                    this.$httpErrors.axiosErrorHandler(err)
                })
        },
        mostrarModal(agenda) {
            this.$refs['info_modal'].show(agenda)
        },
    }
}
</script>

<style scoped>

</style>
