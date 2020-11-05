<template>
    <div>
        <modal name="modal-visor"
                style="z-index: 9999999999999999"
               :scrollable="false"
               :reset="true"
               height="600"
               :max-height="600"
               width="70%">
            <div class="row">
                <div class="col-md-12">
                    <button class="btn btn-danger btn-sm" @click="hideModal()">Cerrar</button>
                </div>
            </div>
            <div class="row" style="background: gray; height: 600px; overflow-y: auto">
                <div class="col-md-12">
                    <template v-if="src === null || src === ''">
                        <center>No ha seleccionado ningun recurso para visualizar.</center>
                    </template>
                    <template v-else-if="src.toLowerCase().endsWith('.pdf')">
                        <pdf :src="src" style="padding: 10px;" ></pdf>
                    </template>
                    <template v-else>
                        <img :src="src" style="width: 100%; height: auto" alt="">
                    </template>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import modal from 'vue-js-modal'
import pdf from 'vue-pdf'

export default {
    name: "modalVisor",
    components: {pdf},
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        src: {
            type: String,
            default: ''
        }
    },
    methods: {
        showModal() {
            this.$modal.show('modal-visor')
        },
        hideModal() {
            this.$modal.hide('modal-visor');
        }
    },
    created() {
        //this.$modal.hide('modal-visor')
    }
}
</script>

<style scoped>

</style>
