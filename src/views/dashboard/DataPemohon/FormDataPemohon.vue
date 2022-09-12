<template>
    <div class="p-5 bg-gray shadow-sm shadow-gray-200 rounded-2xl min-h-screen">

        <v-card class="p-10 bg-white rounded-2xl shadow-xl shadow-gray-300">
            <div class="mt-5 mb-10 w-10/12 m-auto">
                <h1 class="text-2xl tracking-tight font-bold" :class="(isUpdateActive) ? 'text-green-600' : 'text-blue-300'">Form {{(isUpdateActive) ? 'Ubah' : 'Tambah'}} Data Pemohon</h1>
            </div>
            <validation-observer ref="observer" v-slot="{ invalid }">
                
                <form @submit.prevent="submit" class="flex justify-space-around">

                    <div class="w-5/12">

                        <validation-provider v-slot="{ errors }" name="Nama" rules="required">
                            <v-text-field v-model="dataPemohon.nama" :counter="10" :error-messages="errors" label="Nama Lengkap" outlined></v-text-field>
                        </validation-provider>

                        <validation-provider class="shrink-0 w-full" v-slot="{ errors }" name="Identitas" rules="required">
                            <v-select :items="['KTP', 'Akta']" outlined v-model="selectIdentitas" :error-messages="errors" label="Identitas" @change="pilihIdentitas"></v-select>
                        </validation-provider>

                        <validation-provider class="shrink-0 w-full" v-slot="{ errors }" name="identitas" rules="required">
                            <v-text-field class="shrink-0" outlined v-model="selectNoIndentitas" :error-messages="errors" label="No Identitas"  ></v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Nomor Telepon" rules="required">
                            <v-text-field v-model="dataPemohon.no_hp" :counter="10" :error-messages="errors" label="Nomor Telepon" outlined></v-text-field>
                        </validation-provider>

                        
                    
                    </div>

                    <div class="w-5/12">
                        <validation-provider class="shrink-0 w-6/12" v-slot="{ errors }" name="Porvinsi" rules="required">
                            <v-select :items="dataPropinsi" outlined v-model="dataPemohon.provinsi" :error-messages="errors" @change="selectPropinsi" label="Porvinsi"></v-select>
                        </validation-provider>

                        <validation-provider class="shrink-0 w-6/12" v-slot="{ errors }" name="Kota" rules="required">
                            <v-select :items="dataKota" outlined v-model="dataPemohon.kota" :error-messages="errors" label="Kota" ></v-select>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Alamat" rules="required">
                            <v-textarea v-model="dataPemohon.alamat" outlined name="input-7-4" label="Alamat Lengkap" :error-messages="errors" required></v-textarea>
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
    import { required, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

    setInteractionMode('eager')

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

    export default {
        components: {
            ValidationProvider,
            ValidationObserver,
        },

        data() {
            return {
                isUpdateActive : false,
                submitText : 'Simpan Data ',
                listDataPemohon : [],
                alamatLengkap : '',
                selectIdentitas : '',
                selectNoIndentitas : '',
                dataKotaPropinsi : null,
                dataKota : [],
                dataPropinsi : [],
                identitas: {
                    'perorangan' : 'KTP',
                    'LSM' : 'Akta',
                },
                dataPemohon : {
                    id:uuid.v1(),
                    nama:'',
                    type_pemohon:'',
                    ktp:'',
                    akta:'',
                    alamat:'',
                    kota:'',
                    provinsi:'',
                    no_hp:'',
                    created_at : new Date().toISOString()
                }
                
            }
        },

        methods: {
            submit () {
                console.log(this.dataPemohon)
                this.$refs.observer.validate()
                if(this.dataPemohon.type_pemohon == "perorangan"){
                    this.dataPemohon.ktp = this.selectNoIndentitas
                }else{
                    this.dataPemohon.akta = this.selectNoIndentitas
                }

                if(this.isUpdateActive){
                    this.ubahDataPemohon()
                }else{
                    this.simpanDataPemohon()
                }
            },


            ubahDataPemohon(){
                console.log(this.dataPemohon)
                axios.put(this.$baseUrl+'/data-pemohon/'+this.dataPemohon.id, this.dataPemohon)
                .then((res)=>{
                    console.log(res.data)
                    this.$router.push({name : 'data-pemohon'})

                })
                .catch(function (error) {
                    console.log(error);
                });

            },

            getDataKotaPropinsi(){
                axios.get(window.location.origin +"/data/kota-propinsi.json")
                .then((res)=>{
                    this.dataKotaPropinsi = res.data
                    res.data.forEach(el => {
                        this.dataPropinsi.push(el.provinsi)
                    });
                })
            },

            simpanDataPemohon(){
                
                axios.post(this.$baseUrl+"/data-pemohon", this.dataPemohon)
                .then((res)=>{
                    console.log(res)
                    this.$router.push({name : 'data-pemohon'})
                })
                .catch(function (error) {
                    console.log(error);
                });

            },

            pilihIdentitas(e){
                console.log(e)
                var _x = {
                    'KTP' : 'perorangan' ,
                    'Akta' : 'LSM' ,
                }
                this.dataPemohon.type_pemohon = _x[e]
            },

            
            clear () {
                this.$refs.observer.reset()
            },


            getDataPemohonById(id){
                axios.get(this.$baseUrl+"/data-pemohon/"+id)
                .then((res)=>{
                    console.log(res.data)
                    this.isUpdateActive = true;
                    this.submitText = 'Ubah Data Pemohon'
                    this.setUpDataPemohon(res.data)
                })
            },

            selectPropinsi(e){
                this.dataKotaPropinsi.forEach(el => {
                    if(el.provinsi == e){
                        this.dataKota = el.kota
                    }
                });
                
            },

            setUpDataPemohon(data){
                this.selectPropinsi(data.provinsi)
                console.log(data, this.identitas[data.type_pemohon])
                this.dataPemohon.id = data.id
                this.dataPemohon.nama = data.nama
                this.selectIdentitas = this.identitas[data.type_pemohon]
                this.selectNoIndentitas= data.ktp ||data.akta
                this.dataPemohon.alamat = data.alamat
                this.dataPemohon.kota = data.kota
                this.dataPemohon.provinsi = data.provinsi
                this.dataPemohon.no_hp = data.no_hp
                this.dataPemohon.type_pemohon = data.type_pemohon
                console.log(this.dataPemohon, "setelah setup")
            }
        },
        

        created(){
            this.getDataKotaPropinsi()

            console.log(window.location.origin)
            if(this.$route.params.id){
                this.getDataPemohonById(this.$route.params.id)
            }
 
            

        }
    }
</script>