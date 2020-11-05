<template>
    <div>
        <div id="content" class="app-content">
            <h1 class="page-header mb-3">
                Historial de servicios
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
                                                       @keyup="$event.key === 'Enter' ? search(1) : ()=>{}">
                                                <div class="input-group-prepend text-center">
                                                    <button class="btn btn-primary" @click="search(1)">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<ContentHeader tittle="Servicios activos"/>-->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card border-secondary">
                            <div class="card-body" style="">
                                <b-tabs content-class="pt-3">
                                    <b-tab title="Servicios" active>
                                        <ListaServicios :documentos="documentos" ref="listaservicios" :empty="''"/>
                                    </b-tab>

                                    <div class="col-md-12 mt-4">
                                        <hr>
                                        <div class="float-md-left">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#" @click="pagina > 0 ? search(pagina-1): search(1)">Anterior</a>
                                                </li>
                                                <li class="page-item" v-if="pagina > 5">
                                                    <a class="page-link" href="#" @click="search(1)">...</a>
                                                </li>
                                                <li class="page-item" v-for="i in numPaginas" v-if="i > pagina-5-(pagina+5 > numPaginas ? pagina+5-numPaginas : 0) && i < pagina+5+(pagina-5 < 0 ? 5-pagina : 0)"
                                                    :class="pagina === i ? 'active': ''">
                                                    <a class="page-link" href="#" @click="search(i)">{{i}}</a>
                                                </li>
                                                <li class="page-item" v-if="numPaginas > 10 && pagina <= (numPaginas-5)">
                                                    <a class="page-link" href="#" @click="search(pagina+10)">...</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#" @click="pagina <numPaginas ? search(pagina+1): search(numPaginas)">Siguiente</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <span class="float-md-right text-right"><b>Resultados</b>: {{total}}<br><b>Paginas: </b>{{numPaginas}}</span>
                                    </div>
                                </b-tabs>
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
import LLamadasAgendadas from "../components/home/LLamadasAgendadas";
import ListaServicios from "../components/home/ListaServicios";

import Vue from 'vue'
const calendar = require('../utils/calendar')

export default {
    name: "Home",
    components: {LLamadasAgendadas, ListaServicios, Datepicker},
    data() {
        return {
            es: es,
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
            criteria: '',
            documentos: [],
            pagina: 1,
            cantidad: 10,
            total: 0
        }
    },
    computed: {
        documents() {
            return this.documentos
        },
        numPaginas() {
            return Math.ceil(this.total / this.cantidad);
        }
    },
    methods: {
        async search(pagina) {
            this.pagina = pagina
            let fecha_inicio = this.fecha_inicio !== null ? calendar.toGoDatetime(this.fecha_inicio) : ''
            let fecha_fin = this.fecha_fin !== null ? calendar.toGoDatetime(this.fecha_fin) : ''

            try {
                this.documentos = []
                const res = await this.$http.get(`/v1/documentos/servicios/all?page=${pagina}&q=${this.criteria}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`)
                console.log(res.data)
                this.documentos = res.data.documentos;
                //this.$refs['listaservicios'].setValues(res.data.documentos)
                this.total = res.data.total
            } catch (e) {
                this.$httpErrors.axiosErrorHandler(e)
            }
        },
    },
    created() {
        let date = new Date()
        date.setDate(1)
        this.fecha_inicio = date
    }
}
</script>

<style scoped>

</style>
