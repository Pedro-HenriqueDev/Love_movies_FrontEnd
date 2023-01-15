<template>
<Navbar />
  <div class="container_movies my-5">
    <div class="movie" v-for="movie in movies" :key="movie.id">
      <Card :movie="movie"/>
    </div>
  </div>

  <Pagination :allPages="allPages" :page="page" @pagination="pagination"/>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'
import axios from 'axios'

export default {
  data() {
    let movies = []

    let page = 1
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
    this.getMovies()
  },
  watch: {
    page(newPage, oldPage) {
      if(newPage != oldPage) {
        this.getMovies()
      }
    }
  },
  name: 'HomeView',
  methods: {
    getMovies() {
        axios.get(process.env.VUE_APP_URL + "popular" + process.env.VUE_APP_KEY + "&language=pt-BR" + "&page=" + this.page).then(res => {
          console.log(this.page)
          console.log(res.data)
          this.allPages = res.data.total_pages
          this.movies = res.data.results
        }).catch(err => {
          console.log(err)
        });
    },
    pagination(result) {
      this.page = result.page
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