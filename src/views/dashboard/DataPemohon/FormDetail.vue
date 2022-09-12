<template >
    <div class="bg-white block">
    <div class="max-w-2xl mx-auto">
        
        <div class="w-full">
            <div class="w-full bg-blue-600 h-48 rounded-t-lg"></div>
            <div class="absolute -mt-20 ml-5">
                <div class="bg-gray-200 border border-gray-300 h-36 rounded-lg shadow-md border-b border-primary">
                    <img src="../../../assets/empty-avatar.jpeg" class="h-36">
                </div>
            </div>
        </div>

        <div class="bg-primary rounded-b-lg p-5 pt-20 flex flex-col">
            <div class="mb-1 font-bold tracking-tight text-2xl">{{data.nama}}</div>
            <div class="mb-1 text-gray-500">{{data.alamat}}</div>
            <div class=" text-gray-500">
                <div class="flex flex-row ml-auto space-x-2 items-center">
                    <div class="mb-1">{{data.kota}}</div>
                    <div class="mb-1">{{data.provinsi}}</div>
                </div>
            </div>

            <div class="py-5 break-all bbcode">
                <div class="mb-1">{{(data.type_pemohon == "perorangan") ? 'No KTP : '+ data.ktp : 'No Akta :'+ data.akta }}</div>
                <div class="mb-1">{{data.no_hp}}</div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    props : ['data']
}
</script>
<style lang="">
    
</style>