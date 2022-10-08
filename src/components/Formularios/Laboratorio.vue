<template>
    <div v-if="old" class="col-md-12">
        <div class="card border-primary mb-3">
            <div class="card-header bg-primary text-light">Servicios de Laboratorios</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Observaciones</label>
                            <textarea rows="2" class="form-control" placeholder="" v-model="item.observaciones"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Examen a realizar</label>
                            <select class="form-control" v-model="item.examen">
                                <option v-for="row in examenes_medicos" :key="row['id']">{{ row['nombre'] }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <!-- empty --->
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
                <div class="row" v-show="item.id !== undefined">
                    <div class="col-md-12">
                        <hr/>
                        <center>
                        <span style="font-weight: bolder;font-size: 1.1em;text-decoration: underline">
                            Archivos adjuntos
                        </span>
                        </center>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="file" ref="file" class="form-control" placeholder="Subir archivo adjunto">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <button :disabled="cargando" class="btn btn-primary" style="width: 100%"
                                    @click="uploadFile()">
                                Cargar archivo
                            </button>
                        </div>
                    </div>
                    <div class="col-md-3" v-show="cargando" style="padding: 15px;font-weight: bold">
                        Porcentaje de subida: {{ progreso_carga }} %
                    </div>
                    <div class="col-md-12">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Nombre archivo</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Tamaño</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="row in listaArchivos">
                                <td>{{ row['archivo']['nombre'] }}</td>
                                <td>{{ row['archivo']['content_type'] }}</td>
                                <td>{{ calcularTamaño(row['archivo']['tamaño']) }}</td>
                                <td>{{ fecha(row['archivo']['created_at']) }}</td>
                                <td>
                                    <div class="btn-group">
                                        <button @click="mostrarModal(row)"
                                                class="btn btn-outline-info btn-sm">
                                            <i class="fa fa-1x fa-eye"/>
                                        </button>
                                        <button @click="borrarArchivo(row)"
                                                class="btn btn-outline-danger btn-sm">
                                            <i class="fa fa-1x fa-trash"/>
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
        <ModalVisor ref="modalVisor" :src="external_resource"></ModalVisor>
    </div>
    <div v-else >
        <div class="card mb-3" style="border: 0">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <h4 class="text-primary"> Servicios de Laboratorios</h4>
                    </div>
                </div>
                <div class="row border-success history-row-border">
                    <div class="col-md-12">
                        <div class="font-weight-bold" style="font-size: 1em;margin-left: 20px">Examen de laboratorio</div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Observaciones</label>
                            <textarea rows="2" class="form-control" placeholder="" v-model="item.observaciones"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Examen a realizar</label>
                            <select class="form-control" v-model="item.examen">
                                <option v-for="row in examenes_medicos" :key="row['id']">{{ row['nombre'] }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <!-- empty --->
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
                <div class="row" v-show="item.id !== undefined">
                    <div class="col-md-12">
                        <hr/>
                        <center>
                        <span style="font-weight: bolder;font-size: 1.1em;text-decoration: underline">
                            Archivos adjuntos
                        </span>
                        </center>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="file" ref="file" class="form-control" placeholder="Subir archivo adjunto">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <button :disabled="cargando" class="btn btn-primary" style="width: 100%"
                                    @click="uploadFile()">
                                Cargar archivo
                            </button>
                        </div>
                    </div>
                    <div class="col-md-3" v-show="cargando" style="padding: 15px;font-weight: bold">
                        Porcentaje de subida: {{ progreso_carga }} %
                    </div>
                    <div class="col-md-12">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Nombre archivo</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Tamaño</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="row in listaArchivos">
                                <td>{{ row['archivo']['nombre'] }}</td>
                                <td>{{ row['archivo']['content_type'] }}</td>
                                <td>{{ calcularTamaño(row['archivo']['tamaño']) }}</td>
                                <td>{{ fecha(row['archivo']['created_at']) }}</td>
                                <td>
                                    <div class="btn-group">
                                        <button @click="mostrarModal(row)"
                                                class="btn btn-outline-info btn-sm">
                                            <i class="fa fa-1x fa-eye"/>
                                        </button>
                                        <button @click="borrarArchivo(row)"
                                                class="btn btn-outline-danger btn-sm">
                                            <i class="fa fa-1x fa-trash"/>
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
</template>

<script>
import pdf from 'vue-pdf'
import ModalVisor from "@/components/utils/ModalVisor";

const {BrowserWindow}  = require("@electron/remote")
const calendar = require('../../utils/calendar')
//const PDFWindow = require('electron-pdf-window')

function openModal(url) {
 modal.open(url, {

     // Any BrowserWindow options
     width: 400,
     height: 300

 }, {

     // Any data you want to pass to the modal
     title: 'electron-modal example'

 })
}

export default {
    name: "Laboratorio",
    props: ["model"],
    components: {ModalVisor, pdf},
    computed: {
        saldo() {
            return this.item.total - this.item.abono
        },
        listaArchivos() {
            return this.item.adjuntos == null ? [] : this.item.adjuntos
        }
    },
    data() {
        return {
            old:false,
            external_resource: null,
            cargando: false,
            progreso_carga: 0,
            ruta_archivo: '',
            examenes_medicos: [],

            item: {
                "observaciones": "",
                "examen": "",
                "total": 0,
                "abono": 0,
                "adjuntos": []
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
        fecha(date) {
            return calendar.cambiarFormatoFecha(date)
        },
        calcularTamaño(size) {
            let bytes = size / 1024
            if (bytes < 1024) {
                return bytes.toFixed(2) + " KB"
            } else {
                bytes = bytes / 1024
                if (bytes < 1024) {
                    return bytes.toFixed(2) + " MB"
                } else {
                    bytes = bytes / 1024
                    return bytes.toFixed(2) + " GB"
                }
            }

        },
        setValue(item) {
            this.item = item
        },
        uploadFile() {
            let file = this.$refs.file.files[0];
            console.log(file);
            if (this.cargando) {
                return
            }
            if (file === undefined) {
                this.$alerts.show("Error al adjuntar archivo", "No se ha seleccionado ningún archivo para cargar al servidor.")
                return;
            }
            this.cargando = true
            // Initialize the form data
            let formData = new FormData();
            // Add the form data we need to submit
            formData.append('file', file);
            formData.append("examen_id", this.item['id'])
            this.$http.post('/v1/archivos/laboratorio/cargar',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        console.log(percentCompleted)
                        this.progreso_carga = percentCompleted
                    }
                }
            ).then(res => {
                console.log(res)
                if (this.item.adjuntos === undefined || this.item.adjuntos === null) {
                    this.item.adjuntos = []
                }
                this.item.adjuntos.push(res.data.archivo)
                this.cargando = false
                this.resetFileInput()
                this.progreso_carga = 0

            }).catch(err => {
                this.$httpErrors.axiosErrorHandler(err)
                this.cargando = false
                this.progreso_carga = 0
            })
        },
        resetFileInput() {
            const input = this.$refs.file
            input.type = 'text'
            input.type = 'file'
        },
        borrarArchivo(row) {
            console.log(row)
            this.$alerts.confirm("Remover archivo del servicio", `¿Confirma el remover del archivo ${row.archivo.nombre}?`, () => {
                this.$http.get(`/v1/archivos/laboratorio/borrar/${row.archivo.id}`)
                    .then(res => {
                        console.log(res)
                        this.limpiarListaAdjuntos(row)
                    })
            })

        },
        limpiarListaAdjuntos(row) {
            let tempAjuntos = []
            this.item.adjuntos.forEach((value, index, array) => {
                if (value.archivo.id !== row.archivo.id) {
                    tempAjuntos.push(value)
                }
            })
            this.item.adjuntos = tempAjuntos
        },
        mostrarModal(row) {
            if (row['archivo']['content_type'] === "application/pdf") {
                const win = new BrowserWindow({
                    width: 1000,
                    height: 620,
                    webPreferences: {
                        plugins: true
                    }
                })
                //PDFWindow.addSupport(win)
                //win.hide()
                //win.close()
                this.external_resource = this.$http.defaults.baseURL + "/" + row.archivo.ruta
                win.loadURL(this.external_resource)
                this.$refs.modalVisor.showModal()

            } else {
                window.open(this.$http.defaults.baseURL + "/" + row.archivo.ruta, "_blank")
            }
        }
    },
    created() {
        if (this.model !== undefined) {
            this.item.observaciones = this.model.observaciones
            this.item.total = this.model.total
            this.item.abono = this.model.abono
        }
        this.$http.get("/v1/examenes").then(res => {
            console.log(res)
            this.examenes_medicos = res.data['examenes']
        }).catch(err => {
            this.$httpErrors.axiosErrorHandler(err)
        })
    }
}
</script>

<style scoped>

</style>
