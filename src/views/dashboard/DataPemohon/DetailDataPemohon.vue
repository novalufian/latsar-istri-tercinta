<template>
    <div class="p-5  shadow-sm shadow-gray-200 rounded-2xl min-h-screen">

        <v-card class="p-10  rounded-2xl shadow-none shadow-gray-300 bg-white bg-opacity-70 min-h-screen">
            
            <!-- {{dataPemohon}} -->
            <div class="flex flex-row">
                <div class="w-3/12 p-5 text-center">
                    <img src="../../../assets/empty-avatar.jpeg" class="w-full rounded-md">

                    <h1 class="text-3xl tracking-tight font-bold my-2 ">{{dataPemohon.nama}}</h1>
                    <p class=" text-green-700 ">{{(dataPemohon.type_pemohon == "perorangan")  ? dataPemohon.ktp : dataPemohon.akta}}</p>
                    <p class=" text-gray-700">No. Telp {{dataPemohon.no_hp}}</p>
                    <p class="text-gray-500">{{dataPemohon.alamat}}</p>
                    <p class="text-gray-500">{{dataPemohon.kota}}, {{dataPemohon.provinsi}} </p>
                </div>

                <div class="w-9/12 p-5">

                    <v-tabs v-model="tab" centered >
                        <v-tabs-slider></v-tabs-slider>
                        <v-tab href="#tab-1">Permohonan Informasi</v-tab>
                        <v-tab href="#tab-2">Pengajuan Keberatan</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item :value="'tab-1'">
                            <v-data-table :headers="headers" :items="dessertsSuratMasuk" :search="search" :loading="isLoading" :loading-text="'Mohon tunggu sedang memuat data'" class=" ppid-table-data no-shadow">
                                <template v-slot:[`item.isiPermohonan`]="{ item }">
                                    <p class="elipsis-text m-0 ...">{{item.isiPermohonan}}</p>
                                </template>
                            </v-data-table>
                        </v-tab-item>

                        <v-tab-item :value="'tab-2'">
                            <v-data-table :headers="headersSuratKeluar" :items="dessertsSuratKeluar" :search="search" :loading="isLoading" :loading-text="'Mohon tunggu sedang memuat data'" class=" ppid-table-data no-shadow">
                                <template v-slot:[`item.isiPermohonan`]="{ item }">
                                    <p class="elipsis-text m-0 ...">{{item.isiPermohonan}}</p>
                                </template>
                            </v-data-table>
                        </v-tab-item>
                    </v-tabs-items>
                        
                    
                </div>
            </div>
            
        </v-card>

    </div>
    
</template>

<script>
    import axios from 'axios'
    // import PorfileDetail from "./FormDetail.vue"
    export default {
        data(){
            return {
                tab : null,
                dataPemohon : null,

                isLoading : true,
                search: '',
                headers: [
                    {text: 'No Registrasi',value: 'noReg', align :'center'},
                    { text: 'Tanggal Permohonan', value: 'tglPermohonan' , align :'center'},
                    { text: 'Isi Permohonan', value: 'isiPermohonan' , width : '250px', align : 'left elipsis-text'},
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                dessertsSuratMasuk: [],

                headersSuratKeluar: [
                    {text: 'No Registrasi',value: 'noReg', align :'center'},
                    { text: 'Tanggal Permohonan', value: 'tglPermohonan' , align :'center'},
                    { text: 'Isi Permohonan', value: 'isiPermohonan' , width : '250px', align : 'left elipsis-text'},
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                dessertsSuratKeluar: [],
            }
        },
        methods : {
            getPemohonById(id){
                axios.get(this.$baseUrl+'/data-pemohon/' + id)
                .then((res)=>{
                    res.data
                    this.dataPemohon = res.data
                })
            },

            getSuratMasukByUserId(id){
                axios.get(this.$baseUrl+'/suratMasuk?user_id='+id)
                .then((res)=>{
                    console.log(res.data)
                    setTimeout(() => {
                        this.isLoading = false
                        this.dessertsSuratMasuk = res.data
                    }, 2000);
                })
            },

            getKeberatanByUserId(id){
                axios.get(this.$baseUrl+'/suratKeluar?user_id='+id)
                .then((res)=>{
                    console.log(res.data)
                    setTimeout(() => {
                        this.isLoading = false
                        this.dessertsSuratKeluar = res.data
                    }, 2000);
                })
            }
        },

        created(){
            var _id = this.$route.params.id
            this.getPemohonById(_id)
            this.getSuratMasukByUserId(_id)
            this.getKeberatanByUserId(_id)
        }
    }
</script>
