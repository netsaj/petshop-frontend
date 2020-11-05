<template>
    <div>
        <div id="content" class="app-content">
            <h1 class="page-header mb-3">
                Gestionar usuarios
            </h1>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-group" role="group" aria-label="opciones">
                            <button type="button" class="btn btn-primary" @click="$modal.show('agregar_usuario')">
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
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Rol</th>
                                        <th scope="col" style="width: 100px">Opciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="row in usuarios">
                                        <td>{{row['nombres']}}</td>
                                        <td>{{row['nombre_usuario']}}</td>
                                        <td>{{row['rol']}}</td>
                                        <td>
                                            <div class="btn-group" role="group" aria-label="opciones">
                                                <button type="button" class="btn btn-secondary" title="Eliminar usuario" @click="eliminar(row)">
                                                    <i class="fa fa-1x fa-trash"></i>
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


        <modal name="eliminar_usuario"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               width="400px"
               height="auto">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 text-center" style="padding: 10px">
                            ¿Esta seguro de eliminar el usuario <b
                            v-if="seleccionado!=null">{{seleccionado['nombre_usuario']}}</b>?
                        </div>
                    </div>
                    <div class="row" style="margin-top: 10px">
                        <div class="col-md-12">
                            <center>
                                <button @click="$modal.hide('eliminar_usuario')" class="btn btn-primary">
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


        <modal name="agregar_usuario"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               height="auto">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Agregar nuevo usuario</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Nombres y apellidos</label>
                                        <input v-model="formulario.nombres" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Username</label>
                                        <input v-model="formulario.nombre_usuario" type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Contraseña</label>
                                        <input v-model="formulario.password" type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Rol del usuario:</label>
                                        <select v-model="formulario.rol" class="form-control">
                                            <option v-for="m in roles" :value="m">{{m}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 10px">
                                <div class="col-md-12">
                                    <center>
                                        <button @click="$modal.hide('agregar_usuario')" class="btn btn-primary">
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
    </div>

</template>

<script>

export default {
    name: "Usuarios",
    components: {},
    data() {
        return {
            usuarios: [],
            seleccionado: null,
            roles: ["Administrador", "Operativo"],
            formulario: {
                rol: 'Operativo',
                nombres: '',
                nombre_usuario: '',
                password: '',
            }
        }
    },
    methods: {
        search() {
            this.$http.get("/v1/usuarios")
                .then(res => {
                    this.usuarios = res.data.usuarios
                });
        },
        eliminar(row) {
            this.seleccionado = row
            this.$modal.show('eliminar_usuario')
        },
        onEliminar() {
            this.$http.delete(`/v1/usuarios/${this.seleccionado['id']}`).then(res => {
                    this.$alerts.notification(`usuario ${this.seleccionado['nombre_usuario']} ha sido eliminado`)
                    this.search()
                    this.$modal.hide('eliminar_usuario')
                })
                .catch(err => {
                    this.$httpErrors.axiosErrorHandler(err)
                })
        },
        onAgregar() {
            let usuario = {...this.formulario}
            this.formulario.municipio = ''
            this.formulario.nombre = ''
            this.$http.post('/v1/usuarios', usuario).then(
                res => {
                    this.$alerts.notification(`usuario ${usuario.nombre_usuario} agregado`)
                    this.search()
                    this.$modal.hide('agregar_usuario')
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
