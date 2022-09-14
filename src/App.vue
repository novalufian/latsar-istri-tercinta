<template>
  <v-app >
   
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted(){
    console.log(this.$baseUrl, 12313)
  }
};
</script>
<style>
@import './styles/style.css';
/* div {
    background-color: rgb(249 250 251 );
}

#main-content div{
  background-color: unset;
} */

*{
  font-family: Open Sans,sans-serif !important; 
}

</style>