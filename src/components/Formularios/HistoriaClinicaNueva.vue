<template>
    <div>
        <div class="card mb-3" style="border: 0">
            <div class="card-body">
                <div class="col-md-12">
                    <div>
                        <div class="col-md-12">
                            <h4 class="text-primary">Consulta medica</h4>
                        </div>
                        <div class="row border-success history-row-border" style="">
                            <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                                <div class="font-weight-bold" style="font-size: 1em;margin-left: 20px">Anamnesis</div>
                                <hr/>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Dieta</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.anamnesis.dieta !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{ item.contenido.anamnesis.dieta }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.anamnesis.dieta !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.anamnesis.dieta
                                                    }}</span>
                                            </p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.anamnesis.dieta">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Enfermedades previas</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.anamnesis.enfermedad_previa !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.anamnesis.enfermedad_previa
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.anamnesis.enfermedad_previa !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.anamnesis.enfermedad_previa
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.anamnesis.enfermedad_previa">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label">Esterilizado</label>
                                    <select v-model="item.contenido.anamnesis.esterilizado" class="form-control"
                                            placeholder="Escriba si desea agregar información a la historia">
                                        <option :value="'si'">Si</option>
                                        <option :value="'no'">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="form-label material-label">Número partos:</label>
                                    <input v-model="item.contenido.anamnesis.num_partos"
                                           style="text-transform:capitalize"
                                           type="number"
                                           class="form-control"
                                           placeholder="Escriba si desea agregar información a la historia"/>
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
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Cirugias previas</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.anamnesis.cirugias_previas !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.anamnesis.cirugias_previas
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.anamnesis.cirugias_previas !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.anamnesis.cirugias_previas
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.anamnesis.cirugias_previas">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Esquema vacunal</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.anamnesis.esquema_vacunal !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.anamnesis.esquema_vacunal
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.anamnesis.esquema_vacunal !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.anamnesis.esquema_vacunal
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.anamnesis.esquema_vacunal">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Tratamientos recientes</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.anamnesis.tratamientos_recientes !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.anamnesis.tratamientos_recientes
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.anamnesis.tratamientos_recientes !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.anamnesis.tratamientos_recientes
                                                    }}</span>
                                            </p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.anamnesis.tratamientos_recientes">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Motivo consulta</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.anamnesis.motivo_consulta !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.anamnesis.motivo_consulta
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.anamnesis.motivo_consulta !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.anamnesis.motivo_consulta
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.anamnesis.motivo_consulta">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                        </div>
                        <!--
                        ################ new section ##################
                        -->
                        <div class="row border-info history-row-border" style="">
                            <div class="col-md-12 font-weight-bold mt-3" style="font-size: 1.2em">
                                <div class="font-weight-bold" style="font-size: 1em;margin-left: 20px">Exámenes
                                    complementarios
                                    y resultados
                                </div>
                                <hr/>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Condición corporal</label>
                                            <select v-model="item.contenido.complementarios.condicion_corporal"
                                                    class="form-control"
                                                    placeholder="Escriba si desea agregar información a la historia">
                                                <option :value="'1'">1</option>
                                                <option :value="'2'">2</option>
                                                <option :value="'3'">3</option>
                                                <option :value="'4'">4</option>
                                                <option :value="'5'">5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label material-label">Temperatura (°C)</label>
                                            <input v-model="item.contenido.complementarios.temperatura"
                                                   style="text-transform:capitalize"
                                                   type="text"
                                                   class="form-control"
                                                   placeholder="Escriba si desea agregar información a la historia"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label material-label">TLLC (seg)</label>
                                            <input v-model="item.contenido.complementarios.tllc"
                                                   style="text-transform:capitalize"
                                                   type="text"
                                                   class="form-control"
                                                   placeholder="Escriba si desea agregar información a la historia"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label material-label">FC (L/min)</label>
                                            <input v-model="item.contenido.complementarios.fc"
                                                   style="text-transform:capitalize"
                                                   type="text"
                                                   class="form-control"
                                                   placeholder="Escriba si desea agregar información a la historia"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label material-label">FR (R/min)</label>
                                            <input v-model="item.contenido.complementarios.fr"
                                                   style="text-transform:capitalize"
                                                   type="text"
                                                   class="form-control"
                                                   placeholder="Escriba si desea agregar información a la historia"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label material-label">Pulso</label>
                                            <input v-model="item.contenido.complementarios.pulso"
                                                   style="text-transform:capitalize"
                                                   type="text"
                                                   class="form-control"
                                                   placeholder="Escriba si desea agregar información a la historia"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label material-label">% Deshidratación</label>
                                            <input v-model="item.contenido.complementarios.porc_deshidratacion"
                                                   style="text-transform:capitalize"
                                                   type="text"
                                                   class="form-control"
                                                   placeholder="Escriba si desea agregar información a la historia"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label material-label">Mucosas</label>
                                            <input v-model="item.contenido.complementarios.mucosas"
                                                   style="text-transform:capitalize"
                                                   type="text"
                                                   class="form-control"
                                                   placeholder="Escriba si desea agregar información a la historia"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Órganos de los sentidos</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.organos_sentidos !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.organos_sentidos
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.organos_sentidos !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.organos_sentidos
                                                    }}</span>
                                            </p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.organos_sentidos">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Piel y pelaje</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.piel_pelaje !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.piel_pelaje
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.piel_pelaje !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.piel_pelaje
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.piel_pelaje">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Ganglios linfáticos</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.ganglios_linfaticos !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.ganglios_linfaticos
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.ganglios_linfaticos !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.ganglios_linfaticos
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.ganglios_linfaticos">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Sistema digestivo</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.sistema_digestivo !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.sistema_digestivo
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.sistema_digestivo !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.sistema_digestivo
                                                    }}</span>
                                            </p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.sistema_digestivo">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Sistema respiratorio</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.sistema_respiratorio !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.sistema_respiratorio
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.sistema_respiratorio !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.sistema_respiratorio
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.sistema_respiratorio">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Sistema urinario</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.sistema_urinario !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.sistema_urinario
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.sistema_urinario !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.sistema_urinario
                                                    }}</span>
                                            </p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.sistema_urinario">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Sistema endocrino</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.sistema_endocrino !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.sistema_endocrino
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.sistema_endocrino !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.sistema_endocrino
                                                    }}</span>
                                            </p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.sistema_endocrino">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Sistema nervioso</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.sistema_nervioso !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.sistema_nervioso
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.sistema_nervioso !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.sistema_nervioso
                                                    }}</span>
                                            </p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.sistema_nervioso">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Sistema músculo esquelético</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.sistema_musculo_esqueletico !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.sistema_musculo_esqueletico
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.sistema_musculo_esqueletico !== ''">
                                                <code
                                                    class="font-weight-bold">{{
                                                        $calendar.getDateOnly(row.created_at)
                                                    }}</code>
                                                >&emsp;<span
                                                class="font-family-showcase">{{
                                                    row.contenido.complementarios.sistema_musculo_esqueletico
                                                }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.sistema_musculo_esqueletico">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                            <div class="col-md-6 mb-3">
                                <span class="history-card-title">Sistema reproductivo</span>
                                <b-card no-body>
                                    <b-card-text class="history-card">
                                        <p v-if="item.contenido.complementarios.sistema_reproductivo !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.complementarios.sistema_reproductivo
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.complementarios.sistema_reproductivo !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.complementarios.sistema_reproductivo
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.complementarios.sistema_reproductivo">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                        </div>
                        <!--
                        ################ new section ##################
                        -->
                        <div class="row border-warning history-row-border" style="">
                            <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                                <div class="font-weight-bold" style="font-size: 1em;margin-left: 20px">Diagnóstico</div>
                                <hr/>
                            </div>
                            <div class="col-md-12 mb-3">
                                <b-card no-body>
                                    <b-card-text class="history-card" style="height: 90px">
                                        <p v-if="item.contenido.diagnostico.descripcion !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.diagnostico.descripcion
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.diagnostico.descripcion !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.diagnostico.descripcion
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.diagnostico.descripcion">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                        </div>
                        <!--
                        ################ new section ##################
                        -->
                        <div class="row history-row-border" style="border-color: purple">
                            <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                                <div class="font-weight-bold" style="font-size: 1em;margin-left: 20px">Plan terapéutico
                                </div>
                                <hr/>
                            </div>
                            <div class="col-md-12 mb-3">
                                <b-card no-body>
                                    <b-card-text class="history-card" style="height: 90px">
                                        <p v-if="item.contenido.plan_terapeutico.descripcion !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.plan_terapeutico.descripcion
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.plan_terapeutico.descripcion !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{
                                                        row.contenido.plan_terapeutico.descripcion
                                                    }}</span></p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.plan_terapeutico.descripcion">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                        </div>
                        <!--
                        ################ new section ##################
                        -->
                        <div class="row history-row-border border-primary">
                            <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                                <div class="font-weight-bold" style="font-size: 1em;margin-left: 20px">Pronostico</div>
                                <hr/>
                            </div>
                            <div class="col-md-12 mb-3">
                                <b-card no-body>
                                    <b-card-text class="history-card" style="height: 90px">
                                        <p v-if="item.contenido.pronostico.descripcion !== ''">
                                            <code class="font-weight-bold">{{
                                                    $calendar.getDateOnly(item.created_at)
                                                }}</code> >&emsp;<span
                                            class="font-family-showcase">{{
                                                item.contenido.pronostico.descripcion
                                            }}</span>
                                        </p>
                                        <template v-for="row in historial" :v-key="row.created_at">
                                            <p v-if="row.contenido.pronostico.descripcion !== ''"><code
                                                class="font-weight-bold">{{
                                                    $calendar.getDateOnly(row.created_at)
                                                }}</code>
                                                >&emsp;<span
                                                    class="font-family-showcase">{{ row.pronostico.descripcion }}</span>
                                            </p>
                                        </template>
                                    </b-card-text>
                                    <b-card-footer>
                                        <div class="form-group-sm">
                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                                </div>
                                                <input type="text" class="form-control"
                                                       placeholder="Escriba si desea agregar información a la historia"
                                                       v-model="item.contenido.pronostico.descripcion">
                                            </div>
                                        </div>
                                    </b-card-footer>
                                </b-card>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 font-weight-bold" style="font-size: 1.2em">
                        <br>
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
                                       @focusout="item.total === '' ? item.total = 0 : item.total ">
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
                                       @focusout="item.abono === '' ? item.abono = 0 : item.abono "
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
import Datepicker from 'vuejs-datepicker'
import {es} from 'vuejs-datepicker/dist/locale'
import * as models from "@/utils/models";
import {mapState} from "vuex";

const {BrowserWindow}  = require("@electron/remote")
//const PDFWindow = require('electron-pdf-window')
const calendar = require('../../utils/calendar')
export default {
    components: {Datepicker},
    name: "HistoriaClinicaNueva",
    props: ["model", "historial"],
    computed: {
        ...mapState(["user"]),
        saldo() {
            return this.item.total - this.item.abono
        },
        listaArchivos() {
            return this.item.adjuntos == null ? [] : this.item.adjuntos
        }
    },
    data() {
        return {
            es: es,
            documentoPrevio: false,
            cargando: false,
            progreso_carga: 0,
            ruta_archivo: '',
            examenes_medicos: [],
            historias: [],
            item: {
                "documento_id" : "00000000-0000-0000-0000-000000000000",
                "created_at": new Date(),
                "timeline":[],
                "total": 0,
                "abono": 0,
                "terminado": false,
                "mascota_id" : '',
                "cliente_id" : '',
                "usuario_id": '',
                "contenido":{
                    "anamnesis": {
                        "dieta": "",
                        "enfermedad_previa": "",
                        "esterilizado": "si",
                        "num_partos": 0,
                        "cirugias_previas": "",
                        "esquema_vacunal": "",
                        "ultima_desparacitacion": "",
                        "tratamientos_recientes": "",
                        "motivo_consulta": "",
                    },
                    "complementarios": {
                        "condicion_corporal": "1",
                        "temperatura": 0,
                        "tllc": "",
                        "fc": "",
                        "fr": "",
                        "pulso": "",
                        "porc_deshidratacion": "",
                        "mucosas": "",
                        "organos_sentidos": "",
                        "piel_pelaje": "",
                        "ganglios_linfaticos": "",
                        "sistema_digestivo": "",
                        "sistema_respiratorio": "",
                        "sistema_urinario": "",
                        "sistema_endocrino": "",
                        "sistema_nervioso": "",
                        "sistema_musculo_esqueletico": "",
                        "sistema_reproductivo": ""
                    },
                    "diagnostico": {
                        "descripcion": ""
                    },
                    "plan_terapeutico": {
                        "descripcion": ""
                    },
                    "pronostico": {
                        "descripcion": ""
                    },
                },
                "evolucion": {
                    "items": [{
                        "fecha": "",
                        "hora": "",
                        "observaciones": ""
                    }]
                },
                "observaciones": "",
                "anexos": [],
            },
        }
    },
    watch: {
        item: {
            handler(New, Old) {
                this.$emit("value", this.item)

            },
            immediate: true,
            deep: true
        },
        historias:{
            handler(New, Old){
                this.setValoresUnicos()
            }
        }
    },
    methods: {
        fecha(date) {
            return calendar.cambiarFormatoFecha(date)
        },
        setValue(item) {
            console.log("entre a setValue de historiaClinicaNueva", item)
            this.$data.item = item
            this.id = "hollllaaa"
            console.log("new item", this.item)
            this.setValoresUnicos()
        },
        setValoresUnicos() {
            console.log("llame a setValoresUnicos")
            if (this.historias.length > 0) {
                console.log("entre al if de setValoresUnicos")
                const ultimo = this.historias[0]
                console.log("ultimo",ultimo)
                this.item.contenido.anamnesis.num_partos = ultimo.contenido.anamnesis.num_partos
                this.item.contenido.complementarios.condicion_corporal = ultimo.contenido.complementarios.condicion_corporal
                this.item.contenido.complementarios.temperatura = ultimo.contenido.complementarios.temperatura
                this.item.contenido.complementarios.tllc = ultimo.contenido.complementarios.tllc
                this.item.contenido.complementarios.fc = ultimo.contenido.complementarios.fc
                this.item.contenido.complementarios.fr = ultimo.contenido.complementarios.fr
                this.item.contenido.complementarios.pulso = ultimo.contenido.complementarios.pulso
                this.item.contenido.complementarios.porc_deshidratacion = ultimo.contenido.complementarios.porc_deshidratacion
                this.item.contenido.complementarios.mucosas = ultimo.contenido.complementarios.mucosas
            }
        }

    },
    created() {

    }
}
</script>

<style scoped>

</style>
