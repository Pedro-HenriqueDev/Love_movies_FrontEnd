<template>
    <div  class="h-screen w-full bg-gray-700 flex justify-center">
        <div v-if="!loading" class="w-full h-2/5 flex justify-center mt-10">
            <div class="sm:w-1/2 h-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center">
                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{msg}}</h5>
                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Aproveita uma lista com mais de 30 mil filmes!</p>
                <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <router-link to="/login" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <div class="text-left">
                            <div class="-mt-1 font-sans text-sm font-semibold">Login</div>
                        </div>
                    </router-link>
                    
                </div>
            </div>
        </div>
        <div class="w-full h-full flex align-center justify-center " v-else role="status">
                    <svg aria-hidden="true" class="inline w-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            msg: '',
            loading: false,
            token: this.$route.params.token
        }
    },
    created: function() {
        this.loading = true
        this.createAccount()
    },
    methods: {
        createAccount() {
            axios.get(process.env.VUE_APP_URL_APIUSER + "completeregistration/" + this.token).then(res => {
                if(res.status == 201) {
                    this.msg = res.data
                    this.loading = false
                    return;
                }
                this.msg = "Error"
                this.loading = false
            }).catch(err => {
                this.msg = "Internal Error"
                this.loading = false
                this.loading = false
                
            })
        }
    }
}
</script>

<style scoped>

</style>