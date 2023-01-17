<template>

    <div class="container-login">
        
<div class="form mt-3 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    
    <div class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white"><router-link to="/"><img class="w-8" src="../../assets/botao-voltar.png" alt=""></router-link>Sign in to our platform</h5>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" v-model="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" v-model="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        <div class="flex items-start">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input v-model="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
                </div>
                <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <router-link to="/recoverypass" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</router-link>
        </div>
        <button @click="login()" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <div v-if="!loading">
                Login
            </div>
            <div v-else role="status">
            <svg aria-hidden="true" class="inline w-5 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
</div>    
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <router-link to="/cadastre" class="text-blue-700 hover:underline dark:text-blue-500">Create account</router-link>
        </div>
    </div>
</div>    

    </div>
    <Toast :show="toast.show" :Error="toast.Error" :message="toast.message" @close="watchClose"/>

</template>

<script>
import Toast from "../../components/Toast.vue"
import axios from "axios"

export default {
    data() {
        let toast = {
            show: false,
            Error: false,
            message: ""
        }
        return {
            loading: false,
            toast,
            email: '',
            password: '',
            remember: false
        }
    },
    components: {
        Toast
    },
    methods: {
        login() {
            this.loading = true
            let user = {
                email: this.email,
                password: this.password
            }
            
            axios.post(process.env.VUE_APP_URL_APIUSER + "login",user).then((res) => {
                this.loading = false
                console.log(res)
                this.saveToken(res.data.token)
                this.$router.push("/movies/1")
            }).catch((err) => {
                this.loading = false
                this.showMessage(true, true, "erro")
                console.log(err);
                
            });
        },
        watchClose(res) {
            this.toast.show = res.show
        },
        saveToken(valor) {
            var validade = "";
            var date = new Date();

            if(this.remember == true) {
                date.setTime(date.getTime() + (7*24*60*60*1000));
                validade = "; expires=" + date.toUTCString();
                document.cookie = "token" + "=" + (valor || "")  + validade + "; path=/";
                return;
            }

            validade = "; expires=";
            document.cookie = "token" + "=" + (valor || "")  + validade + "; path=/";
        },
        showMessage(show, Error, message) {
            this.toast.message = message
            this.toast.Error = Error
            this.toast.show = show
        }
    }
}
</script>

<style scoped>
.container-login {
    display: flex;
    justify-content: center;
    height: 100vh;
}
.form {
    height: 550px;
}
</style>