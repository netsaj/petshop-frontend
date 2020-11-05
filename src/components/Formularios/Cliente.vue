<template>
    <div>
        <div class="card border-primary" style="min-height: 100%">
            <div class="card-header bg-primary text-light">Información del cliente</div>
            <div class="card-body">
                <div class="row">
                    <input v-model="cliente.id" type="hidden">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label material-label">Nombres y apellidos</label>
                            <input v-model="cliente.nombre" type="text" class="form-control"
                                   :disabled="!isEditable"
                                   style="text-transform:capitalize" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Cédula</label>
                            <input v-model.number="cliente.cedula" type="number" class="form-control" placeholder=""
                                   :disabled="!isEditable"
                                   maxlength="12">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Telefóno</label>
                            <input v-model="cliente.telefono" type="text" class="form-control" placeholder=""
                                   :disabled="!isEditable">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Celular</label>
                            <input v-model="cliente.celular" type="text" class="form-control" placeholder=""
                                   :disabled="!isEditable">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input v-model="cliente.email" type="text" class="form-control" :disabled="!isEditable"
                                   placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Dirección</label>
                            <input v-model="cliente.direccion" type="text" class="form-control" placeholder=""
                                   :disabled="!isEditable">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Barrio</label>
                            <!--
                            <v-select :class=" 'form-control' " :searchable="true"
                                      v-model="cliente.barrio"
                                      :disabled="!isEditable"
                                      :reduce="(barrio)=>{return barrio['nombre']}"
                                      :options="barrios" :label="'nombre'"/>
                                      -->
                            <input class="form-control" v-model="cliente.barrio">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const models = require('../../utils/models');

    export default {
        name: "Cliente",
        props: {
            cliente: {
                type: Object,
                required: true
            },
            editable: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data() {
            return {
                barrios: []
            }
        },
        computed: {
            isEditable() {
                return this.editable
            }
        },
        watch: {
            cliente: {
                deep: true,
                immediate: true,
                handler(newValue, oldValue) {

                }
            }
        },
        methods: {
            limpiarFormulario() {
                this.cliente = models.clienteModel()
            },

        },
        created() {
            this.$http.get("/v1/barrios")
                .then(res => {
                    this.barrios = res.data.barrios
                });
            //this.cliente = models.clienteModel()
        }
    }
</script>

<style scoped>

</style>
