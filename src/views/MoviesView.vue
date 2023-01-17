<template>
    <div class="container-init bg-gray-800">
        <div class="container-infos bg-gray-800">
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
    </div>
</template>

<script>
import axios from 'axios'

export default {

    data() {
        return {
            movie: '',
            genres: [],
            stars: []
        }
    },
    created: function() {
        this.getMovie()
    },
    methods: {
        getMovie() {
            const idMovie = String(this.$route.params.id)
            axios.get(process.env.VUE_APP_URL + idMovie + process.env.VUE_APP_KEY+ "&language=pt-BR").then((res) => {
                this.movie = res.data
                this.genres = res.data.genres
                this.starsFormarter()
            }).catch((err) => {
                console.log(err)
            })
        },
        imgFormater(link) {
            return process.env.VUE_APP_IMAGE + link
        },
        formarterDate(movieDate) {
            let release = new Date(movieDate)
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