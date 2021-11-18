<template>
    <div class="report-category-page">
        <b-form>
            <input id="reportType-id" type="hidden" v-model="reportType.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="reportType-name">
                        <b-form-input id="reportType-name" type="text"
                            v-model="reportType.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe a cetegoria de reporte..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="reportType-sensible" v-show="mode === 'save'"
                v-model="reportType.sensible" class="mt-3 mb-3">
                Reporte pessoal
            </b-form-checkbox>
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
        <b-table stacked="sm" hover striped :items="reportTypes" :fields="fields">
            <template slot="cell(actions)" slot-scope="data" class="text-left">
                <b-button variant="warning" @click="loadReportType(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadReportType(data.item, 'remove')">
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
    name: 'ReportCategory',
    data: function() {
        return {
            mode: 'save',
            reportType: {},
            reportTypes: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'sensible', label: 'Reporte pessoal', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadReportTypes() {
            const url = `${baseApiUrl}/report_type`
            axios.get(url).then(res => {
                this.reportTypes = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.reportType = {}
            this.loadReportTypes()
        },
        save() {
            const method = this.reportType.id ? 'patch' : 'post'
            const id = this.reportType.id ? `/${this.reportType.id}` : ''
            axios[method](`${baseApiUrl}/report_type${id}`, this.reportType)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.reportType.id
            axios.delete(`${baseApiUrl}/report_type/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadReportType(reportType, mode = 'save') {
            this.mode = mode
            this.reportType = { ...reportType }
        }
    },
    mounted() {
        this.loadReportTypes()
    }
}
</script>

<style>

</style>