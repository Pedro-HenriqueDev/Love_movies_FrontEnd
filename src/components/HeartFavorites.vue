<script setup>
import axios from "axios"
import { ref, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['loved'])

const props = defineProps({
    movieLoved: Boolean,
    movieId: Number
})

const loved = ref(true)
const erased = ref(props.pageFavorite ? false : undefined)

async function love(idMovie, heart) {
    let token = document.cookie.split("=")
    let headers = {
        headers: {
            Authorization: `Bearer ${token[1]}`
        }
    }
    if (!heart) {

        axios.post(process.env.VUE_APP_URL_APIUSER + "relations/movies", { idMovie }, headers).then(res => { })
            .catch(err => {
                console.log(err)
            })

        loved.value = props.movieLoved
        emit("loved", false)
        return
    } else {

        axios.delete(process.env.VUE_APP_URL_APIUSER + "relations/movies", {
            data: { idMovie },
            headers: { Authorization: `Bearer ${token[1]}` }
        }).catch(err => {
            console.log(err)
        })

        loved.value = undefined
        emit("loved", true)
        return
    }
}

</script>

<template>
    <div class="text-white font-medium rounded-lg text-sm px-5 text-center">
        <div v-if="movieLoved == loved">
            <img class="w-8 h-8" @click="love(movieId, true)" src="../assets/coracaored.png" alt="">
        </div>
        <div v-else>
            <img class="w-8 h-8" @click="love(movieId, false)" src="../assets/bordcoracao.png" alt="">
        </div>
    </div>
</template>