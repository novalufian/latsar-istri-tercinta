<template>
  <div>
    <nav-bar></nav-bar>
    <div class="flex overflow-hidden  pt-16" >
      <side-bar></side-bar>
      <div id="main-content" class="h-full w-full  relative overflow-y-auto lg:ml-64">
        <main>
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
  
</template>

<script>
import NavBar from '../components/util/NavBar.vue';
import SideBar from '../components/util/SideBar.vue'
  export default {
    name: 'HomeView',

    components: {
      NavBar, SideBar
  },
  }
</script>
