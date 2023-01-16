<template>
    <div class="dark:bg-gray-900 h-screen">
    <Navbar/>

    <main class="main flex-col sm:flex-row dark:bg-gray-900 pt-10">
        <div class="md:w-1/2 sm:w-full flex justify-center">
            <div class="w-full flex justify-center">
                <div class="h-72 md:w-9/12 sm:w-full mx-4 p-4 text-center bg-white rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Veja os novos lançamentos do cinema!</h5>
                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Veja os detalhes, procure por filmes e favorite-os para assistir depois.</p>
                <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <a href="#" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-gray-700">
                        <router-link to="/login">
                            <div class="text-left">
                                <div class=" -mt-1 font-sans text-lg font-semibold">Login</div>
                            </div>
                        </router-link>
                    </a>
                    <a href="#" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <router-link to="/Cadastre">
                            <div class="text-left">
                                <div class="-mt-1 font-sans text-lg font-semibold">Cadastre-se</div>
                            </div>
                        </router-link>
                    </a>
                </div>
                </div>
            </div>
        </div>
        <div class="md:w-1/2 sm:w-full">
            <div class="w-1/2 movie-container gap-3">
                <div class="w-5/12"  v-for="movie in movies" :key="movie.id">
                    <div>
                        <img class="w-full" :src="imgFormater(movie.backdrop_path)" alt="">
                    </div>
                </div>
            </div>
        </div>

    </main>
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
export default {
    data() {
        let movies = []
        return {
            movies
        }
    },
    components: {
        Navbar
    },
    created: function() {
        this.getMovie()
    },
    methods: {
    getMovie() {
            axios.get(process.env.VUE_APP_URL + "popular" + process.env.VUE_APP_KEY+ "&language=pt-BR").then((res) => {
                let movies = res.data.results.slice(0,4)
                this.movies = movies
            }).catch((err) => {
                console.log(err)
            })
        },
        imgFormater(link) {
            return process.env.VUE_APP_IMAGE + link
        }
    }
}
</script>


<style scoped>
.main {
    height: auto;
    padding-bottom: 20px;
    width: 100%;
    display: flex;
}
.movie-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
</style>