import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'

import DashboardPage from '../views/dashboard/DashboardPage.vue'

import DataPemohon from '../views/dashboard/DataPemohon/PemohonList.vue'
import DetailPemohon from '../views/dashboard/DataPemohon/DetailDataPemohon.vue'
import FormDataPemohon from '../views/dashboard/DataPemohon/FormDataPemohon.vue'
import SuratMasukList from '../views/dashboard/suratMasuk/SuratMasuk.vue'
import SuratMasukForm from '../views/dashboard/suratMasuk/FormSuratMasuk.vue'

import SuratKeluarList from '../views/dashboard/suratKeluar/SuratKeluar.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children : [
      {
        name : 'dashboard',
        path : '/',
        component : DashboardPage,
      },{
        name : 'permohonan-informasi',
        path : '/permohonan-informasi',
        component : SuratMasukList,
      },{
        name : 'permohonan-informasi-tambah',
        path : '/permohonan-informasi-tambah',
        component : SuratMasukForm
      },{
        name : 'permohonan-informasi-edit',
        path : '/permohonan-informasi-edit/:id',
        component : SuratMasukForm
      },{
        name : 'pengajuan-keberatan',
        path : '/pengajuan-keberatan',
        component : SuratKeluarList
      },{
        name : 'data-pemohon',
        path : '/data-pemohon',
        component : DataPemohon
      },{
        name : 'data-pemohon-detail',
        path : '/data-pemohon/:id',
        component : DetailPemohon
      },{
        name : 'data-pemohon-tambah',
        path : '/data-pemohon-tambah',
        component : FormDataPemohon
      },{
        name : 'data-pemohon-edit',
        path : '/data-pemohon-edit/:id',
        component : FormDataPemohon
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
