<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Base de conhecimento" />
        <b-table stacked="sm" hover striped :items="reports" :fields="fields">
        </b-table>
        <b-button class="new-report" variant="primary" >
            Novo reporte
        </b-button>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import moment from 'moment'

import PageTitle from '../template/PageTitle.vue'

export default {
    name: 'Home',
    components: { PageTitle },
    data: function() {
        return {
            mode: 'save',
            report: {},
            reports: [],
            page: 1,
            count: 0,
            limit: 0,
            fields: [
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'name', label: 'Transporte', sortable: true },
                { key: 'transport_line', label: 'Linha', sortable: true },
                { key: 'reported_date', label: 'Data do reporte', sortable: true,
                    formatter: value => moment(String(value)).format('MM/DD/YYYY hh:mm') },
                { key: 'logradouro', label: 'Logradouro', sortable: true },
                { key: 'numero', label: 'Numero', sortable: true },
                { key: 'bairro', label: 'Bairro', sortable: true },
                { key: 'bairro', label: 'Cidade', sortable: true },
                { key: 'uf', label: 'UF', sortable: true },
            ]
        }
    },
    methods: {
        loadReports() {
            const url = `${baseApiUrl}/last_reports?page=${this.page}`
            axios.get(url).then(res => {
                //this.reports = res.data
                this.reports = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
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
    .new-report {
        margin: 15px 0;
    }
</style>