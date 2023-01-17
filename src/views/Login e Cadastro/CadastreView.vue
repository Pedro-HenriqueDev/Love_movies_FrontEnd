<template>
    
    <div class="container-cadastre">
<div class="form mt-3 p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <h5 class="text-xl font-medium text-gray-900 dark:text-white"><router-link to="/"><img class="w-8" src="../../assets/botao-voltar.png" alt=""></router-link> Cadastre</h5>
    <div class="space-y-6">
        
        <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input type="text" name="name" v-model="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Example" required>
        </div>
        
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div>
                <label for="password"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" name="password" v-model="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input type="password" v-model="passwordConfirm" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >
            </div>
        </div>
        
        <button @click="cadastreUser()" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <div v-if="!loading">
                Cadastre
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
            Already have an account? <router-link to="/login" class="text-blue-700 hover:underline dark:text-blue-500">Login</router-link>
        </div>
    </div>
    

    <Toast :show="toast.show" :Error="toast.Error" :message="toast.message" @close="watchClose"/>

</div>    

    </div>
</template>

<script>
import axios from 'axios'
import Toast from '../../components/Toast.vue'

export default {
    data() {
        let toast = {
            show: false,
            Error: false,
            message: ""
        }

        let name = ''
        let email = ''
        let password = ''
        let passwordConfirm = ''
        return {
            toast,
            name,
            email,
            password,
            passwordConfirm,
            loading: false
        }
    },
    components: {
        Toast
    },
    methods: {
        cadastreUser() {
            this.loading = true
            let user = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            if(!this.passConfirm()) {
                this.loading = false
                this.showMessage(true, true, "Senhas nao conferem")
                return;
            }
            axios.post(process.env.VUE_APP_URL_APIUSER + "users",user).then((res) => {
                this.loading = false
                this.showMessage(true, true, "Um email de verificaçao foi enviado para o seu email")
            }).catch((err) => {
                this.loading = false
                this.showMessage(true, true, err.response.data.message)
                console.log(err);
                
            });
        },
        watchClose(res) {
            this.toast.show = res.show
        },
        passConfirm() {
            if(this.password != this.passwordConfirm) {
                return false
            }
            return true
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
.container-cadastre {
    display: flex;
    justify-content: center;
    height: 100vh;
}
.form {
    height: 520px;
    width: 40%;
}
</style>