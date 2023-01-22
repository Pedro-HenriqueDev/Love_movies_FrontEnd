<template>
<Navbar />

<div class="my-4 flex w-full sm:w-1/2 m-auto">
    <input type="text" v-model="search" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Search..." required>
    <router-link :to="{name:'SearchMovies',params: {page: '1'}, query: {search}}">
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Pesquisar</button>
    </router-link>
  </div>

<Pagination :allPages="allPages" :page="page"/>
  <div class="container_movies my-5">
    <div class="movie" v-for="movie in movies" :key="movie.id">
      <Card :movie="movie" :loading="loading" :movieLoved="findLove(movie.id)"/>
    </div>
  </div>

  <Pagination :allPages="allPages" :page="page"/>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'
import { toRaw } from '@vue/reactivity'

export default {
  data() {
    let movies = []
    let listmoviesLoved = []
    let page = ''
    let allPages = -1
    return {
      search: '',
      movies,
      page,
      allPages,
      listmoviesLoved,
      loading: false
    }
  },
  components: {
    Navbar,
    Card,
    Pagination
},
  created: function() {
    this.$watch(
      () => this.$route.params.page,
      (toParams, previousParams) => {
        if(toParams != previousParams) {
          this.page = toParams
          this.moviesLoved()
          this.getMovies()
        }
      }
    )
    
    this.moviesLoved()
    this.page = this.$route.params.page
    this.getMovies()
    
  },
  name: 'HomeView',
  methods: {
    getMovies() {
      this.loading = true
        axios.get(process.env.VUE_APP_URL + "popular" + process.env.VUE_APP_KEY + "&language=pt-BR" + "&page=" + this.page).then(res => {
          this.loading = false
          this.allPages = res.data.total_pages
          this.movies = res.data.results
        }).catch(err => {
          this.loading = false
          console.log(err)
        });
    },
    moviesLoved() {
      let token = document.cookie.split("=")
        let headers = {
          headers: {
            Authorization: `Bearer ${token[1]}`
              }
        }
      
      axios.get(process.env.VUE_APP_URL_APIUSER + "relations/allmovies", headers).then(res => {
        this.listmoviesLoved = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    findLove(idMovie) {
      let listMovies = toRaw(this.listmoviesLoved)
      let loved = listMovies.findIndex(elem => elem.movie == idMovie)
      if(loved == -1) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
.container_movies {
  width: 97%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}
</style>