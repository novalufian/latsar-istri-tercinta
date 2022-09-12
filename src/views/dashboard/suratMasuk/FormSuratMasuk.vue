<template>
    <div class="p-5 bg-gray shadow-sm shadow-gray-200 rounded-2xl min-h-screen">

        <v-card class="p-10 bg-white rounded-2xl shadow-xl shadow-gray-300">
            <div class="mt-5 mb-10 w-10/12 m-auto">
                <h1 class="text-2xl tracking-tight font-bold" :class="(isUpdateActive) ? 'text-green-600' : 'text-blue-300'">Form {{(isUpdateActive) ? 'Ubah' : 'Tambah'}} Data Surat Masuk</h1>
            </div>
            <validation-observer ref="observer" v-slot="{ invalid }">
                
                <form @submit.prevent="submit" class="flex justify-space-around">

                    <div class="w-5/12">

                        <validation-provider v-slot="{ errors }" name="NoReg" rules="required">
                            <v-text-field v-model="dataSuratMasuk.noReg" :counter="10" :error-messages="errors" label="No Registrasi" outlined filled disabled></v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="NoReg" rules="required">
                            <v-menu v-model="openInputTglPermohonan" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto" >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field outlined  v-model="dataSuratMasuk.tglPermohonan" label="Tanggal Permohonan" readonly v-bind="attrs" v-on="on" :error-messages="errors"></v-text-field>
                                </template>
                                <v-date-picker v-model="dataSuratMasuk.tglPermohonan" @input="openInputTglPermohonan = false" ></v-date-picker>
                            </v-menu>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="namaPemohon" rules="required">
                            <v-autocomplete :error-messages="errors" v-model="dataSuratMasuk.nama" :items="listDataPemohon" outlined label="Nama Pehomon" @change="pilihDataPemohon" item-text="nama" return-object></v-autocomplete>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="alamat" rules="required">
                            <v-text-field outlined v-model="alamatLengkap" :error-messages="errors" label="Alamat" required filled disabled></v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="noTelp" rules="required">
                            <v-text-field outlined v-model="dataSuratMasuk.no_hp" :error-messages="errors" label="No Telp/ HP" filled required disabled></v-text-field>
                        </validation-provider>

                        <div class="w-full flex">
                            <validation-provider class="shrink-0 w-6/12" v-slot="{ errors }" name="identitas" rules="required">
                                <v-text-field class="shrink-0 pr-4" outlined v-model="selectIdentitas" :error-messages="errors" label="Identitas" filled required disabled></v-text-field>
                            </validation-provider>

                            <validation-provider class="shrink-0 w-6/12" v-slot="{ errors }" name="identitas" rules="required">
                                <v-text-field class="shrink-0 pl-4" filled outlined v-model="selectNoIndentitas" :error-messages="errors" label="No Identitas" required disabled ></v-text-field>
                            </validation-provider>

                        </div>
                    
                    </div>

                    <div class="w-5/12">
                        <validation-provider v-slot="{ errors }" name="Isi Permohonan" rules="required">
                            <v-textarea v-model="dataSuratMasuk.isiPermohonan" outlined name="input-7-4" label="Isi Permohonan" :error-messages="errors" required></v-textarea>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Kegunaan Informasi Yang Diminta" rules="required">
                            <v-textarea v-model="dataSuratMasuk.kegunaan" outlined name="input-7-4" label="Kegunaan Informasi Yang Diminta" :error-messages="errors" required></v-textarea>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Status " rules="required">
                            <v-select v-model="dataSuratMasuk.status" outlined name="input-7-4" label="status" :error-messages="errors" :items="['Terpenuhi', 'Belum Terpenuhi']" ></v-select>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Waktu Pelayanan " rules="required">
                            <v-text-field outlined filled v-model="dataSuratMasuk.waktuLayanan" :error-messages="errors" label="Waktu Pelayanan" required disabled></v-text-field>
                        </validation-provider>
                        
                        <div class="flex flex-row justify-between">
                            <v-btn class="mr-4 h-12 w-6/12" :class="(isUpdateActive) ? 'btn-green' : 'btn-blue'" type="submit" :disabled="invalid">{{submitText}}</v-btn>
                        <v-btn @click="clear" class="h-12 btn-gray w-5/12">clear</v-btn>
                        </div>
                        
                    </div>

                    
                </form>
            </validation-observer>
        </v-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import { uuid } from 'vue-uuid'
    import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

    setInteractionMode('eager')

    extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
    })

    extend('required', {
    ...required,
    message: '{_field_} can not be empty',
    })

    extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
    })

    extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
    })

    extend('email', {
    ...email,
    message: 'Email must be valid',
    })

    export default {
        components: {
            ValidationProvider,
            ValidationObserver,
        },

        data() {
            return {
                isUpdateActive : false,
                submitText : 'Simpan Surat Masuk',
                listDataPemohon : [],
                openInputTglPermohonan :false,
                alamatLengkap : '',
                selectIdentitas : '',
                selectNoIndentitas : '',
                identitas: {
                    'perorangan' : 'KTP',
                    'LSM' : 'Akta',
                },
                dataSuratMasuk : {
                    id: uuid.v1(),
                    noReg: this._NOREGFORMAT_(),
                    tglPermohonan: new Date().toISOString().substr(0, 10),
                    user_id: '',
                    nama: '',
                    provinsi: '',
                    kota: '',
                    alamat: '',
                    email: '',
                    no_hp: '',
                    type_pemohon: '',
                    ktp: '',
                    akta: '',
                    isiPermohonan: '',
                    kegunaan: '',
                    status: 'Belum Terpenuhi',
                    waktuLayanan : '0 hari',
                    created_at: '',
                },
                
            }
        },

        methods: {
            submit () {
                this.$refs.observer.validate()
                if(this.isUpdateActive){
                    this.ubahSuratMasuk()
                }else{
                    this.simpanSuratMasuk()
                }
            },

            _NOREGFORMAT_(){
                var _d = new Date();
                var _bb = {
                    "1" : "I", "2" : "II", "3" : "III", "4" : "IV", "5" : "V", "6" : "VI", "7" : "VII", "8" : "VIII", "9" : "IX", "10" : "X", "11" : "XI", "12" : "XII"
                }
                return `/${_bb[_d.getMonth().toString()]}/PPID/BJN/${_d.getFullYear()}`
            },

            ubahSuratMasuk(){
                axios.put(this.$baseUrl+ '/suratMasuk/'+this.dataSuratMasuk.id, this.dataSuratMasuk)
                .then((res)=>{
                    console.log(res.data)
                    this.$router.push({name : 'surat-masuk'})

                })
                .catch(function (error) {
                    console.log(error);
                });

            },

            simpanSuratMasuk(){
                axios.post(this.$baseUrl+ "/suratMasuk", this.dataSuratMasuk)
                .then((res)=>{
                    console.log(res)
                    this.$router.push({name : 'surat-masuk'})
                })
                .catch(function (error) {
                    console.log(error);
                });

            },

            openTglPermohonan(){
                this.openInputTglPermohonan = true
            },
            clear () {
                this.$refs.observer.reset()
            },

            dataPemohon(){
                axios.get(this.$baseUrl+ "/data-pemohon")
                .then((res)=>{
                    this.listDataPemohon = res.data
                })
            },

            getSuratMasukById(id){
                axios.get(this.$baseUrl+ "/suratMasuk/"+id)
                .then((res)=>{
                    console.log(res.data)
                    this.isUpdateActive = true;
                    this.submitText = 'Ubah Surat Masuk'
                    this.setDataEdit(res.data)
                    this.pilihDataPemohon(res.data)
                })
            },

            pilihDataPemohon(e){
                console.log(e, this.identitas[e.type_pemohon])
                this.dataSuratMasuk.user_id = e.user_id
                this.dataSuratMasuk.nama = e.nama
                this.dataSuratMasuk.provinsi = e.provinsi
                this.dataSuratMasuk.kota = e.kota
                this.dataSuratMasuk.alamat = e.alamat
                this.dataSuratMasuk.email = e.email
                this.dataSuratMasuk.no_hp = e.no_hp
                this.dataSuratMasuk.type_pemohon = e.type_pemohon
                this.dataSuratMasuk.ktp = e.ktp
                this.dataSuratMasuk.akta = e.akta
                this.selectIdentitas = this.identitas[e.type_pemohon]
                this.selectNoIndentitas = this.dataSuratMasuk[this.selectIdentitas.toLowerCase()]

                this.alamatLengkap = e.alamat + ' ' + e.kota + ', ' + e.provinsi
            },

            setDataEdit(data){
                this.dataSuratMasuk.id = data.id
                this.dataSuratMasuk.noReg = data.noReg
                this.dataSuratMasuk.tglPermohonan = data.tglPermohonan
                this.dataSuratMasuk.isiPermohonan = data.isiPermohonan
                this.dataSuratMasuk.kegunaan = data.kegunaan
                this.dataSuratMasuk.status = data.status
                this.dataSuratMasuk.waktuLayanan = data.waktuLayanan
                this.dataSuratMasuk.created_at = data.created_at
            }
        },
        

        created(){
            console.log(this.$route.params)
            this.dataPemohon()
            if(this.$route.params.id){
                this.getSuratMasukById(this.$route.params.id)
            }

        }
    }
</script>