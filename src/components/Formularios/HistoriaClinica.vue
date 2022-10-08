<template>
    <div>
        <div class="col-md-12">
            <div class="card border-primary mb-3">
                <div class="card-header bg-primary text-light">Historia Clinica</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                            <div class="font-weight-bold" style="font-size: 1.2em">Anamnesis</div>
                            <hr/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Dieta</label>
                                <textarea v-model="item.contenido.anamnesis.dieta" style="text-transform:capitalize"
                                          rows="3"
                                          class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Enfermedades previas</label>
                                <textarea v-model="item.contenido.anamnesis.enfermedad_previa"
                                          style="text-transform:capitalize"
                                          rows="3"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Esterilizado</label>
                                <select v-model="item.contenido.anamnesis.esterilizado" class="form-control">
                                    <option :value="'si'">Si</option>
                                    <option :value="'no'">No</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label material-label">Número partos:</label>
                                <input v-model="item.contenido.anamnesis.num_partos" style="text-transform:capitalize"
                                       type="number"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Última desparasitación</label>
                                <datepicker :language="es" :input-class="'form-control'" :format="'yyyy/MM/dd'"
                                            v-model="item.contenido.anamnesis.ultima_desparacitacion"
                                            style="background-color: white !important;"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Cirugias previas</label>
                                <textarea v-model="item.contenido.anamnesis.cirugias_previas"
                                          style="text-transform:capitalize"
                                          rows="3"
                                          class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Esquema vacunal</label>
                                <textarea v-model="item.contenido.anamnesis.esquema_vacunal"
                                          style="text-transform:capitalize"
                                          rows="2"
                                          class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Tratamientos recientes</label>
                                <textarea v-model="item.contenido.anamnesis.tratamientos_recientes"
                                          style="text-transform:capitalize"
                                          rows="3"
                                          class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Motivo consulta</label>
                                <textarea v-model="item.contenido.anamnesis.motivo_consulta"
                                          style="text-transform:capitalize"
                                          rows="3"
                                          class="form-control" placeholder=""/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                            <br/>
                            <br/>
                            <br/>
                            <h3>Exámenes complementarios y resultados</h3>
                            <hr/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Condición corporal</label>
                                <select v-model="item.contenido.complementarios.condicion_corporal"
                                        class="form-control">
                                    <option :value="'1'">1</option>
                                    <option :value="'2'">2</option>
                                    <option :value="'3'">3</option>
                                    <option :value="'4'">4</option>
                                    <option :value="'5'">5</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label material-label">Temperatura (°C)</label>
                                <input v-model="item.contenido.complementarios.temperatura"
                                       style="text-transform:capitalize"
                                       type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label material-label">TLLC (seg)</label>
                                <input v-model="item.contenido.complementarios.tllc" style="text-transform:capitalize"
                                       type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label material-label">FC (L/min)</label>
                                <input v-model="item.contenido.complementarios.fc" style="text-transform:capitalize"
                                       type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label material-label">FR (R/min)</label>
                                <input v-model="item.contenido.complementarios.fr" style="text-transform:capitalize"
                                       type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label material-label">Pulso</label>
                                <input v-model="item.contenido.complementarios.pulso" style="text-transform:capitalize"
                                       type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label material-label">% Deshidratación</label>
                                <input v-model="item.contenido.complementarios.porc_deshidratacion"
                                       style="text-transform:capitalize"
                                       type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label material-label">Mucosas</label>
                                <input v-model="item.contenido.complementarios.mucosas"
                                       style="text-transform:capitalize" type="text"
                                       class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Órganos de los sentidos</label>
                                <textarea v-model="item.contenido.complementarios.organos_sentidos"
                                          style="text-transform:capitalize" rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Piel y pelaje</label>
                                <textarea v-model="item.contenido.complementarios.piel_pelaje"
                                          style="text-transform:capitalize"
                                          rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Ganglios linfáticos</label>
                                <textarea v-model="item.contenido.complementarios.ganglios_linfaticos"
                                          style="text-transform:capitalize" rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Sistema digestivo</label>
                                <textarea v-model="item.contenido.complementarios.sistema_digestivo"
                                          style="text-transform:capitalize"
                                          rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Sistema respiratorio</label>
                                <textarea v-model="item.contenido.complementarios.sistema_respiratorio"
                                          style="text-transform:capitalize" rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Sistema urinario:</label>
                                <textarea v-model="item.contenido.complementarios.sistema_urinario"
                                          style="text-transform:capitalize"
                                          rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Sistema endocrino</label>
                                <textarea v-model="item.contenido.complementarios.sistema_endocrino"
                                          style="text-transform:capitalize"
                                          rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Sistema nervioso</label>
                                <textarea v-model="item.contenido.complementarios.sistema_nervioso"
                                          style="text-transform:capitalize"
                                          rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Sistema músculo esquelético:</label>
                                <textarea v-model="item.contenido.complementarios.sistema_musculo_esqueletico"
                                          style="text-transform:capitalize"
                                          rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label material-label">Sistema reproductivo</label>
                                <textarea v-model="item.contenido.complementarios.sistema_reproductivo"
                                          style="text-transform:capitalize"
                                          rows="2"
                                          class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                            <br/>
                            <br/>
                            <br/>
                            <h3>Diagnóstico</h3>
                            <hr/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label material-label"></label>
                                <textarea v-model="item.contenido.diagnostico.descripcion"
                                          style="text-transform:capitalize"
                                          rows="3"
                                          class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                            <br/>
                            <br/>
                            <br/>
                            <h3>Plan terapéutico</h3>
                            <hr/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label material-label"></label>
                                <textarea v-model="item.contenido.plan_terapeutico.descripcion"
                                          style="text-transform:capitalize"
                                          rows="3"
                                          class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                            <br/>
                            <br/>
                            <br/>
                            <h3>Pronostico</h3>
                            <hr/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label material-label"></label>
                                <textarea v-model="item.contenido.pronostico.descripcion"
                                          style="text-transform:capitalize"
                                          rows="3"
                                          class="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import {es} from 'vuejs-datepicker/dist/locale'
import * as models from "@/utils/models";
const {BrowserWindow}  = require("@electron/remote")
const calendar = require('../../utils/calendar')
export default {
    components: {Datepicker},
    name: "HistoriaClinica",
    props: ["model"],
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
            documentoPrevio: true,
            es: es,
            cargando: false,
            progreso_carga: 0,
            ruta_archivo: '',
            examenes_medicos: [],
            item: models.HistoriaClinicaModel(),
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
