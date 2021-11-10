<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Ultimos reportes" active>
                        <LastReportsAdminView />
                    </b-tab>
                    <b-tab title="Categorias de reporte">
                        <ReportCategory />
                    </b-tab>
                    <b-tab title="Categorias de transporte">
                        <TransportCategory />
                    </b-tab>
                    <b-tab title="Usuarios">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import LastReportsAdminView from './TransportCategory.vue'
import UserAdmin from './UserAdmin.vue'
import TransportCategory from './TransportCategory.vue'
import ReportCategory from './ReportCategory.vue'


export default {
    name: 'AdminPages',
    components: { PageTitle, LastReportsAdminView, TransportCategory, ReportCategory, UserAdmin }
}
</script>

<style>

</style>