<template >
    <div class="p-4 text-gray-800">
        <div class="flex justify-center border-2 border-t-0 border-l-0 border-r-0 p-5">
            <img src="../../../assets/bjn-kab.jpeg" class="w-1 w-20" alt="">
            <div class="flex flex-col item-center ml-5">
                <h1 class="text-xl capitalize font-bold w-full text-center">pejabat pengelola informasi dan dokumentas</h1>
                <h1 class="text-3xl font-bold text-center w-full">PPID</h1>
                <p class="w-full text-center text-sm text-gray-700">Sekretariat : Lantai I Gedung Pembak Bojonegoro Jl P. Mas Tumapel No.1 Bojonegoro</p>
                <p class="w-full text-center text-sm text-gray-700">Email : ppid@bojonegorokab.go.id</p>
            </div>
        </div>

        <div class="content">
            <h1 class="w-full text-center underline underline-offset-8 text-base">FORMULIR PERMOHONAN INFORMASI</h1>
            <p class="text-base text-center">No. Register : {{data.noReg}}</p>

            <div class="p-10">
                <div class="flex flex-row mt-3">
                    <p class="w-5/12 flex justify-between">Nama <span>:</span></p>
                    <p class="w-7/12 pl-2">{{data.nama}}</p>
                </div>
                <div class="flex flex-row mt-3">
                    <p class="w-5/12 flex justify-between">Alamat <span>:</span></p>
                    <p class="w-7/12 pl-2">{{data.alamat}} {{data.kota}} {{data.propinsi}}</p>
                </div>
                <div class="flex flex-row mt-3">
                    <p class="w-5/12 flex justify-between">No. Telp / Email <span>:</span></p>
                    <p class="w-7/12 pl-2">{{data.no_hp}}</p>
                </div>
                <div class="flex flex-row mt-3">
                    <p class="w-5/12 flex justify-between">Rincian Informasi yg Dibutuhkan <span>:</span></p>
                    <p class="w-7/12 pl-2">{{data.isiPermohonan}}</p>
                </div>
                <div class="flex flex-row mt-3">
                    <p class="w-5/12 flex justify-between">Tujuan Penggunaan Informasi<span>:</span></p>
                    <p class="w-7/12 pl-2 font-bold">{{data.kegunaan}}</p>
                </div>

                <!-- <div class="flex flex-row mt-3">
                    <p class="w-5/12 flex justify-between">Cara Memperoleh Informasi**<span>:</span></p>
                    <p class="w-7/12 pl-2">{{data.nama}}</p>
                </div> -->

                <!-- <div class="flex flex-row mt-3">
                    <p class="w-5/12 flex justify-between">Cara PEndapatkan Salinan Informasi**<span>:</span></p>
                    <p class="w-7/12 pl-2">{{data.nama}}</p>
                </div> -->
            </div>

            <div class="flex mt-12 flex-col">
                <p class="w-full text-center ">Bojonegoro, {{getDate()}}</p>
                <div class="flex flex-row justify-between mt-5 w-11/12 m-auto">

                    <div class="w-4/12 h-40 flex flex-col justify-between">
                        <p class="w-full text-center">Petugas Pelayanan Informasi <br> (Penerima Permohonan)</p>
                        <p class="w-full text-center font-bold uppercase">( ............. ) <br> NIP : .............</p>
                    </div>

                    <div class="w-4/12 h-40 flex flex-col justify-between">
                        <p class="w-full text-center">Pemohon Informasi</p>
                        <p class="w-full text-center font-bold uppercase">( {{data.nama}} ) <br>&nbsp;</p>
                    </div>

                </div>
                
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props : ['data'],
    methods : {
        getDate(){
            var _d = new Date().toLocaleDateString().split("/")

            var _m = { "1" : "Januari", "2" : "Februari", "3" : "Maret", "4" :"April", "5" : "Mei", "6" : "Juli", "7" : "Juni", "8" : "Agustus", "9" : "September", "10" : "Oktober", "11" : "November", "12" : "Desember" }
            return `${_d[1]} ${_m[parseInt(_d[0])]} ${_d[2]}`
        }
    }
}
</script>
<style lang="">
    
</style>