<template>
    <div>
        <!--<div class="col-md-12" v-if="documents.length === 0">
            <center>
                <i class="fa fa-1x fa-info-circle"></i>
                <br>
                <h6>No hay documentos que mostrar.<br>Intente un criterio de busqueda diferente.</h6>
            </center>
        </div>-->
        <template v-for=" row in documents" >
            <b-card no-body class="col-md-12">
                <div class="widget-reminder hovering-pan">
                    <div class="widget-reminder-item">
                        <div class="widget-reminder-time font-weight-bold text-center" style="width: 100px; padding: 0">
                            <br/>
                            {{ $calendar.getDateOnly(row['created_at']) }}<br/>
                            {{ $calendar.getTimeOnly(row['created_at']) }}
                        </div>
                        <div class="widget-reminder-divider" :class="row['historiaclinica'].id !== $root.$uuidNull? 'bg-primary' : 'bg-success'"></div>
                        <div class="widget-reminder-content">
                            <div class="row">
                                <div class="col-md-5">
                                    <span
                                        style="font-weight: bold; font-size: 1.2em;text-transform: capitalize !important"
                                        class="primary">{{ row["tercero"].nombre }}</span><br/>
                                    <div
                                        style="width: 100%; height:20px;border: 0;overflow: hidden; margin-bottom: 5px;text-transform: capitalize">
                                        <i class="fa fa-home"></i>: <span
                                        v-b-tooltip="`${row['tercero'].direccion}, ${row['tercero'].barrio}`">{{ row['tercero'].direccion }} , {{ row['tercero'].barrio }} </span>
                                    </div>
                                    <i class="fa fa-phone-alt"></i> Fijo:
                                    {{ row["tercero"].telefono.length > 0 ? row["tercero"].telefono : `No registrado` }}&emsp;&emsp;|&emsp;&emsp;
                                    <i class="fa fa-phone-alt"/> Cel:
                                    {{ row["tercero"].celular.length > 0 ? row["tercero"].celular : `No registrado` }}
                                </div>
                                <div class="col-md-2 text-center">
                                    <b>Mascota</b>
                                    <h3 style="text-transform: capitalize !important"><img
                                        :src="`/assets/animals/${row['mascota'].especie}.svg`" style="width: 30px">&emsp;{{ row['mascota'].nombre }}
                                    </h3>
                                    <small
                                        class="font-weight-bold text-primary">{{ row['mascota'].especie.toUpperCase() }}</small> -
                                    <small class="font-weight-bold text-primary"
                                           style="text-transform: capitalize">{{ row['mascota'].raza }}</small>
                                </div>
                                <div class="col-md-2">
                                    <div style="margin-bottom: 4px"><b>Servicios</b></div>
                                    <template v-if="row['peluqueria'].id !== $root.$uuidNull"><i
                                        class="fa fa-angle-right"></i> Peluqueria<br></template>
                                    <template v-if="row['vacunacion'].id !== $root.$uuidNull"><i
                                        class="fa fa-angle-right"></i> Vacunación<br></template>
                                    <template v-if="row['desparasitacion'].id !== $root.$uuidNull"><i
                                        class="fa fa-angle-right"></i> Desparasitación<br></template>
                                    <template v-if="row['historiaclinica'].id !== $root.$uuidNull"><i
                                        class="fa fa-angle-right"></i> Consulta medica<br></template>
                                    <template v-if="row['laboratorio'].id !== $root.$uuidNull"><i
                                        class="fa fa-angle-right"></i> Examen laboratorio<br></template>
                                </div>
                                <div class="col-md-2 text-center">
                                    <h4>Valor</h4>
                                    ${{ row['total'] }}
                                </div>
                                <div class="col-md-1 text-center">
                                    <template v-if="row['historiaclinica'].id !== $root.$uuidNull">
                                        <router-link :to="{name: 'consulta',params:{id:row.id}}"
                                                     class="btn btn-primary">
                                            <i class="fa fa-1x fa-eye"/>
                                        </router-link>
                                    </template>
                                    <template v-else>
                                        <router-link :to="{name: 'service',params:{id:row.id}}"
                                                     class="btn btn-primary">
                                            <i class="fa fa-1x fa-eye"/>
                                        </router-link>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-card>
        </template>

        <!--<div class="table-responsive" hidden>
            <table class="table table-hover table-striped table-bordered">
                <thead>
                <tr class="bg-secondary">
                    <th scope="col">Fecha/Hora</th>
                    <th scope="col">Dueño</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Mascota</th>
                    <th scope="col">Raza</th>
                    <th scope="col">Servicios</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Opciones</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in documentos">
                    <td style="font-size: 0.9em">
                        {{ cambiarFormatoFecha(row['created_at']) }}
                    </td>
                    <td style="text-transform: capitalize !important">{{ row["tercero"].nombre }}</td>
                    <td>
                        <li>Tel: {{ row["tercero"].telefono }}</li>
                        <li>Cel: {{ row["tercero"].celular }}</li>
                    </td>
                    <td style="text-transform: capitalize !important">{{ row['mascota'].nombre }}</td>
                    <td>{{ row["mascota"].especie.toUpperCase() }} <br/>({{ row["mascota"].raza.toUpperCase() }})</td>
                    <td>
                        <span v-if="row['peluqueria'].id !== $root.$uuidNull"><i class="fa fa-angle-right"></i> Peluqueria<br></span>
                        <span v-if="row['vacunacion'].id !== $root.$uuidNull"><i class="fa fa-angle-right"></i> Vacunación<br></span>
                        <span v-if="row['desparasitacion'].id !== $root.$uuidNull"><i class="fa fa-angle-right"></i> Desparasitación<br></span>
                        <span v-if="row['historiaclinica'].id !== $root.$uuidNull"><i class="fa fa-angle-right"></i> Consulta medica<br></span>
                        <span v-if="row['laboratorio'].id !== $root.$uuidNull"><i class="fa fa-angle-right"></i> Examen laboratorio<br></span>
                    </td>
                    <td>$ {{ row['total'] }}</td>
                    <td class="text-center">
                        <div class="btn-group">
                            <router-link :to="{name: 'service',params:{id:row.id}}"
                                         class="btn btn-primary">
                                <i class="fa fa-1x fa-eye"/>
                            </router-link>
                        </div>
                    </td>
                </tr>
                <tr v-if="documentos.length == 0">
                    <td colspan="8" class="text-center">
                        <br>
                        <h4>{{ empty }}</h4>
                        <br>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>-->
    </div>
</template>

<script>
const calendar = require('../../utils/calendar')
export default {
    name: "ListaServicios",
    props: ['documentos', 'empty'],
    data(){
        return {
            documents: []
        }
    },
    watch:{
        documentos(New, Old){
            this.documents = New
        }
    },
    methods: {
        cambiarFormatoFecha(date) {
            return calendar.getDateOnly(date) + " " + calendar.getTimeOnly(date)
        },
        setValues(items){
            this.documents = []
            this.documents.push(...items)
        }
    },

}
</script>

<style scoped>

</style>
