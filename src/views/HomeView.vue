<template>
<Navbar />
<Pagination :allPages="allPages" :page="page"/>
  <div class="container_movies my-5">
    <div class="movie" v-for="movie in movies" :key="movie.id">
      <Card :movie="movie"/>
    </div>
  </div>

  <Pagination :allPages="allPages" :page="page"/>
  <button type="button" v-show="page == undefined" @click="$router.push({name: 'PageMovies', params: {page: 2}})" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver mais Filmes</button>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'
import axios from 'axios'

export default {
  data() {
    let movies = []

    let page = ''
    let allPages = -1
    return {
      movies,
      page,
      allPages
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
          this.getMovies()
        }
      }
    )
    this.page = this.$route.params.page
    this.getMovies()
  },
  name: 'HomeView',
  methods: {
    getMovies() {
        axios.get(process.env.VUE_APP_URL + "popular" + process.env.VUE_APP_KEY + "&language=pt-BR" + "&page=" + this.page).then(res => {
          this.allPages = res.data.total_pages
          this.movies = res.data.results
        }).catch(err => {
          console.log(err)
        });
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