<script setup>
import axios from "axios"
import { ref, watch, defineEmits, computed } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()

const emit = defineEmits(["close"])
const props = defineProps({
    showModal: Boolean
})

const messageError = ref("")
const password = ref(null)
const pass = ref(false)
const show = computed(() => props.showModal)

watch(show, (toModal, oldModal) => {
    if (toModal != oldModal) {
        show.value = false
    }
})

function close() {
    show.value = false
    pass.value = false
    emit("close", false)
}
function erasedCookie() {
    document.cookie = "token=;Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/")
}
function erasedAccout() {
    let token = document.cookie.split("=")

    axios.delete(process.env.VUE_APP_URL_APIUSER + "users", {
        data: { password: password.value },
        headers: { "Authorization": `Bearer ${token[1]}` }
    }).then(res => {
        
        if (res.status == 200) {
            erasedCookie()
            router.value.push("/")
        }
    }).catch(err => {
        messageError.value = err.response.data.message
        console.log(err)
    })
}
</script>

<template>
    <div v-show="show"
        class="modal w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

        <div class="flex justify-end px-4 pt-4">
            <button @click="close()" type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>
        <div class="flex flex-col items-center pb-10">
            <img class="w-16 rounded-full" src="../assets/profile-picture-5.jpg" alt="Rounded avatar">
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white"></h5>
            <span class="text-sm text-gray-500 dark:text-gray-400"></span>
            <div class="flex flex-col mt-4 space-x-3 md:mt-6">
                <div class="flex">
                    <button @click="erasedCookie" type="button"
                        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Sair</button>
                    <button @click="pass ? pass = false : pass = true" type="button"
                        class="text-gray-900 bg-red-600 border focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:text-white dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Apagar
                        Conta</button>
                </div>
                <div v-if="pass">
                    <input type="password" v-model="password" id="default-search"
                        class="block w-52 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Senha" required>
                    <button @click="erasedAccout" type="button"
                        class="text-gray-900 bg-red-600 border focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:text-white dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Apagar</button>

                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.modal {
    position: absolute;
    z-index: 100;
    right: 10px;
    top: 100px;
}</style>