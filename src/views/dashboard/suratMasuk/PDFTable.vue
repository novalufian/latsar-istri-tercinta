<template >
    <div class="p-5">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">No Registrasi</th>
                        <th class="text-left">Tgl. Permohonan</th>
                        <th class="text-left">Nama</th>
                        <th class="text-left">Alamat</th>
                        <th class="text-left">No. Telp / HP</th>
                        <th class="text-left">Identitas</th>
                        <th class="text-left">Isi Permohonan</th>
                        <th class="text-left">Kegunaan</th>
                    </tr>
                </thead>
            <tbody>
                <tr v-for="item in datadesserts" :key="item.name">
                    <td class="w-20">{{ item.noReg }}</td>
                    <td class="w-20">{{ item.tglPermohonan }}</td>
                    <td class="w-20">{{ item.nama }}</td>
                    <td class="w-24">{{ item.alamat }} {{ item.kota }} {{ item.provinsi }}</td>
                    <td class="w-20">{{ item.no_hp}}</td>
                    <td class="w-20">{{ (item.type_pemohon == 'LSM' ) ? item.akta : item.ktp }}</td>
                    <td class="w-40">{{ item.isiPermohonan }}</td>
                    <td ><p class="w-20">{{ item.kegunaan }}</p></td>

                </tr>
            </tbody>
            </template>
        </v-simple-table>
     
    </div>
</template>
<script>
export default {
    props : ['datadesserts'],
    data(){
        return{
            dataheaders: [
                {text: 'No Registrasi',value: 'noReg', align :'center'},
                { text: 'Tanggal Permohonan', value: 'tglPermohonan' , align :'center'},
                { text: 'Nama', value: 'nama', align :'center' },
                { text: 'Alamat', value: 'alamat' },
                { text: 'No. Telp / HP', value: 'no_hp', align :'center' },
                { text: 'Identitas', value: 'type_pemohon' },
                { text: 'Isi Permohonan', value: 'isiPermohonan' , width : '250px', align : 'left elipsis-text'},
                { text: 'Kegunaan', value: 'kegunaan' },
            ],
        }
    }
    
}
</script>
<style lang="">
    
</style>