<template>
    <div class="container-init bg-gray-800">

        <div class="m-3 flex gap-3 absolute left-1 top-1">
            <a class="cursor-pointer" @click="$router.back">
                <img src="../../assets/de-volta.png" class="w-8 h-8">
            </a>
            <HeartFavorites class="cursor-pointer" :movieLoved="movieLoved" :movieId="movie.id" :pageFavorite="undefined" />
        </div>


        <div v-if="!loading" class="container-infos bg-gray-800">
            <div class="w-1/2 mx-6">
                <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{{movie.title}}<p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">{{formarterDate(movie.release_date)}}</p></h1>
                <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-30 dark:text-gray-400">{{movie.overview}}</p>
            <div class="container-genres">
                <div v-for="genre in genres" :key="genre.id">
                    <div>
                        <span class="bg-blue-100 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{{genre.name}}</span>
                    </div>
                </div>
            </div>
                <div class="stars mt-2">
                    <div v-for="(star, index) in stars" :key="index">
                        <div v-if="star">
                            <svg aria-hidden="true" class="text-yellow-400 w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </div>
                        <div v-else>
                            <svg aria-hidden="true" class="text-gray-300 w-7 h-7 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </div>
                    </div>
                </div>

                <div class="div-poster mt-4">
                    <img class="lg:w-1/2 rounded-lg" :src="imgFormater(movie.backdrop_path)" alt="">
                </div>
            </div>
            <div class="w-1/2">
                <div class="div-poster">
                    <img class="lg:w-1/2 rounded-lg" :src="imgFormater(movie.poster_path)" alt="">
                </div>
            </div>
        </div>
        <div class="w-full h-full flex align-center justify-center " v-else role="status">
            <svg aria-hidden="true" class="inline w-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>

        <Modal :hidden="modal.hidden" :message="modal.message"/>

    </div>
</template>

<script>
import axios from 'axios'
import Modal from "@/components/Modal.vue"
import HeartFavorites from '@/components/HeartFavorites.vue'

export default {

    data() {
        let modal = {
            hidden: true,
            message: ''
        }
        return {
            idMovie: String(this.$route.params.id),
            loading: false,
            movie: {},
            genres: [],
            stars: [],
            modal,
            movieLoved: undefined,
        }
    },
    created() {
       this.getMovie()
       this.moviesLoved()
    },
    components: {
        Modal,
        HeartFavorites
    },
    methods: {
        moviesLoved() {
            let token = document.cookie.split("=")
                let headers = {
                headers: {
                    Authorization: `Bearer ${token[1]}`
                    }
                }
            
            axios.get(process.env.VUE_APP_URL_APIUSER + "relations/allmovies", headers).then(res => {
                let loved = res.data.findIndex(elem => elem.movie == this.idMovie)
                
                if(loved == -1) {
                    this.movieLoved = false
                } else {
                    this.movieLoved = true
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getMovie() {
            this.loading = true
            axios.get(process.env.VUE_APP_URL + this.idMovie + process.env.VUE_APP_KEY+ "&language=pt-BR").then((res) => {
                this.loading = false
                this.movie = res.data
                this.genres = res.data.genres
                this.starsFormarter()
            }).catch((err) => {

                if(err.response.status == 404) {
                    this.modal.hidden = false
                    this.modal.message = "Filme nao encontrado"
                    this.loading = false
                    return;
                }
                this.modal.hidden = false
                this.modal.message = "Ocorreu um erro Interno"

                this.loading = false
                return;
            })
        },
        imgFormater(link) {
            return process.env.VUE_APP_IMAGE + link
        },
        formarterDate(movieDate) {
            let release = new Date(movieDate)
            if(release == "Invalid Date") {
                return ""
            }
            return release.toLocaleDateString()
        },
        starsFormarter() {
            let votes = Number(this.movie.vote_average)
            let medias = [2.5 ,4 , 5.5, 7.3, 8.5]
            let stars = [false,false,false,false,false]

            if(votes > medias[0]) {
                stars[0] = true
            }
            if(votes > medias[1]) {
                stars[1] = true
            }
            if(votes > medias[2]) {
                stars[2] = true
            }
            if(votes > medias[3]) {
                stars[3] = true
            }
            if(votes > medias[4]) {
                stars[4] = true
            }
            this.stars = stars
        }
    }
}
</script>

<style scoped>
.container-init {
    width: 100%;
    height: 100vh;
}
.container-infos {
    padding-top: 4%;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
}
.div-poster {
    width: 100%;
    display: flex;
    justify-content: center;
}
.container-genres, .stars {
    display: flex;
    justify-content: center;
}
</style>