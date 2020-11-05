<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card border-secondary">
                    <div class="card-body" style="">
                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="form-label">Criterio</label>
                                    <select class="form-control" v-model="criterio">
                                        <option :value="'all'">Todos</option>
                                        <option :value="'texto'">Texto</option>
                                        <option :value="'rfid'">Tarjeta</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <label class="form-label">Buscar coincidencias para</label>
                                    <div class="input-group">
                                        <input type="text" v-model="criteria" class="form-control" placeholder=""
                                               @keyup="$event.key === 'Enter' ? search() : ()=>{}">
                                        <div class="input-group-prepend text-center">
                                            <button class="btn btn-primary" @click="search()">Buscar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 text-center">
                                <h5>Resultados de busqueda
                                    <template v-if="this.lastCriteria != ''">para <b>'{{lastCriteria}}'</b></template>
                                </h5>
                            </div>
                            <div class="col-md-12">
                                <table class="table table-hover table-striped table-bordered style-3">
                                    <thead class="style-3">
                                    <tr class="bg-secondary">
                                        <th scope="col">Dueño</th>
                                        <th scope="col">Teléfono</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Mascota</th>
                                        <th scope="col">Especie</th>
                                        <th scope="col">Raza</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                    </thead>
                                    <tbody class="">
                                    <template v-for="mascota in resultado">
                                        <tr>
                                            <td style="text-transform: capitalize !important">
                                                {{mascota["tercero"]["nombre"]}}
                                            </td>
                                            <td>{{mascota["tercero"]["celular"]}}</td>
                                            <td style="text-transform: capitalize !important">{{mascota["tercero"]["direccion"]}},  {{mascota["tercero"]["barrio"]}}</td>
                                            <td style="text-transform: capitalize !important">{{mascota["nombre"]}}</td>
                                            <td>{{mascota["especie"]}}</td>
                                            <td>{{mascota["raza"]}}</td>
                                            <td>
                                                <div class="btn-group">
                                                    <button class="btn btn-info btn-sm"
                                                            @click="mostrarInfo(mascota)">
                                                        <i class="fa fa-1x fa-eye"/>
                                                    </button>
                                                    <button class="btn btn-success btn-sm"
                                                            @click="seleccionarResultado(mascota)">
                                                        <i class="fa fa-1x fa-check"/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-success" @click="seleccionarResultado(null)" v-if="allowNew">
                                    <i class="fa fa-1x fa-plus-circle"/> &emsp;
                                    Registrar nuevo
                                </button>
                            </div>
                            <div class="col-md-9 mt-4">
                                <div class="float-md-left">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a class="page-link" href="#" @click="pagina > 0 ? setPagina(pagina-1): setPagina(1)">Anterior</a>
                                        </li>
                                        <li class="page-item" v-if="pagina > 5">
                                            <a class="page-link" href="#" @click="setPagina(1)">...</a>
                                        </li>
                                        <li class="page-item" v-for="i in numPaginas" v-if="i > pagina-5-(pagina+5 > numPaginas ? pagina+5-numPaginas : 0) && i < pagina+5+(pagina-5 < 0 ? 5-pagina : 0)"
                                            :class="pagina === i ? 'active': ''">
                                            <a class="page-link" href="#" @click="setPagina(i)">{{i}}</a>
                                        </li>
                                        <li class="page-item" v-if="numPaginas > 10 && pagina <= (numPaginas-5)">
                                            <a class="page-link" href="#" @click="setPagina(pagina+10)">...</a>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link" href="#" @click="pagina <numPaginas ? setPagina(pagina+1): setPagina(numPaginas)">Siguiente</a>
                                        </li>
                                    </ul>
                                </div>
                                <span class="float-md-right text-right"><b>Resultados</b>: {{total}}<br><b>Paginas: </b>{{numPaginas}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SearchInformationModal ref="info_modal" :visible="modalVisible"/>
    </div>
</template>

<script>
   import SearchInformationModal from "./SearchInformationModal";

   const moment = require('moment');
   const models = require("../../utils/models");
   const calendar = require("../../utils/calendar");
   export default {
      name: "Search",
      components: {SearchInformationModal},
      computed: {
         numPaginas() {
            return Math.ceil(this.total / this.cantidad);
         }
      },
      props: {
         allowNew: {
            type: Boolean,
            default: true
         }
      },
      data() {
         return {
            modalVisible: false,
            mascota: models.mascotaModel(),
            cliente: models.clienteModel(),
            criteria: '',
            resultado: [],
            pagina: 1,
            cantidad: 10,
            total: 0,
            criterio: 'all',
            lastCriteria: '',
         }
      },
      methods: {
         setPagina(i) {
            this.pagina = i;
            this.search()
         },
         async search() {
            if (this.criteria.length > 0) {
               this.lastCriteria = this.criteria
               this.criteria = ''
               this.pagina = 1
            }
            console.log(`buscando por: ${this.lastCriteria}`)
            this.$http.get(`/v1/clientes?page=${this.pagina}&size=${this.cantidad}&q=${this.lastCriteria}`)
               .then(res => {
                  this.resultado = res.data.resultado;
                  this.total = res.data.total;
               });
         },
         mostrarInfo(mascota) {
            this.mascota = mascota;
            this.cliente = mascota['tercero'];
            this.$refs['info_modal'].show(mascota, mascota['tercero'])
         },
         seleccionarResultado(mascota) {
            if (mascota !== null) {
               mascota.edad = calendar.calcYears(mascota.fecha_nacimiento);
            }
            this.$emit('seleccionarResultado', mascota)
         }
      },
      created() {
         this.lastCriteria = ''
      }
   }
</script>

<style scoped>

</style>
