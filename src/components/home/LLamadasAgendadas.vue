<template>
    <div class="row">
        <div class="col-md-12" v-if="calendarios.length === 0">
            <br>
            <br>
            <div style="font-weight: bolder">
                <center>
                    <i class="fa fa-1x fa-info-circle"></i>
                    <br>
                    <h3>No hay llamadas agendadas pendientes</h3>
                </center>
            </div>
        </div>
        <!-- <div class="col-md-12 mb-4" v-if="calendarios.length > 0">
             <br>
             <span class="font-weight-bolder">
                     Mostrar llamadas pendientes para:&emsp;<br>
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
                 <label class="btn btn-outline-primary " :class="availableServices.otros ? 'active' : '' ">
                     <input v-model="availableServices.otros" type="checkbox" autocomplete="off"
                     > Otros
                 </label>
             </div>
         </div>-->
        <div class="col-md-4 mb-4" v-for="row in calendarios2">
            <div class="card overflow-hidden fs-13px">
                <div class="card-img-overlay mb-n4 mr-n4 d-flex" style="bottom: 30px; top: auto;">
                    <img
                    :src="urlImagen(row['tipo'])" alt=""
                    class="ml-auto d-block mb-n3" style="max-height: 130px; opacity: 60%">
                </div>
                <div class="card-body position-relative">
                    <div class="col-md-12 text-right">
                        <h6>{{ row['tipo'] }}</h6>
                    </div>
                    <div class="card-subtitle mb-3">
                        <h3 style="text-transform: capitalize !important">
                            <img
                            :src="`/assets/animals/${row['mascota'].especie}.svg`"
                            style="width: 30px">&emsp;
                            {{ row['mascota'].nombre }}
                        </h3>
                        <small
                            class="font-weight-bold text-primary">{{ row['mascota'].especie.toUpperCase() }} </small>
                        <small class="font-weight-bold text-primary"
                               style="text-transform: capitalize"> {{ row['mascota'].raza }} </small>
                    </div>
                    <h5 class="card-title" style="text-transform: capitalize">{{ row['tercero']['nombre'] }}</h5>
                    <div class="card-text mb-3">
                        <div
                            style="width: 100%; height:20px;border: 0;overflow: hidden; margin-bottom: 5px;text-transform: capitalize">
                            <i class="fa fa-home"></i>: <span
                            v-b-tooltip="`${row['tercero'].direccion}, ${row['tercero'].barrio}`">{{
                                row['tercero'].direccion
                            }} , {{ row['tercero'].barrio }} </span>
                        </div>
                        <i class="fa fa-phone-alt"></i> Fijo:
                        {{ row["tercero"].telefono.length > 0 ? row["tercero"].telefono : `No registrado` }}&emsp;&emsp;|&emsp;&emsp;
                        <i class="fa fa-phone-alt"/> Cel:
                        {{ row["tercero"].celular.length > 0 ? row["tercero"].celular : `No registrado` }}
                    </div>
                    <div>
                        <a href="#" class="card-link" onclick="return;" @click="mostrarModal(row)">Cerrar agenda</a>
                        <a href="#" class="card-link" v-show="row.documento_id!==$root.$uuidNull"
                           :to="{name: 'service',params:{ id: row.documento_id }}">Ir al servicio asociado</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            {{ calendarios.length }}
        </div>
        <CerrarAgendamientoModal ref="info_modal" @update="(value)=>{update(value)}"/>

        <!--<div class="col-md-12" v-for="row in calendarios">
            <div class="card border-primary">
                <div class="card-header">{{row['tipo']}}</div>
                <div class="card-body">
                    <div class="card-title row" style="font-size: 1.2em">
                        <div class="col-md-6">
                            <b>Cliente:</b> {{row['tercero']['nombre']}}
                        </div>
                        <div class="col-md-6">
                            <b>Mascota:</b> {{row['mascota']['nombre']}} ({{row['mascota']['especie']}} :
                            {{row['mascota']['raza']}})
                        </div>
                    </div>
                    <div class="card-text" style="padding: 10px">
                        <div class="row">
                            <div class="col-md-3"><b>Telefono: </b> {{row['tercero']['telefono']}}</div>
                            <div class="col-md-3"><b>Celular: </b> {{row['tercero']['celular']}}</div>
                            <div class="col-md-6"><b>Dirección: </b> {{row['tercero']['direccion']}}
                                {{row['tercero']['barrio']}}
                            </div>
                        </div>
                        <br>
                        <b>Observaciones:</b><br>
                        {{row['observaciones_abierto']}}
                    </div>
                    <a href="#" onclick="return;" @click="mostrarModal(row)" class="card-link float-md-right"
                       style="margin-right: 20px">
                        Cerrar agendamiento
                    </a>
                    <router-link v-show="row.documento_id!==$root.$uuidNull"
                                 :to="{name: 'service',params:{ id: row.documento_id }}"
                                 class="card-link float-md-right" style="margin-right: 20px">Ir al
                        servicio asociado
                    </router-link>
                </div>
            </div>
            <br>
            <br>
        </div>-->
    </div>
</template>

<script>
import CerrarAgendamientoModal from "../agenda/CerrarAgendamientoModal";

export default {
    name: "LLamadasAgendadas",
    components: {CerrarAgendamientoModal},
    props: ['calendarios'],
    computed: {},
    watch: {
        calendarios: {
            handler(New, Old) {
                console.log("calendarios NEW", New)
                if (New.length !== Old.length){
                    if (this.intervalo !== null) {
                        clearInterval(this.intervalo)
                    }
                    this.counter = 0;
                    this.intervalo = setInterval(() => {
                        this.calendarios2.push(this.calendarios[this.counter])
                        this.counter++;
                        console.log("agregando elemento indice: ", this.counter)
                        if (this.counter >= this.calendarios.length) {
                            clearInterval(this.intervalo)
                        }
                    }, 5)
                }

            }
        }
    },
    data() {
        return {
            old: false,
            availableServices: {
                hairdressing: true,
                vaccinate: true,
                deworming: true,
                otros: true,
            },
            counter: 0,
            calendarios2: [],
            intervalo: null,
        }
    },
    methods: {
        canShow(tipo) {
            switch (tipo.toLowerCase()) {
                case 'peluquería':
                    return this.availableServices.hairdressing
                case 'vacunación':
                    return this.availableServices.vaccinate
                case 'desparasitación':
                    return this.availableServices.deworming
                default:
                    return this.availableServices.otros
            }
        },
        urlImagen(tipo) {
            switch (tipo.toLowerCase()) {
                case 'peluquería':
                    return "/assets/haircut.svg"
                case 'vacunación':
                    return "/assets/vaccinate.svg"
                case 'desparasitación':
                    return "/assets/deworming.svg"
                default:
                    return "/assets/call.svg"
            }
        },
        borderTipo(tipo) {
            switch (tipo.toLowerCase()) {
                case 'peluquería':
                    return "border-primary"
                case 'vacunación':
                    return "border-info"
                case 'desparasitación':
                    return "border-success"
                default:
                    return "border-danger"
            }
        },
        mostrarModal(agenda) {
            this.$refs['info_modal'].show(agenda)
        },
        update(value) {
            this.$emit("cerrado", value)
        }
    }
}
</script>

<style scoped>

</style>
