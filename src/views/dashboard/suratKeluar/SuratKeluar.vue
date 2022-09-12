<template>
    <div class="p-5  shadow-sm shadow-gray-200 rounded-2xl min-h-screen">

        <v-card class="p-10  rounded-2xl shadow-none shadow-gray-300 bg-white bg-opacity-70">
            <v-card-title class="w-full flex justify-between">
                <router-link to="/pengajuan-keberatan-baru" class="h-14 btn-blue">Pengajuan Keberatan Baru</router-link>
                <div class="w-5/12">
                    <v-text-field v-model="search" outlined append-icon="mdi-magnify" label="Pencarian pengajuan keberatan . . . " single-line hide-details class="bg-white"></v-text-field>
                </div>
            </v-card-title>

            <v-data-table :headers="headers" :items="desserts" :search="search" :loading="isLoading" :loading-text="'Mohon tunggu sedang memuat data'" class=" ppid-table-data">
                
                <template v-slot:[`item.actions`]="{ item }">
                    <router-link class="inline-flex items-center py-2 px-8 text-sm font-medium text-center text-white bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform " :to="'/permohonan-keberatan-edit/'+item.id">edit</router-link>
                    <!-- <v-icon small @click="deleteItem(item)" :class="'bg-red-500 p-2 rounded-2 text-white'">delete</v-icon> -->
                </template>
                <template v-slot:[`item.nama`]="{ item }">
                    <router-link class="link-to-pemohon" :to="'/data-pemohon/'+item.user_id">{{item.nama}}</router-link>
                </template>

                <template v-slot:[`item.type_pemohon`]="{ item }">
                    <span v-if="item.type_pemohon == 'LSM'">AKTA : {{item.akta}}</span>
                    <span v-else>KTP : {{item.ktp}}</span>
                </template>

                <template v-slot:[`item.infoDiminta`]="{ item }">
                    <p class="elipsis-text m-0 ...">{{item.infoDiminta}}</p>
                </template>
                
            </v-data-table>
            
        </v-card>
    
    </div>
    
</template>

<script>
    import axios from 'axios'
    export default {
        name : "SuratMasuk",
        data () {
            return {
            isLoading : true,
            search: '',
            headers: [
                {text: 'No Registrasi',value: 'noReg'},
                { text: 'Tanggal Permohonan', value: 'tglPermohonan' },
                { text: 'Nama', value: 'nama' },
                // { text: 'Alamat', value: 'carbs' },
                { text: 'No. Telp / HP', value: 'no_hp' },
                { text: 'Identitas', value: 'type_pemohon' },
                { text: 'Informasi Yang Diminta', value: 'infoDiminta', width: '20%' },
                // { text: 'Alasan Mendapatkan Informasi', value: 'infoDiterima' },
                // { text: 'Keterangan', value: 'keterangan' },
                { text: 'Actions', value: 'actions', sortable: false , align : 'center'},
            ],
            desserts: [],
            }
        },
        methods : {
            _SURATKELUAR_(){
                axios.get(this.$baseUrl+"/suratKeluar")
                .then((res)=>{
                    setTimeout(() => {
                        this.isLoading = false
                        this.desserts = res.data
                        res
                    }, 3000);
                })
            },

            editItem (item) {
                console.log(item)
            },
    
            deleteItem (item) {
                console.log(this.desserts.indexOf(item))
            },
        },
 
        mounted(){
            this._SURATKELUAR_()
        }
    }
</script>
