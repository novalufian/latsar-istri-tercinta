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
  import axios from 'axios';
  import NavBar from '../components/util/NavBar.vue';
  import SideBar from '../components/util/SideBar.vue'
  export default {
    name: 'HomeView',

    components: {
      NavBar, SideBar
    },

    methods : {
      _set(){
        var _x = [{ "created_at": "2021/09/01", }, { "created_at": "2021/01/08", }, { "created_at": "2021/02/22", }, { "created_at": "2021/08/10", }, { "created_at": "2021/10/29", }, { "created_at": "2021/04/20", }, { "created_at": "2021/03/30", }, { "created_at": "2021/08/01", }, { "created_at": "2021/05/02", }, { "created_at": "2021/10/23", }, { "created_at": "2021/10/24", }, { "created_at": "2021/05/18", }, { "created_at": "2021/09/03", }, { "created_at": "2021/09/10", }, { "created_at": "2021/07/28", }, { "created_at": "2021/01/29", }, { "created_at": "2021/05/08", }, { "created_at": "2021/10/15", }, { "created_at": "2021/03/05", }, { "created_at": "2021/08/08", }, { "created_at": "2021/05/31", }, { "created_at": "2021/12/09", }, { "created_at": "2021/08/14", }, { "created_at": "2021/06/18", }, { "created_at": "2021/12/11", }, { "created_at": "2021/02/15", }, { "created_at": "2021/12/25", }, { "created_at": "2021/12/11", }, { "created_at": "2021/10/27", }, { "created_at": "2021/06/17", }, { "created_at": "2021/09/28", }, { "created_at": "2021/02/09", }, { "created_at": "2021/09/19", }, { "created_at": "2021/02/20", }, { "created_at": "2021/01/26", }, { "created_at": "2021/10/23", }, { "created_at": "2021/12/28", }, { "created_at": "2021/10/11", }, { "created_at": "2021/04/14", }, { "created_at": "2021/11/12", }, { "created_at": "2021/09/23", }, { "created_at": "2021/08/31", }, { "created_at": "2021/09/09", }, { "created_at": "2021/03/15", }, { "created_at": "2021/02/28", }, { "created_at": "2021/06/01", }, { "created_at": "2021/05/13", }, { "created_at": "2021/05/07", }, { "created_at": "2021/12/17", }, { "created_at": "2021/08/10", }, { "created_at": "2021/10/15", }, { "created_at": "2021/07/04", }, { "created_at": "2021/11/22", }, { "created_at": "2021/01/08", }, { "created_at": "2021/06/27", }, { "created_at": "2021/01/29", }, { "created_at": "2021/02/11", }, { "created_at": "2021/02/28", }, { "created_at": "2021/11/24", }, { "created_at": "2021/03/23", }, { "created_at": "2021/09/05", }, { "created_at": "2021/07/09", }, { "created_at": "2021/09/08", }, { "created_at": "2021/03/12", }, { "created_at": "2021/02/26", }, { "created_at": "2021/05/31", }, { "created_at": "2021/09/04", }, { "created_at": "2021/09/17", }, { "created_at": "2021/01/19", }, { "created_at": "2021/05/16", }, { "created_at": "2021/04/17", }, { "created_at": "2021/05/31", }, { "created_at": "2021/04/08", }, { "created_at": "2021/03/03", }, { "created_at": "2021/07/11", }]

        axios.get(this.$baseUrl +"/suratMasuk")
        .then((res)=>{
          res.data.forEach((el, i) => {
            if(el.created_at == undefined){
              console.log(el.created_at)
              el.created_at = _x[i].created_at 
              this._postData(el)
            }
            i
          });
        })
      },

      _postData(data){
        axios.put(this.$baseUrl + "/suratMasuk/"+ data.id, data)
        .then(res=>{
          console.log(res.data)
        })
      }
    },

    mounted(){
      // this._set()
    }
  }
</script>
