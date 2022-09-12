<template >

<main class="bg-gray-50">
        <div class="flex flex-col justify-center items-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
            <img src="../assets/logo.png" class="my-5 h-auto w-24" alt="">

            <div class="p-10 w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-gray-300">
                <div class="space-y-8">
                    <h2 class="text-2xl text-gray-900 my-4 text-center w-full mb-10">
                        Selamat Datang Di Aplikasi Persurat PPID Utama Kab. Bojonegoro, 
                        <br>
                        <span>Silahkan Login</span>
                    </h2>
                    
                    <validation-observer ref="observer" v-slot="{ invalid }">
                        <form @submit.prevent="doLogin" class="w-full flex flex-col justify-center">
                            <validation-provider v-slot="{ errors }" name="Username" rules="required|max:10">
                                <v-text-field v-model="username" :counter="10" :error-messages="errors" label="Username" required outlined></v-text-field>
                            </validation-provider>

                            <validation-provider v-slot="{ errors }" name="password" rules="required">
                                <v-text-field v-model="password" :error-messages="errors" required outlined :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showpassword ? 'text' : 'password'" name="input-10-2" label="Password anda yang rahasia sekali" hint="At least 8 characters" value="wqfasds" class="input-group--focused" @click:append="showpassword = !showpassword"></v-text-field>
                            </validation-provider>

                            <div class="w-5/12 flex m-auto">
                                <v-btn class="btn-login" type="submit" :disabled="invalid">Login</v-btn>
                            </div>
                        </form>
                    </validation-observer>
                </div>
            </div>
        </div>
    </main>


</template>
<script>
    import axios from 'axios'
    // import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
    import { /*extend,*/ ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    setInteractionMode('eager')

    
    export default {
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data(){
            return {
                username : '',
                password : '',
                showpassword : false,
            }
        },

        methods : {
            doLogin(){
                axios.get(this.$baseUrl + "/login?username="+this.username)
                .then((res)=>{
                    console.log(res.data)
                    if (res.data.length > 0) {
                        this.$router.push({name : 'home'})
                    }
                })
                .catch((err)=>{
                    if(err){
                        err
                    }
                })
            }
        }
        
    }
</script>
