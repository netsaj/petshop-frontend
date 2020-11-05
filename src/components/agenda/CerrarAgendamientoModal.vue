<template>
    <div>
        <modal name="detalle-agenda"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               width="60%"
               height="auto">
            <div class="card border-secondary mb-3">
                <div class="card-header">Detalle agenda</div>
                <div class="card-body">
                    <div class="row" v-if="agenda !== null">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Tipo agenda:</label>
                                <input v-model="agenda['tipo']" type="text" class="form-control"
                                       :readonly="true">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Creado el:</label>
                                <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                            :disabled="true"
                                            v-model="agenda['created_at']"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Llamada programada para:</label>
                                <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                            :disabled="true"
                                            v-model="agenda['fecha_agendada']"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Fecha Cierre:</label>
                                <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                            :disabled="true"
                                            v-model="agenda['fecha_cierre']"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <center><b>Observaciones agenda</b></center>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Observaciones inicales:</label>
                                <textarea rows="3" class="form-control" v-model="agenda['observaciones_abierto']"
                                          :readonly="true"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Observaciones para cerrar la agenda:</label>
                                <textarea rows="3" class="form-control" v-model="agenda['observaciones_cerrado']"
                                          :readonly="readOnly" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="#" onclick="return;" @click="cerrarAgenda()" v-if="!readOnly"
                       class="btn  btn-primary float-md-right"
                       style="margin-right: 20px">
                        Cerrar agendamiento
                    </a>
                    <a href="#" onclick="return;" @click="hide()" class="btn btn-secondary float-md-right"
                       style="margin-right: 20px">
                        Cancelar
                    </a>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import {en, es} from 'vuejs-datepicker/dist/locale'
    import Datepicker from 'vuejs-datepicker'

    export default {
        name: "CerrarAgendamientoModal",
        props: {
            readOnly: {
                type: Boolean,
                default: false
            }
        },
        components: {Datepicker},
        data() {
            return {
                es: es,
                agenda: null
            }
        },
        methods: {
            show(item) {
                this.agenda = {...item};
                this.$modal.show('detalle-agenda')
            },
            hide() {
                this.$modal.hide('detalle-agenda')
            },
            cerrarAgenda() {
                let payload = {
                    'id': this.agenda.id,
                    'usuario_id': localStorage.getItem("user_id"),
                    'observaciones_cerrado': this.agenda['observaciones_cerrado']
                }
                this.$http.post("/v1/calendarios/cerrar", payload)
                    .then(res => {
                        console.log(res)
                        this.$emit('update', res['calendario'])
                        this.hide()
                    }).catch(err => {
                    this.$alerts.notificationError("Error cerrando agendamiento, intente nuevamente")
                })
            }
        }
    }
</script>

<style scoped>

</style>