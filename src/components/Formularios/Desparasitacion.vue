<template>
    <div>
        <div v-if="old" class="col-md-12">
            <div class="card border-primary mb-3">
                <div class="card-header bg-primary text-light">Servicio de desparasitación</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Tipo de desparasitante</label>
                                <select class="form-control" v-model.number="desparasitacion.grupo_desparasitante_id"
                                        @change="changeGrupo()">
                                    <option v-for="row in grupos" :value="row.ID" :key="row.ID"> {{row["nombre"]}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="form-label">Presentación</label>
                                <select class="form-control" v-model="tipo">
                                    <option>Liquido</option>
                                    <option>Tableta</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Marca</label>
                                <select class="form-control" v-model.number="desparasitacion.desparasitante_id">
                                    <option v-for="row in desparasitantes" v-show="row.tipo === tipo" :value="row.ID">
                                        {{row.nombre}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="form-label">Dosis</label>
                                <input type="text" class="form-control" placeholder="" v-model="desparasitacion.dosis">
                            </div>

                        </div>
                        <div class="col-m-2 text-info text-center" style="padding: 15px;font-size: 0.8em;font-weight: bold">
                            {{tipo!=='Liquido'?'Dosis según empaque':`Recomendado 1 ML/Kg`}}
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Re-desparacitación</label>
                                <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                            v-model="desparasitacion.redesparacitacion"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group"
                                 :class="saldo < 0 ? 'has-danger' : ''">
                                <label class="form-label">Valor</label>
                                <div class="input-group">
                                    <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                    </div>
                                    <input type="number" class="form-control" placeholder=""
                                           :class="saldo < 0 ? 'is-invalid' : ''"
                                           @focusout="desparasitacion.total == '' ? desparasitacion.total = 0 : desparasitacion.total"
                                           v-model.number="desparasitacion.total">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group"
                                 :class="saldo < 0 ? 'has-danger' : ''">
                                <label class="form-label">Abono</label>
                                <div class="input-group">
                                    <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                    </div>
                                    <input type="number" class="form-control" placeholder=""
                                           :class="saldo < 0 ? 'is-invalid' : ''"
                                           @focusout="desparasitacion.abono == '' ? desparasitacion.abono = 0 : desparasitacion.abono"
                                           v-model.number="desparasitacion.abono">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group"
                                 :class="saldo < 0 ? 'has-danger' : ''">
                                <label class="form-label">Saldo</label>
                                <div class="input-group">
                                    <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                    </div>
                                    <input type="number" class="form-control" placeholder="" v-model.number="saldo"
                                           readonly="readonly"
                                           :class="saldo < 0 ? 'is-invalid' : ''">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else >
            <div class="card mb-3" style="border: 0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <h4 class="text-primary">Servicio de desparasitación</h4>
                        </div>
                    </div>
                    <div class="row border-success history-row-border">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Tipo de desparasitante</label>
                                <select class="form-control" v-model.number="desparasitacion.grupo_desparasitante_id"
                                        @change="changeGrupo()">
                                    <option v-for="row in grupos" :value="row.ID" :key="row.ID"> {{row["nombre"]}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="form-label">Presentación</label>
                                <select class="form-control" v-model="tipo">
                                    <option>Liquido</option>
                                    <option>Tableta</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Marca</label>
                                <select class="form-control" v-model.number="desparasitacion.desparasitante_id">
                                    <option v-for="row in desparasitantes" v-show="row.tipo === tipo" :value="row.ID">
                                        {{row.nombre}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="form-label">Dosis</label>
                                <input type="text" class="form-control" placeholder="" v-model="desparasitacion.dosis">
                            </div>

                        </div>
                        <div class="col-m-2 text-info text-center" style="padding: 15px;font-size: 0.8em;font-weight: bold">
                            {{tipo!=='Liquido'?'Dosis según empaque':`Recomendado 1 ML/Kg`}}
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Re-desparacitación</label>
                                <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                            v-model="desparasitacion.redesparacitacion"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group"
                                 :class="saldo < 0 ? 'has-danger' : ''">
                                <label class="form-label">Valor</label>
                                <div class="input-group">
                                    <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                    </div>
                                    <input type="number" class="form-control" placeholder=""
                                           :class="saldo < 0 ? 'is-invalid' : ''"
                                           @focusout="desparasitacion.total == '' ? desparasitacion.total = 0 : desparasitacion.total"
                                           v-model.number="desparasitacion.total">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group"
                                 :class="saldo < 0 ? 'has-danger' : ''">
                                <label class="form-label">Abono</label>
                                <div class="input-group">
                                    <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                    </div>
                                    <input type="number" class="form-control" placeholder=""
                                           :class="saldo < 0 ? 'is-invalid' : ''"
                                           @focusout="desparasitacion.abono == '' ? desparasitacion.abono = 0 : desparasitacion.abono"
                                           v-model.number="desparasitacion.abono">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group"
                                 :class="saldo < 0 ? 'has-danger' : ''">
                                <label class="form-label">Saldo</label>
                                <div class="input-group">
                                    <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                    </div>
                                    <input type="number" class="form-control" placeholder="" v-model.number="saldo"
                                           readonly="readonly"
                                           :class="saldo < 0 ? 'is-invalid' : ''">
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
    const models = require('../../utils/models')
    import {en, es} from 'vuejs-datepicker/dist/locale'
    import Datepicker from 'vuejs-datepicker';

    export default {
        components: {Datepicker},
        name: "Desparasitacion",
        props: {
            peso: {
                type: Number,
                default: 0
            }
        },
        watch: {
            desparasitacion: {
                handler: function (New, Old) {
                    if (New === undefined || Old === undefined) {

                    } else if (New['grupo_desparasitante_id'] !== Old['grupo_desparasitante_id']) {
                        // New.desparasitante_id = 0
                    }
                    this.$emit('value', this.desparasitacion)
                }, immediate: true, deep: true
            },
            tipo: {
                handler: function (New, Old) {
                    if (New !== Old) {
                        this.desparasitacion.desparasitante_id = 0

                    }
                    if (New === 'Liquido' && this.desparasitacion['id'] === undefined) {
                        this.desparasitacion.dosis = `${(New * 1)} ML`
                    } else {
                        this.desparasitacion.dosis = ""
                    }
                }, immediate: true, deep: true

            },
            peso: {
                handler: function (New, Old) {
                    if (this.tipo === 'Liquido' && this.desparasitacion['id'] === undefined) {
                        this.desparasitacion.dosis = `${(New * 1)} ML`
                    } else {
                        this.desparasitacion.dosis = ""
                    }

                }
            }
        },
        data() {
            return {
                old: false,
                isInit: false,
                es: es,
                desparasitacion: models.DesparasitacionModel(),
                grupos: [],
                desparasitantes: [],
                tipo: "Liquido",
            }
        },
        computed: {
            saldo() {
                return this.desparasitacion.total - this.desparasitacion.abono
            }
        },
        methods: {
            changeGrupo() {
                this.grupos.forEach(grupo => {
                    if (grupo.ID === this.desparasitacion.grupo_desparasitante_id) {
                        console.log(grupo.desparasitantes)
                        this.desparasitantes = grupo.desparasitantes;
                        return;
                    }
                })
            },
            async setValue(item) {
                await this.getGrupos();
                this.isInit = true;
                this.desparasitacion = item;
                this.desparasitacion.grupo_desparasitante_id = item.grupo_desparasitante_id
                this.grupos.forEach(grupo => {
                    if (item.grupo_desparasitante_id === grupo.ID) {
                        this.desparasitantes = grupo.desparasitantes
                        grupo.desparasitantes.forEach(i => {
                            if (i.ID === item.desparasitante_id) {
                                this.tipo = i.tipo
                                this.desparasitacion.desparasitante_id = item.desparasitante_id
                                console.log("defini el desparasistante")
                                return;
                            }
                        })
                        return;
                    }
                })

                console.log(item)
                console.log(this.desparasitacion)
                this.isInit = false;
            },
            async getGrupos() {
                await this.$http.get("/v1/desparasitantes/grupos").then(res => {
                    this.grupos = res.data.grupos;
                })
            }

        },
        async created() {
            this.getGrupos();
        }

    }
</script>

<style scoped>

</style>
