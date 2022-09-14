<template >
    <div>
    <aside id="sidebar" class="flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width" aria-label="Sidebar">
            <div class="flex relative flex-col flex-1 pt-0 min-h-0 ">
                <div class="flex overflow-y-auto flex-col flex-1 pt-8 pb-4">
                    <div class="flex-1 px-3 " id="sidebar-items">
                        <ul class="pb-2 pt-1">
                            
                           
                            <li v-for="(item, key) in navigation" :key="key">
                                <router-link :to="item.path" class=" side-nav">
                                    <div class="text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center"></div>
                                    <span class="ml-3 text-dark-500 text-sm font-light">{{item.name}}</span>
                                </router-link>
                                
                            </li>
                        
                        </ul>
                        
                    </div>
                </div>
            </div>
    </aside>
    </div>
</template>
<script>
export default {
    data(){
        return { 
            navigation : [
                {path : '/', name : 'Dashboard'},
                {path : '/permohonan-informasi', name : 'Permohonan Informasi'},
                // {path : '/Pengajuan-keberatan', name : 'Pengajuan Keberatan'},
                {path : '/data-pemohon', name : 'Data Pemohon'},
                // {path : '/data-atasan', name : 'Data Atasan'},

            ]
        }
    }
}
</script>

<style>
    
</style>
