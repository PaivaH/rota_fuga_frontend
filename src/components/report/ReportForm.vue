<template>
    <div class="report-form">
        <b-form>
            <input id="report-user_id" type="hidden" v-model="report.user_id" />
            <b-row>
                <b-col sm="10">
                    <b-form-group label="*Descrição:" label-for="report-description">
                        <b-form-input id="report-description" type="text"
                            v-model="report.description" required
                            placeholder="Escreva aqui uma descrição para seu reporte" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="5">
                    <b-form-group label="*Data:" label-for="report-occurrence_date">
                        <b-form-input id="report-occurrence_date" type="date"
                            v-model="report.occurrence_date" required
                        />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b-form-group 
                    label="*Tipo de reporte:" label-for="report-report_type">
                    <b-form-select id="report-report_type"
                    :options="reportTypes" v-model="report.report_type" required/>
                    </b-form-group>
                </b-col>
                <b-col sm="3">
                    <b-form-group 
                    label="*Tipo de transporte:" label-for="report-transport_type">
                    <b-form-select id="report-transport_type"
                        :options="transports" v-model="report.transport_type" required/>
                    </b-form-group>
                </b-col>
                <b-col sm="2">
                    <b-form-group label="Linha:" label-for="report-transport_line">
                        <b-form-input id="report-transport_line" type="text"
                            v-model="report.transport_line"
                            placeholder="Informe uma linha" 
                        />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b-form-group label="*Cidade:" label-for="report-cidade">
                        <b-form-input id="report-cidade" type="text"
                            v-model="report.cidade" required
                        />
                    </b-form-group>
                </b-col>
                <b-col sm="3">
                    <b-form-group label="*Bairro:" label-for="report-bairro">
                        <b-form-input id="report-bairro" type="text"
                            v-model="report.bairro" required
                        />
                    </b-form-group>
                </b-col>
                <b-col sm="1">
                    <b-form-group label="*UF:" label-for="report-uf">
                        <b-form-input id="report-uf" type="text"
                            v-model="report.uf" required
                        />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="3">
                    <b-form-group label="Logradouro:" label-for="report-logradouro">
                        <b-form-input id="report-logradouro" type="text"
                            v-model="report.logradouro"
                            />
                    </b-form-group>
                </b-col>
                <b-col sm="1">
                    <b-form-group label="Numero:" label-for="report-numero">
                        <b-form-input id="report-numero" type="text"
                            v-model="report.numero"
                        />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" @click="save">Salvar</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey, showError  } from '@/global'

export default {
    name: 'ReportForm',
    data: function() {
        return {
            report: {},
            reportTypes: [],
            transports: []
        }
    },
    methods: {
        loadTransports() {
            const url = `${baseApiUrl}/transport_type`
            axios.get(url).then(res => {
                this.transports = res.data.map(transports => {
                    return { value: transports.id, text: transports.name }
                })
            })
        },
        loadReportTypes() {
            const url = `${baseApiUrl}/report_type`
            axios.get(url).then(res => {
                this.reportTypes = res.data.map(reportTypes => {
                    return { value: reportTypes.id, text: reportTypes.name }
                })
            })
        },
        loadUser(){
            const json = localStorage.getItem(userKey)
            const user = JSON.parse(json)
            this.report.user_id = user.id   
        },
        save() {
            axios.post(`${baseApiUrl}/report`, this.report)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
            this.$router.push({ path: '/' })
        }
    },
    mounted() {
        this.loadUser()
        this.loadTransports()
        this.loadReportTypes()
    }
}
</script>

<style>

</style>