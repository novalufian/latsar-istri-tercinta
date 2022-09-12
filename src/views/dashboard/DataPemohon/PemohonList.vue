<template>
    <div class="p-5  shadow-sm shadow-gray-200 rounded-2xl min-h-screen">

        <v-card class="p-10  rounded-2xl shadow-none shadow-gray-300 bg-white bg-opacity-70">
            <v-card-title class="w-full flex justify-between">
                <router-link to="/data-pemohon-tambah" class="h-14 btn-blue">Tambah Data Pemohon</router-link>
                <div class="w-5/12">
                    <v-text-field v-model="search" outlined append-icon="mdi-magnify" label="Search data pemohon . . . " single-line hide-details class="bg-white"></v-text-field>
                </div>
            </v-card-title>

            <v-data-table :headers="headers" :items="desserts" :search="search" :loading="isLoading" :loading-text="'Mohon tunggu sedang memuat data'" class=" ppid-table-data">
                
                <template v-slot:[`item.actions`]="{ item }">
                    <router-link class="inline-flex items-center py-2 px-8 text-sm font-medium text-center text-white bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform " :to="'/data-pemohon-edit/'+item.id">edit</router-link>
                    <!-- <v-icon small @click="deleteItem(item)" :class="'bg-red-500 p-2 rounded-2 text-white'">delete</v-icon> -->
                </template>
                
                <template v-slot:[`item.nama`]="{ item }">
                    <!-- <router-link class="link-to-pemohon" :to="'/data-pemohon&id?='+item.user_id">{{item.nama}}</router-link> -->
                    <button @click="openModalDetail(item)">{{item.nama}}</button>
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

        <v-dialog v-model="dialog" width="500">
            <v-card >
                <v-btn text @click="dialog = false" class="absolute right-0">close</v-btn>
                <porfile-detail :data="modalDetail"></porfile-detail>

            </v-card>
        </v-dialog>
    
    </div>
    
</template>

<script>
    import axios from 'axios'
    import PorfileDetail from "./FormDetail.vue"
    export default {
        components : {
            PorfileDetail
        },
        name : "SuratMasuk",
        data () {
            return {
            dialog : false,
            isLoading : true,
            search: '',
            modalDetail : {
                id:'',
                nama:'',
                type_pemohon:'',
                ktp:'',
                akta:'',
                alamat:'',
                kota:'',
                provinsi:'',
                no_hp:'',
            },
            headers: [
                { text: 'Nama', value: 'nama' },
                { text: 'Alamat', value: 'alamat' , width : '30%'},
                { text: 'No. Telp / HP', value: 'no_hp' },
                { text: 'Identitas', value: 'type_pemohon' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            desserts: [],
            }
        },
        methods : {
            _DATAPEMOHON_(){
                axios.get(this.$baseUrl+"/data-pemohon")
                .then((res)=>{
                    setTimeout(() => {
                        this.isLoading = false
                        this.desserts = res.data
                    }, 3000);
                })
            },

            openModalDetail(item){
                this.dialog = true
                this.modalDetail.id = item.id
                this.modalDetail.nama = item.nama
                this.modalDetail.type_pemohon = item.type_pemohon
                this.modalDetail.ktp = item.ktp
                this.modalDetail.akta = item.akta
                this.modalDetail.alamat = item.alamat
                this.modalDetail.kota = item.kota
                this.modalDetail.provinsi = item.provinsi
                this.modalDetail.no_hp = item.no_hp
            },

            editItem (item) {
                console.log(item)
            },
    
            deleteItem (item) {
                console.log(this.desserts.indexOf(item))
            },
        },
 
        mounted(){
            this._DATAPEMOHON_()
        }
    }
</script>
