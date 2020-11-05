<template>
    <div>
        <div class="card border-primary mb-3">
            <div class="card-header bg-primary text-light">Información de la mascota
                <button style="position: absolute;right: 0;top:0;height: 32px"
                        class="btn btn-sm btn-secondary font-weight-bold" v-if="editable && !setDisableNewMascota" @click="limpiarFormulario()">Nueva mascota
                </button>
            </div>
            <div class="card-body">
                <div class="row">
                    <input type="hidden" v-model="mascota.id">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label material-label">Nombre</label>
                            <input v-model="mascota.nombre" style="text-transform:capitalize" type="text"
                                   :disabled="!isEditable"
                                   class="form-control" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Especie</label>
                            <select v-model="mascota.especie" class="form-control"
                                    :disabled="!isEditable">
                                <option :value="'Perro'">Perro</option>
                                <option :value="'Gato'">Gato</option>
                                <option :value="'Conejo'">Conejo</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Raza</label>
                            <v-select :class=" 'form-control' " :searchable="true"
                                      v-model="mascota.raza" :disabled="!isEditable"
                                      :options="mascota.especie === 'Perro' ? perros : (
                                          mascota.especie === 'Gato' ? gatos : conejos
                                      )"
                                      :label="'nombre'"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Color</label>
                            <input v-model="mascota.color" type="text" class="form-control" placeholder=""
                                   :disabled="!isEditable">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Peso</label>
                            <div class="input-group">
                                <input v-model.number="mascota.peso" type="number" step="0.1" class="form-control"
                                       :disabled="!isEditable"
                                       placeholder="">
                                <div class="input-group-append">
                                    <span class="input-group-text">&nbsp;&nbsp;KG&nbsp;&nbsp;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Sexo</label>
                            <select v-model="mascota.sexo" class="form-control"
                                    :disabled="!isEditable">
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Edad</label>
                            <div class="input-group">
                                <input v-model.number="mascota.edad" type="number" step="0.5" class="form-control"
                                       placeholder=""
                                       :disabled="!isEditable"
                                       @keyup="()=>{mascota.fecha_nacimiento = calendar.calculateDateFromYears(mascota.edad)}">
                                <div class="input-group-append">
                                    <span class="input-group-text">Años</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Fecha Nacimiento</label>
                            <datepicker :language="es" input-class="form-control .datepiker" :format="'yyyy/MM/dd'"
                                        v-model="mascota.fecha_nacimiento"
                                        :disabled="!isEditable"
                                        style="background-color: white !important;"
                                        input-style="background-color: white !important;"
                                        v-on:input="()=>{mascota.edad = calendar.calcYears(mascota.fecha_nacimiento)}"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Tarjeta de cliente:</label>
                            <input v-model="mascota.rfid_card_id" type="text" class="form-control">
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

    const calendar = require('../../utils/calendar');
    const models = require('../../utils/models');
    export default {
        components: {Datepicker},
        name: "Mascota",
        props: {
            mascota: {
                type: Object,
                required: true
            },
            editable: {
                type: Boolean,
                required: false,
                default: true
            },
            disableNewMascota: {
                type: Boolean,
                required: false,
                default: true
            }

        }
        ,
        watch: {
            editable(New, Old) {
                this.isEditable = New
            },
            disableNewMascota(New, Old) {
                this.enableNewMascota = New
            }
        },
        data() {
            return {
                setDisableNewMascota: true,
                isEditable: true,
                es: es,
                calendar: calendar,
                especie: 'Perro',
                raza: '',
                perros: [
                    "PINSCHER", "SHIH TZU", "PUG", "POODLE", "BEAGLE", "CHIUAHUA", "SCHNAUZER",
                    "BULLDOG FRANCES", "BULLDOG INGLES", "POMERANIA", "BOSTON TERRIER", "COCKER SPANIEL INGLES",
                    "COCKER SPANIEL AMERICANO", "YORKSHIRE TERRIER", "HUSKY SIBERIANO", "ALASKAN MALAMUTE",
                    "PASTOR ALEMAN", "AMERICAN PITBULL TERRIER", "STAFFORDSHIRE BULL TERRIER", "BULLY",
                    "BULL TERRIER", "ROTTWEILER", "GRAN DANES", "SAMOYEDO", "DOBERMAN", "LABRADOR RETRIEVER",
                    "GOLDEN RETRIEVER", "SAN BERNARDO", "WEIMARANNER", "BOXER", "CHOW CHOW", "SHAR PEI", "CHAPOLO",
                    "BASSET HOUSE", "CRIOLLO"
                ],
                gatos: ["ESFINGE", "PERSA", "SIAMES", "AZUL RUSO", "ANGORA", "BENGALA", "CRIOLLO"],
                conejos: ["HOLANDÉS ENANO", "CABEZA DE LEON", "REX", "CRIOLLO", "POLACO"],
            }
        },
        methods: {
            limpiarFormulario() {
                this.$emit("nuevo", models.mascotaModel())
            },
        },
        created() {
            this.isEditable = this.editable
        }
    }
</script>

<style scoped>

</style>
