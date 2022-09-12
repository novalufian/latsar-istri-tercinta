<template >
    <nav class="fixed z-30 w-full ">
        <div class="py-3 px-3 lg:px-5 lg:pl-3">
            <div class="flex justify-between items-center">
                <div class="flex justify-start items-center">
                    
                    <a href="/" class="text-md  flex items-center lg:mr-1.5 w-60 m-3 italic">
                        <img src="../../assets/logo.png" class="mr-2 h-8" alt="Creative Tim Logo">
                        <span class="hidden md:inline-block self-center text-lg leading-5 ml-3 ">Aplikasi Persuratan PPID Pusat</span>
                    </a>
                    
                </div>
                <div class="flex items-center">
                    <button id="toggleSidebarMobileSearch" type="button" class="p-2 text-gray-500 rounded-2xl lg:hidden hover:text-gray-900 hover:bg-gray-100">
                        <span class="sr-only">Search</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>