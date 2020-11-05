<template>
    <div v-if="old" class="col-md-12">
        <div class="card border-primary mb-3">
            <div class="card-header bg-primary text-light">Servicio de peluqueria</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Observaciones</label>
                            <textarea rows="2" class="form-control" placeholder="" v-model="item.observaciones"/>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" :class="saldo < 0 ? 'has-danger' : ''">
                            <label class="form-label">Valor</label>
                            <div class="input-group" :class="saldo < 0 ? 'border-danger' : ''">
                                <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                </div>
                                <input type="number" v-model.number="item.total" class="form-control"
                                       :class="saldo < 0 ? 'is-invalid' : ''"
                                       @focusout="item.total == '' ? item.total = 0 : item.total ">
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
                                <input type="number" v-model.number="item.abono" class="form-control" placeholder=""
                                       :class="saldo < 0 ? 'is-invalid' : ''"
                                       @focusout="item.abono == '' ? item.abono = 0 : item.abono "
                                >
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
                                <input type="number" v-model.number="saldo" readonly="readonly" class="form-control"
                                       :class="saldo < 0 ? 'text-danger' : '' ">
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
                        <h4 class="text-primary">Servicio de peluqueria</h4>
                    </div>
                </div>
                <div class="row border-success history-row-border">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Observaciones</label>
                            <textarea rows="2" class="form-control" placeholder="" v-model="item.observaciones"/>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" :class="saldo < 0 ? 'has-danger' : ''">
                            <label class="form-label">Valor</label>
                            <div class="input-group" :class="saldo < 0 ? 'border-danger' : ''">
                                <div class="input-group-append text-center">
                                            <span class="input-group-text text-center" style="width: 100%">
                                                <i class="fa fa-dollar-sign fa-1x"/>
                                            </span>
                                </div>
                                <input type="number" v-model.number="item.total" class="form-control"
                                       :class="saldo < 0 ? 'is-invalid' : ''"
                                       @focusout="item.total == '' ? item.total = 0 : item.total ">
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
                                <input type="number" v-model.number="item.abono" class="form-control" placeholder=""
                                       :class="saldo < 0 ? 'is-invalid' : ''"
                                       @focusout="item.abono == '' ? item.abono = 0 : item.abono "
                                >
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
                                <input type="number" v-model.number="saldo" readonly="readonly" class="form-control"
                                       :class="saldo < 0 ? 'text-danger' : '' ">
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
export default {
    name: "Peluqueria",
    props: ["model"],
    computed: {
        saldo() {
            return this.item.total - this.item.abono
        }
    },
    data() {
        return {
            old: false,
            item: {
                "observaciones": "",
                "total": 0,
                "abono": 0
            }
        }
    },
    watch: {
        item: {
            handler(New, Old) {
                this.$emit("value", this.item)

            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        setValue(item) {
            this.item = item
        }
    },
    created() {
        if (this.model !== undefined) {
            this.item.observaciones = this.model.observaciones
            this.item.total = this.model.total
            this.item.abono = this.model.abono
        }
    }
}
</script>

<style scoped>

</style>
