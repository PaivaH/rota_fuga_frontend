<template>
    <div class="transport-category-page">
        <b-form>
            <input id="transport-id" type="hidden" v-model="transport.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="transport-name">
                        <b-form-input id="transport-name" type="text"
                            v-model="transport.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o tipo do transporte..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="transports" :fields="fields">
            <template slot="cell(actions)" slot-scope="data" class="text-left">
                <b-button variant="warning" @click="loadTransport(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadTransport(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'TransportCategory',
    data: function() {
        return {
            mode: 'save',
            transport: {},
            transports: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadTransports() {
            const url = `${baseApiUrl}/transport_type`
            axios.get(url).then(res => {
                this.transports = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.transport = {}
            this.loadTransports()
        },
        save() {
            const method = this.transport.id ? 'patch' : 'post'
            const id = this.transport.id ? `/${this.transport.id}` : ''
            axios[method](`${baseApiUrl}/transport_type${id}`, this.transport)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.transport.id
            axios.delete(`${baseApiUrl}/transport_type/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadTransport(transport, mode = 'save') {
            this.mode = mode
            this.transport = { ...transport }
        }
    },
    mounted() {
        this.loadTransports()
    }
}
</script>

<style>

</style>