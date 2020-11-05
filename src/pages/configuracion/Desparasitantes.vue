<template>
    <div>
        <div id="content" class="app-content">
            <h1 class="page-header mb-3">
                Gestionar desparasitantes
            </h1>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-group" role="group" aria-label="opciones">
                            <button type="button" class="btn btn-primary"
                                    @click="$modal.show('agregar_desparasitante')">
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
                                        <th style="width: 25%" scope="col">Grupo</th>
                                        <th style="width: 20%" scope="col">Tipo</th>
                                        <th style="width: 35%" scope="col">Desparasitante</th>
                                        <th class="text-right" scope="col" style="width: 20%">Opciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <template v-for="g in grupos">
                                        <tr v-for="row in g['desparasitantes']">
                                            <td>{{ g['nombre'] }}</td>
                                            <td>{{ row['tipo'] }}</td>
                                            <td>{{ row['nombre'] }}</td>
                                            <td class="text-right" >
                                                <div class="btn-group" role="group" aria-label="opciones">
                                                    <button type="button" class="btn btn-secondary"
                                                            @click="eliminar(row)">
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

        <modal name="eliminar_desparasitante"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               width="400px"
               height="auto">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 text-center" style="padding: 10px">
                            ¿Esta seguro de eliminar el desparasitante <b
                            v-if="seleccionado!=null">{{ seleccionado['nombre'] }}</b>?
                        </div>
                    </div>
                    <div class="row" style="margin-top: 10px">
                        <div class="col-md-12">
                            <center>
                                <button @click="$modal.hide('eliminar_desparasitante')" class="btn btn-primary">
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


        <modal name="agregar_desparasitante"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               height="auto">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Agregar nuevo desparasistante</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Grupo</label>
                                        <select v-model="formulario.grupo" class="form-control">
                                            <option v-for="m in grupos" :value="m.ID">{{ m.nombre }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Tipo</label>
                                        <select v-model="formulario.tipo" class="form-control">
                                            <option v-for="m in ['Liquido', 'Tableta']" :value="m">{{ m }}
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
                                        <button @click="$modal.hide('agregar_desparasitante')" class="btn btn-primary">
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


        <modal name="editar_desparasitante"
               :adaptive="true"
               :scrollable="true"
               :reset="true"
               height="auto">
            <div class="row">
                <div class="col-md-12">
                    <div class="card ">
                        <div class="card-header">Editar desparasitante</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Grupo</label>
                                        <select v-model="formulario.grupo" class="form-control">
                                            <option v-for="m in grupos" :value="m.ID">{{ m.nombre }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Tipo</label>
                                        <select v-model="formulario.tipo" class="form-control">
                                            <option v-for="m in ['Liquido', 'Tableta']" :value="m">{{ m }}
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
                                        <button @click="$modal.hide('editar_desparasitante')" class="btn btn-primary">
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
    name: "Desparasitantes",
    components: {},
    data() {
        return {

            grupos: [],
            seleccionado: null,
            formulario: {
                "nombre": "",
                "tipo": "",
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
            this.$http.get('/v1/desparasitantes/grupos')
                .then(res => {
                    this.grupos = res.data.grupos
                });
        },
        eliminar(row) {
            this.seleccionado = row
            this.$modal.show('eliminar_desparasitante')
        },
        onEliminar() {
            this.$http.delete(`/v1/desparasitantes/${this.seleccionado['ID']}`).then(res => {
                    this.$alerts.notification(`desparasitante ${this.seleccionado['nombre']} ha sido eliminado`)
                    this.search()
                    this.$modal.hide('eliminar_desparasitante')
                })
                .catch(err => {
                    this.$httpErrors.axiosErrorHandler(err)
                })
        },
        onAgregar() {
            let desparasitante = {...this.formulario}
            desparasitante["grupos_desparasitante"] = [{"ID": this.formulario.grupo}]
            this.formulario.grupo = 0
            this.formulario.nombre = ''
            this.$http.post('/v1/desparasitantes', desparasitante).then(
                res => {
                    this.$alerts.notification(`desparasitante ${desparasitante.nombre} agregado`)
                    this.search()
                    this.$modal.hide('agregar_desparasitante')
                }
            ).catch(err => {
                this.$httpErrors.axiosErrorHandler(err)
            })
        },
        editar(row, grupo_id) {
            console.log(row)
            this.seleccionado = row
            this.formulario.grupo = grupo_id
            this.formulario.tipo = row['tipo']
            this.formulario.nombre = row.nombre
            this.$modal.show('editar_desparasitante')
        },
        onEditar() {
            let desparasitante = {...this.formulario}
            desparasitante["grupos_desparasitante"] = [{"ID": this.formulario.grupo}]
            desparasitante['ID'] = this.seleccionado['ID']
            this.formulario.grupo = 0
            this.formulario.nombre = ''
            this.$http.put('/v1/desparasitantes', desparasitante).then(
                res => {
                    this.$alerts.notification(`desparasitante ${desparasitante.nombre} editado`)
                    this.search()
                    this.$modal.hide('editar_desparasitante')
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
