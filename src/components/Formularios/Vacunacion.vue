<template>
    <div v-if="old" class="col-md-12">
        <div class="card border-primary mb-3">
            <div class="card-header bg-primary text-light">Servicio de vacunación</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Categoría de vacuna</label>
                            <select v-model.number="item.grupo_vacuna_id" class="form-control"
                                    @change="limpiarVacuna()">
                                <option v-for="row in grupoVacunas" v-show="row.especie == especie" :value="row.ID">
                                    {{ row.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label class="form-label">Vacuna a aplicar</label>
                            <select v-model.number="item.vacuna_id" class="form-control">
                                <option v-for="row in vacunasDelGrupo"
                                        v-show="row.grupo_vacuna === item.grupo_vacuna_id" :value="row.ID">
                                    {{ row.nombre }} {{ row["composicion"] !== '' ? `(${row["composicion"]})` : '' }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Revacunación</label>
                            <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                        v-model="item.revacunacion"/>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" :class="saldo < 0 ? 'has-danger' : ''">
                            <label class="form-label">Valor</label>
                            <div class="input-group">
                                <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                </div>
                                <input type="number" v-model.number="item.total" class="form-control"
                                       :class="saldo < 0 ? 'is-invalid' : ''"
                                       @focusout="item.total == '' ? item.total = 0 : item.total "
                                       placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" :class="saldo < 0 ? 'has-danger' : ''">
                            <label class="form-label">Abono</label>
                            <div class="input-group">
                                <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                </div>
                                <input type="number" v-model.number="item.abono" class="form-control"
                                       :class="saldo < 0 ? 'is-invalid' : ''"
                                       @focusout="item.abono == '' ? item.abono = 0 : item.abono "
                                       placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Saldo</label>
                            <div class="input-group">
                                <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                </div>
                                <input type="number" v-model.number="saldo" readonly="readonly"
                                       :class="saldo < 0 ? 'text-danger' : '' "
                                       class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="card mb-3" style="border: 0">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <h4 class="text-primary">Servicio de vacunación</h4>
                    </div>
                </div>
                <div class="row border-success history-row-border">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Categoría de vacuna</label>
                            <select v-model.number="item.grupo_vacuna_id" class="form-control"
                                    @change="limpiarVacuna()">
                                <option v-for="row in grupoVacunas" v-show="row.especie == especie" :value="row.ID">
                                    {{ row.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label class="form-label">Vacuna a aplicar</label>
                            <select v-model.number="item.vacuna_id" class="form-control">
                                <option v-for="row in vacunasDelGrupo"
                                        v-show="row.grupo_vacuna === item.grupo_vacuna_id" :value="row.ID">
                                    {{ row.nombre }} {{ row["composicion"] !== '' ? `(${row["composicion"]})` : '' }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Revacunación</label>
                            <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                        v-model="item.revacunacion"/>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" :class="saldo < 0 ? 'has-danger' : ''">
                            <label class="form-label">Valor</label>
                            <div class="input-group">
                                <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                </div>
                                <input type="number" v-model.number="item.total" class="form-control"
                                       :class="saldo < 0 ? 'is-invalid' : ''"
                                       @focusout="item.total == '' ? item.total = 0 : item.total "
                                       placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" :class="saldo < 0 ? 'has-danger' : ''">
                            <label class="form-label">Abono</label>
                            <div class="input-group">
                                <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                </div>
                                <input type="number" v-model.number="item.abono" class="form-control"
                                       :class="saldo < 0 ? 'is-invalid' : ''"
                                       @focusout="item.abono == '' ? item.abono = 0 : item.abono "
                                       placeholder="">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Saldo</label>
                            <div class="input-group">
                                <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                </div>
                                <input type="number" v-model.number="saldo" readonly="readonly"
                                       :class="saldo < 0 ? 'text-danger' : '' "
                                       class="form-control">
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
import Datepicker from 'vuejs-datepicker';

const models = require('../../utils/models')
export default {
    name: "Vacunacion",
    components: {Datepicker},
    props: {
        model: Object,
        especie: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            old: false,
            init: false,
            documentoPrevio: false,
            es: es,
            item: models.VacunacionModel(),
            grupoVacunas: [],
            grupoSeleccionado: null
        }
    },
    watch: {
        especie: {
            handler(New, Old) {
                this.item.grupo_vacuna_id = '';
                this.item.vacuna_id = '';
            }, immediate: true, deep: true
        },
        item: {
            handler(New, Old) {
                if (New === undefined || Old === undefined) {
                    // none
                } else if (New.grupo_vacuna_id !== Old.grupo_vacuna_id) {
                    if (!this.documentoPrevio) {
                        New.vacuna_id = '';
                    }
                }
                this.$emit("value", this.item)
            }, immediate: true, deep: true
        }
    },
    computed: {
        vacunasDelGrupo() {

            let temp = []
            this.grupoVacunas.forEach(g => {
                g.vacunas.forEach(v => {
                    v.grupo_vacuna = g.ID
                    temp.push(v)
                })
            })
            console.log(temp)
            return temp
        },
        saldo() {
            return this.item.total - this.item.abono
        }
    },
    methods: {
        limpiarVacuna() {
            console.log(this.init)
            if (!this.documentoPrevio || !this.init) {
                this.item.vacuna_id = ''
            }
        },
        async setValue(item) {
            this.init = true
            this.documentoPrevio = true;
            await this.getVacunas()
            console.log("defini el item")
            this.item = item
            this.item.vacuna_id = item.vacuna_id
            console.log(this.item)
            this.init = false
        },
        async getVacunas() {
            await this.$http.get("/v1/vacunas/grupos")
                .then(res => {
                    console.log("consulte vacunas")
                    this.grupoVacunas = res.data.grupos;
                })
                .catch(err => {
                    this.$httpErrors.axiosErrorHandler(err)
                })
        }
    },
    async created() {
        await this.getVacunas()
    }
}
</script>

<style scoped>

</style>
