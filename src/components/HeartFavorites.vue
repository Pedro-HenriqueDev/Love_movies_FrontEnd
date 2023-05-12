<script>
import axios from "axios"

export default {
    data() {
        return {
            loved: true,
            erased: this.pageFavorite? false : undefined
        }
    },
    props: {
        movieLoved: Boolean,
        movieId: Number,
        pageFavorite: Boolean
    },
    methods: {
        love(idMovie, movieLoved) {
            let token = document.cookie.split("=")
            let headers = {
                        headers: {
                            Authorization: `Bearer ${token[1]}`
                    }
                }
            if(!movieLoved) {

                axios.post(process.env.VUE_APP_URL_APIUSER + "relations/movies",{idMovie},headers).then(res => {})
                .catch(err => {
                    console.log(err)
                })

                this.loved = this.movieLoved
                // EMIT
                this.$emit("loved", false)
                this.erased = this.pageFavorite? false : undefined
                return
            } else {

                axios.delete(process.env.VUE_APP_URL_APIUSER + "relations/movies",{
                    data: {idMovie},
                    headers: {Authorization: `Bearer ${token[1]}`}
                }).catch(err => {
                    console.log(err)
                })

                this.loved = undefined
                // EMIT
                this.$emit("loved", true)
                this.erased = this.pageFavorite? true : undefined
                return
            }
        }
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