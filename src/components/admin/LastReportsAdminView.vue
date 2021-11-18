<template>
    <div class="last-reports-admin-view">
        <b-form>
            <input id="report-id" type="hidden" v-model="report.id" />
            <b-row>
                <b-col xs="12">
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table stacked="sm" hover striped :items="reports" :fields="fields">
            <template slot="cell(actions)" slot-scope="data" class="text-left">
                <b-button variant="danger" @click="loadReport(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'LastReportsAdminView',
    data: function() {
        return {
            mode: 'save',
            report: {},
            reports: [],
            page: 1,
            count: 0,
            limit: 0,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'transport_id', label: 'Id do transporte', sortable: true },
                { key: 'transport_line', label: 'Linha do transporte', sortable: true },
                { key: 'occurrence_date', label: 'Data da ocorrencia', sortable: true ,
                    formatter: value => moment(String(value)).format('MM/DD/YYYY hh:mm') },
                { key: 'reported_date', label: 'Data do reporte', sortable: true,
                    formatter: value => moment(String(value)).format('MM/DD/YYYY hh:mm') },
                { key: 'user_id', label: 'user', sortable: true },
                { key: 'logradouro', label: 'Logradouro', sortable: true },
                { key: 'numero', label: 'Numero', sortable: true },
                { key: 'bairro', label: 'Bairro', sortable: true },
                { key: 'bairro', label: 'Cidade', sortable: true },
                { key: 'uf', label: 'UF', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadReports() {
            const url = `${baseApiUrl}/report?page=${this.page}`
            axios.get(url).then(res => {
                //this.reports = res.data
                this.reports = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.report = {}
            this.loadReports()
        },
        save() {
            const method = this.report.id ? 'patch' : 'post'
            const id = this.report.id ? `/${this.report.id}` : ''
            axios[method](`${baseApiUrl}/report${id}`, this.report)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.report.id
            axios.delete(`${baseApiUrl}/report/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadReport(report, mode = 'save') {
            this.mode = mode
            this.report = { ...report }
        }
    },
     watch: {
        page() {
            this.loadReports()
        }
    },
    mounted() {
        this.loadReports()
    }
}
</script>
<style>
</style>