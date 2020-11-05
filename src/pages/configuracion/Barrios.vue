<template>
    <div>
        <div id="content" class="app-content">
            <h1 class="page-header mb-3">
                Gestionar barrios
            </h1>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="btn-group" role="group" aria-label="opciones">
                                    <button type="button" class="btn btn-primary"
                                            @click="$modal.show('agregar_barrio')">
                                        <i class="fa fa-1x fa-plus-circle"></i> Agregar
                                    </button>
                                </div>
                                <br>
                                <br>
                            </div>
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <table class="table table-hover">
                                            <thead>
                                            <tr>
                                                <th style="width: 40%" scope="col">Municipio</th>
                                                <th style="width: 40%" scope="col">Nombre</th>
                                                <th class="text-right" scope="col" style="width: 20%">Opciones</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="row in barrios">
                                                <td>{{ row['municipio'] }}</td>
                                                <td>{{ row['nombre'] }}</td>
                                                <td class="text-right">
                                                    <div class="btn-group" role="group" aria-label="opciones">
                                                        <button type="button" class="btn btn-secondary"
                                                                @click="eliminar(row)">
                                                            <i class="fa fa-1x fa-trash"></i>
                                                        </button>
                                                        <button type="button" class="btn btn-secondary"
                                                                @click="editar(row)">
                                                            <i class="fa fa-1x fa-pencil-alt"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <modal name="eliminar_barrio"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               width="400px"
               height="auto">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 text-center" style="padding: 10px">
                            ¿Esta seguro de eliminar el barrio <b
                            v-if="seleccionado!=null">{{ seleccionado['nombre'] }}</b>?
                        </div>
                    </div>
                    <div class="row" style="margin-top: 10px">
                        <div class="col-md-12">
                            <center>
                                <button @click="$modal.hide('eliminar_barrio')" class="btn btn-primary">
                                    Cancelar
                                </button>
                                &emsp;
                                <button @click="onEliminar()" class="btn btn-primary">
                                    Confirmar
                                </button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </modal>


        <modal name="agregar_barrio"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               height="auto">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Agregar nuevo barrio</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Municipio</label>
                                        <select v-model="formulario.municipio" class="form-control">
                                            <option v-for="m in municipios" :value="m">{{ m }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Nombre</label>
                                        <input v-model="formulario.nombre" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 10px">
                                <div class="col-md-12">
                                    <center>
                                        <button @click="$modal.hide('agregar_barrio')" class="btn btn-primary">
                                            Cancelar
                                        </button>
                                        &emsp;
                                        <button @click="onAgregar()" class="btn btn-primary">
                                            Confirmar
                                        </button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal>


        <modal name="editar_barrio"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               height="auto">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Agregar nuevo barrio</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Municipio</label>
                                        <select v-model="formulario.municipio" class="form-control">
                                            <option v-for="m in municipios" :value="m">{{ m }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Nombre</label>
                                        <input v-model="formulario.nombre" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 10px">
                                <div class="col-md-12">
                                    <center>
                                        <button @click="$modal.hide('editar_barrio')" class="btn btn-primary">
                                            Cancelar
                                        </button>
                                        &emsp;
                                        <button @click="onEditar()" class="btn btn-primary">
                                            Confirmar
                                        </button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>

</template>

<script>

export default {
    name: "Barrios",
    components: {},
    data() {
        return {
            municipios: [
                "San Antonio del Tachira - Venezuela",
                "Pedro Maria Ureña - Venezuela",
                "Villa del Rosario",
                "Cúcuta",
                "Patios"
            ],
            tempBarrios : [],
            barrios: [],
            seleccionado: null,
            formulario: {
                municipio: '',
                nombre: ''
            },
            contador: 0,
            intervalo : null
        }
    },
    methods: {
        search() {
            if (this.intervalo !== null){
                clearInterval(this.intervalo)
            }
            this.contador = 0;
            this.barrios = []
            this.$http.get("/v1/barrios")
                .then(res => {
                    this.tempBarrios = res.data.barrios
                    this.intervalo = setInterval(()=>{
                        this.barrios.push(this.tempBarrios[this.contador])
                        this.contador++
                        if(this.contador >= this.tempBarrios.length){
                            clearInterval(this.intervalo)
                        }

                    },5)
                })
                .catch(e => console.log(e));
        },
        eliminar(row) {
            this.seleccionado = row
            this.$modal.show('eliminar_barrio')
        },
        onEliminar() {
            this.$http.delete(`/v1/barrios/${this.seleccionado['ID']}`).then(res => {
                    this.$alerts.notification(`barrio ${this.seleccionado['nombre']} ha sido eliminado`)
                    this.search()
                    this.$modal.hide('eliminar_barrio')
                })
                .catch(err => {
                    this.$httpErrors.axiosErrorHandler(err)
                })
        },
        onAgregar() {
            let barrio = {...this.formulario}
            this.formulario.municipio = ''
            this.formulario.nombre = ''
            this.$http.post('/v1/barrios', barrio).then(
                res => {
                    this.$alerts.notification(`barrio ${barrio.nombre} agregado`)
                    this.search()
                    this.$modal.hide('agregar_barrio')
                }
            ).catch(err => {
                this.$httpErrors.axiosErrorHandler(err)
            })
        },
        editar(row) {
            this.seleccionado = row
            this.formulario.municipio = row.municipio
            this.formulario.nombre = row.nombre
            this.$modal.show('editar_barrio')
        },
        onEditar() {
            let barrio = {...this.formulario}
            barrio['ID'] = this.seleccionado['ID']
            this.formulario.municipio = ''
            this.formulario.nombre = ''
            this.$http.put('/v1/barrios', barrio).then(
                res => {
                    this.$alerts.notification(`barrio ${barrio.nombre} editado`)
                    this.search()
                    this.$modal.hide('editar_barrio')
                }
            ).catch(err => {
                this.$httpErrors.axiosErrorHandler(err)
            })
        },
    },
    created() {
        this.search();
    }
}
</script>

<style scoped>

</style>
