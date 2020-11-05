<template>
    <div>
        <div id="content" class="app-content">
            <h1 class="page-header mb-3">
                Gestionar vacunas
            </h1>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-group" role="group" aria-label="opciones">
                            <button type="button" class="btn btn-primary" @click="$modal.show('agregar_vacuna')">
                                <i class="fa fa-1x fa-plus-circle"></i> Agregar
                            </button>
                        </div>
                        <br>
                        <br>
                    </div>
                    <div class="col-md-12">
                        <div class="card ">
                            <div class="card-body">
                                <table class="table table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Especie</th>
                                        <th scope="col">Grupo</th>
                                        <th scope="col">Vacuna</th>
                                        <th scope="col" style="width: 100px">Opciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <template v-for="g in grupos">
                                        <tr v-for="row in g['vacunas']">
                                            <td>{{g['especie']}}</td>
                                            <td>{{g['nombre']}}</td>
                                            <td>{{row['nombre']}}</td>
                                            <td>
                                                <div class="btn-group" role="group" aria-label="opciones">
                                                    <button type="button" class="btn btn-secondary" @click="eliminar(row)">
                                                        <i class="fa fa-1x fa-trash"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-secondary"
                                                            @click="editar(row,g['ID'])">
                                                        <i class="fa fa-1x fa-pencil-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <modal name="eliminar_vacuna"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               width="400px"
               height="auto">
            <div class="card ">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 text-center" style="padding: 10px">
                            ¿Esta seguro de eliminar la vacuna <b
                            v-if="seleccionado!=null">{{seleccionado['nombre']}}</b>?
                        </div>
                    </div>
                    <div class="row" style="margin-top: 10px">
                        <div class="col-md-12">
                            <center>
                                <button @click="$modal.hide('eliminar_vacuna')" class="btn btn-primary">
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


        <modal name="agregar_vacuna"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               height="auto">
            <div class="row">
                <div class="col-md-12">
                    <div class="card ">
                        <div class="card-header">Agregar nueva vacuna</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Grupo vacuna</label>
                                        <select v-model="formulario.grupo" class="form-control">
                                            <option v-for="m in grupos" :value="m.ID">{{m.especie}} : {{m.nombre}}
                                            </option>
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
                                        <button @click="$modal.hide('agregar_vacuna')" class="btn btn-primary">
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


        <modal name="editar_vacuna"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               height="auto">
            <div class="row">
                <div class="col-md-12">
                    <div class="card bg-secondary">
                        <div class="card-header">Editar vacuna</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Grupo vacuna</label>
                                        <select v-model="formulario.grupo" class="form-control">
                                            <option v-for="m in grupos" :value="m.ID">{{m.especie}} : {{m.nombre}}
                                            </option>
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
                                        <button @click="$modal.hide('editar_vacuna')" class="btn btn-primary">
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
    name: "Vacunas",
    components: {},
    data() {
        return {

            grupos: [],
            seleccionado: null,
            formulario: {
                "nombre": "",
                "descripcion": "",
                "composicion": "",
                "para_adultos": true,
                "para_cachorro": true,
                "grupo": 0
            }
        }
    },
    methods: {
        search() {
            this.$http.get('/v1/vacunas/grupos')
                .then(res => {
                    this.grupos = res.data.grupos
                });
        },
        eliminar(row) {
            this.seleccionado = row
            this.$modal.show('eliminar_vacuna')
        },
        onEliminar() {
            this.$http.delete(`/v1/vacunas/${this.seleccionado['ID']}`).then(res => {
                    this.$alerts.notification(`vacuna ${this.seleccionado['nombre']} ha sido eliminada`)
                    this.search()
                    this.$modal.hide('eliminar_vacuna')
                })
                .catch(err => {
                    this.$httpErrors.axiosErrorHandler(err)
                })
        },
        onAgregar() {
            let vacuna = {...this.formulario}
            vacuna["grupo_vacuna"] = [{"ID": this.formulario.grupo}]
            this.formulario.grupo = 0
            this.formulario.nombre = ''
            this.$http.post('/v1/vacunas', vacuna).then(
                res => {
                    this.$alerts.notification(`vacuna ${vacuna.nombre} agregada`)
                    this.search()
                    this.$modal.hide('agregar_vacuna')
                }
            ).catch(err => {
                this.$httpErrors.axiosErrorHandler(err)
            })
        },
        editar(row, grupo_id) {
            console.log(row)
            this.seleccionado = row
            this.formulario.grupo = grupo_id
            this.formulario.nombre = row.nombre
            this.$modal.show('editar_vacuna')
        },
        onEditar() {
            let vacuna = {...this.formulario}
            vacuna["grupo_vacuna"] = [{"ID": this.formulario.grupo}]
            vacuna['ID'] = this.seleccionado['ID']
            this.formulario.grupo = 0
            this.formulario.nombre = ''
            this.$http.put('/v1/vacunas', vacuna).then(
                res => {
                    this.$alerts.notification(`vacuna ${vacuna.nombre} editada`)
                    this.search()
                    this.$modal.hide('editar_vacuna')
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
