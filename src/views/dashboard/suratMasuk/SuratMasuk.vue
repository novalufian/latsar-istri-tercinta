<template>
    <div class="p-5  shadow-sm shadow-gray-200 rounded-2xl min-h-screen">

        <v-card class="p-10  rounded-2xl shadow-none shadow-gray-300 bg-white bg-opacity-70">
            <v-card-title class="w-full flex justify-between">
                <router-link to="/permohonan-informasi-tambah" class="h-14 btn-blue">Permohonan Baru</router-link>
                <div class="w-5/12 flex flex-row">
                    <v-text-field v-model="search" outlined append-icon="mdi-magnify" label="Pencarian permohonan informasi. . . " single-line hide-details class="bg-white"></v-text-field>
                    <button class="p-5 ouline" @click="filter.openFilter = !filter.openFilter">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                    </button>
                </div>
            </v-card-title>
            <v-card-title v-show="filter.openFilter">

                <div class="flex w-full">

                <div class="w-2/12">
                    <v-menu v-model="filter.openStartDate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto" >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field outlined  v-model="filter.startDateFormated" label="Mulai Tanggal"  v-bind="attrs" v-on="on" hint="YYYY/MM/DD format"></v-text-field>
                        </template>
                        <v-date-picker v-model="filter.startDate" @input="filter.openStartDate = false" ></v-date-picker>
                    </v-menu>
                </div>

                <div class="w-2/12 ml-2">
                    <v-menu v-model="filter.openEndDate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto" >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field outlined  v-model="filter.endDateFormated" label="Sampai Tanggal"  v-bind="attrs" v-on="on"  hint="YYYY/MM/DD format"></v-text-field>
                        </template>
                        <v-date-picker v-model="filter.endDate" @input="filter.openEndDate = false" ></v-date-picker>
                    </v-menu>
                </div>

                <button class="btn-blue h-14 m-0" style="margin : 0px 5px !important" @click="_SURATMASUK_(true)">Filter</button>

                <button class="btn-gray h-14 m-0 self-right" style="margin : 0px 5px !important" @click="_doCetak_">Cetak</button>

                
                </div>

            </v-card-title>

            <v-data-table :headers="headers" :items="desserts" :search="search" :loading="isLoading" :loading-text="'Mohon tunggu sedang memuat data'" class=" ppid-table-data">
                
                <template v-slot:[`item.actions`]="{ item }">
                    <router-link class="inline-flex items-center py-2 px-8 text-sm font-medium text-center text-white bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform " :to="'/permohonan-informasi-edit/'+item.id">edit</router-link>
                    <!-- <v-icon small @click="deleteItem(item)" :class="'bg-red-500 p-2 rounded-2 text-white'">delete</v-icon> -->
                </template>
                <template v-slot:[`item.nama`]="{ item }">
                    <router-link class="link-to-pemohon" :to="'/data-pemohon/'+item.user_id">{{item.nama}}</router-link>
                </template>

                <template v-slot:[`item.type_pemohon`]="{ item }">
                    <span v-if="item.type_pemohon == 'LSM'">AKTA : {{item.akta}}</span>
                    <span v-else>KTP : {{item.ktp}}</span>
                </template>

                <template v-slot:[`item.isiPermohonan`]="{ item }">
                    <p class="elipsis-text m-0 ...">{{item.isiPermohonan}}</p>
                </template>
                
            </v-data-table>
            
        </v-card>


        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="false" :preview-modal="true" :paginate-elements-by-height="1400" filename="hee hee" :pdf-quality="2" :manual-pagination="false" pdf-format="a4" pdf-orientation="landscape" pdf-content-width="1400px"  ref="html2Pdf">
            <section slot="pdf-content">
                <!-- PDF Content Here -->
                <PDFTable :datadesserts="desserts"></PDFTable>
            </section>
        </vue-html2pdf>

        <PDFTable :datadesserts="desserts"></PDFTable>

    
    </div>
    
</template>

<script>
    import axios from 'axios'
    import VueHtml2pdf from 'vue-html2pdf'
    import PDFTable from './PDFTable.vue'

    export default {
        name : "SuratMasuk",
        components : {
            VueHtml2pdf,
            PDFTable
        },
        data () {
            return {
                filter : {
                    openFilter : false,
                    startDate : null,
                    openStartDate : false,
                    startDateFormated : null,
                    endDate : null,
                    openEndDate : false,
                    EndDateFormated : null

                },
                openFilter : false,
                isLoading : true,
                search: '',
                headers: [
                    {text: 'No Registrasi',value: 'noReg', align :'center'},
                    { text: 'Tanggal Permohonan', value: 'tglPermohonan' , align :'center'},
                    { text: 'Nama', value: 'nama', align :'center' },
                // { text: 'Alamat', value: 'carbs' },
                    { text: 'No. Telp / HP', value: 'no_hp', align :'center' },
                    { text: 'Identitas', value: 'type_pemohon' },
                    { text: 'Isi Permohonan', value: 'isiPermohonan' , width : '250px', align : 'left elipsis-text'},
                    // { text: 'Alasan Mendapatkan Informasi', value: 'infoDiterima' },
                    // { text: 'Keterangan', value: 'keterangan' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                desserts: [],
            }
        },

        watch : {
            'filter.startDate'(){
                console.log("oke")
                this.filter.startDateFormated = this.formatDate(this.filter.startDate)
                console.log(this.filter.startDateFormated)
            } ,
            'filter.endDate'(){
                console.log("oke")
                this.filter.endDateFormated = this.formatDate(this.filter.endDate)
                console.log(this.filter.endDateFormated)
            } 
        },

        
        methods : {
            _doCetak_(){
                console.log("oke")
                this.$refs.html2Pdf.generatePdf()

            },
            _SURATMASUK_(filter){
                this.isLoading = true
                this.desserts = []


                console.log("okkeeee")

                var _url = (filter) ? `/suratMasuk?created_at_gte=${this.filter.startDateFormated}&created_at_lte=${ this.filter.endDateFormated }` : '/suratMasuk';
                console.log(_url)

                axios.get(this.$baseUrl+_url)
                .then((res)=>{
                    setTimeout(() => {
                        this.isLoading = false
                        this.desserts = res.data
                    }, 3000);
                })
            },

            editItem (item) {
                console.log(item)
            },
    
            deleteItem (item) {
                console.log(this.desserts.indexOf(item))
            },

            formatDate (date) {
                if (!date) return null
                const [year, month, day] = date.split('-')
                return `${year}/${month}/${day}`
            },
        },
 
        mounted(){
            this._SURATMASUK_()
        }
    }
</script>