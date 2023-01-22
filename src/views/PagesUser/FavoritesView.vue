<script>
import Navbar from "@/components/Navbar.vue";
import Card from "../../components/Card.vue";
import Pagination from "@/components/Pagination.vue";
import axios from "axios";
import { toRaw } from "@vue/reactivity";

export default {
  data() {
    let movies = [];
    let listmoviesLoved = [];
    let page = "";
    let allPages = 10;
    return {
      movies,
      page,
      allPages,
      listmoviesLoved,
      loading: false,
    };
  },
  components: {
    Navbar,
    Card,
    Pagination,
  },
  created() {
    this.$watch(
      () => this.$route.params.page,
      (toParams, previousParams) => {
        if (toParams != previousParams) {
          this.page = toParams;
          this.movies = []
          this.getMovie();
        }
      }
    );
    this.movies = []
    this.page = this.$route.params.page;
    this.getMovie();
  },
  name: "HomeView",
  methods: {
    async moviesLoved() {
      let token = document.cookie.split("=");
      let headers = {
        headers: {
          Authorization: `Bearer ${token[1]}`,
        },
      };
      this.listmoviesLoved = []
      let moviesLoved = await axios.get(
        process.env.VUE_APP_URL_APIUSER + "relations/movies"+"?page="+ this.page,
        headers
      );
      this.allPages = moviesLoved.data.allPages
      moviesLoved.data.data.forEach((elem) => {
        this.listmoviesLoved.push(elem.movie);
      });
      return this.listmoviesLoved;
    },
    async getMovie() {
      let moviesFavorites = await this.moviesLoved();
      this.movies = []
      moviesFavorites.forEach(async (elem) => {
        let moviesLoved = await axios.get(
          process.env.VUE_APP_URL +
            String(elem) +
            process.env.VUE_APP_KEY +
            "&language=pt-BR");

        this.movies.push(moviesLoved.data);
      });
      console.log(this.movies)
    },
    findLove(idMovie) {
      let listMovies = this.listmoviesLoved;
      const list = toRaw(listMovies);
      
      let loved = list.findIndex((elem) => elem == idMovie);
      if (loved == -1) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<template>
  <Navbar />
  <Pagination :allPages="allPages" :page="page" />
  
  <div v-if="movies.length == 0">
    <div class="h-screen w-full">
        <div class="m-auto text-4xl mt-7 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">Nao ha filmes favoritos</div>
        <router-link to="/movies/1" class="inline-flex mt-5 items-center justify-center p-2 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">Voltar para o Menu</router-link> 
    </div>
  </div>
  <div v-else>

    <div class="container_movies my-5">
        <div class="movie" v-for="movie in movies" :key="movie.id">
        <Card
            :movie="movie"
            :loading="loading"
            :movieLoved="findLove(movie.id)"
            :pageFavorite="true"
        />
        </div>
    </div>

    <Pagination :allPages="allPages" :page="page" />
    </div>
</template>

<style scoped>
.container_movies {
  width: 97%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}
</style>