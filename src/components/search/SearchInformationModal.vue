<template>
    <div>
        <modal name="detalle-cliente"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               width="60%"
               height="auto">
            <div class="row">
                <div class="col-md-12" v-if="cliente !== undefined && cliente.id !== undefined">
                    <Cliente :cliente="cliente" :editable="editable"/>
                </div>
                <div class="col-md-12">
                    <br/>
                </div>
                <div class="col-md-12" v-if="mascota !== undefined && mascota.id !== undefined">
                    <Mascota :mascota="mascota" :editable="editable"/>
                </div>
                <div class="col-md-12">
                    <br/>
                </div>
                <div class="col-md-3"/>
                <div class="col-md-3 mb-3 center">
                    <center>
                        <button class="btn btn-primary" style="width: 100%" @click="hide()">Cerrar</button>
                    </center>
                </div>
                <div class="col-md-3 mb-3 center" v-if="!editable">
                    <center>
                        <button class="btn btn-info" style="width: 100%" @click="editar()">Editar</button>
                    </center>
                </div>
                <div class="col-md-3 mb-3 center" v-else="">
                    <center>
                        <button class="btn btn-success" style="width: 100%" @click="guardar()">Guardar</button>
                    </center>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import Cliente from "../Formularios/Cliente";
    import Mascota from "../Formularios/Mascota";

    const models = require('../../utils/models');

    export default {
        name: "SearchInformationModal",
        components: {Mascota, Cliente},
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isModalVisible() {
                return this.infoModal;
            }
        },
        data() {
            return {
                editable: false,
                infoModal: false,
                mascota: models.mascotaModel(),
                cliente: models.clienteModel(),
                temp: null
            }
        },
        methods: {
            show(mascota, cliente) {
                this.mascota = mascota;
                this.cliente = cliente;
                this.editable = false
                this.$modal.show('detalle-cliente')
            },
            hide() {
                console.log(this.temp)
                if (this.temp !== null) {
                    for (let key in this.temp.mascota) {
                        this.mascota[key] = this.temp.mascota[key]
                    }
                    for (let key in this.temp.cliente) {
                        this.cliente[key] = this.temp.cliente[key]
                    }
                }
                this.$modal.hide('detalle-cliente')
            },
            editar() {
                this.temp = {
                    cliente: {...this.cliente},
                    mascota: {...this.mascota}
                }
                this.editable = !this.editable
            },
            guardar() {
                this.guardarCliente();
            },
            guardarCliente() {
                if (this.cliente.id === "") {
                    // creo nuevo cliente
                    let cliente = {...this.cliente};
                    delete cliente["id"];
                    this.$http.post("/v1/clientes", this.cliente).then(res => {
                        this.cliente = res.data.cliente;
                        this.$alerts.notification("Nuevo cliente registrado en el sistema.");
                        this.guardarMascota();
                    }).catch(err => {
                        this.$httpErrors.axiosErrorHandler(err)
                    });
                } else {
                    //console.log("cliente ya existe, enviando actualizacion");
                    this.$http.put("/v1/clientes", this.cliente).then(res => {
                        this.$alerts.notification("Cliente actualizado.");
                        this.cliente = res.data.cliente;
                        this.guardarMascota()
                    }).catch(err => {
                        //console.log("entre por el catch");
                        this.$httpErrors.axiosErrorHandler(err);
                    });
                }
            },

            guardarMascota() {
                if (this.mascota !== undefined && this.mascota.id === "") {
                    let mascota = {...this.mascota};
                    delete mascota["id"];
                    mascota["tercero_id"] = this.cliente.id;
                    // creo una nueva mascota
                    this.$http.post("/v1/mascotas", mascota).then(res => {
                        this.mascota.id = res.data.mascota.id;
                        this.$alerts.notification("Nueva mascota registrado en el sistema.");
                    }).catch(err => {
                        this.$httpErrors.axiosErrorHandler(err)
                    })
                } else {
                    let mascota = {...this.mascota};
                    mascota["cliente_id"] = this.cliente.id;
                    this.$http.put("/v1/mascotas", this.mascota).then(res => {
                        this.mascota = res.data.mascota;
                        this.$alerts.notification("Mascota actualizada.");
                    }).catch(err => {
                        this.$httpErrors.axiosErrorHandler(err)
                    })
                }
            },
        },
        beforeCreate() {

        }
    }
</script>

<style scoped>

</style>
