<script setup>
import Navbar from "@/components/Navbar.vue";
import Card from "../../components/Card.vue";
import Pagination from "@/components/Pagination.vue";
import axios from "axios";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const page = computed(() => route.params.page);

const movies = ref([]);
const listmoviesLoved = ref([]);

const allPages = ref(10);
const loading = ref(false)


watch(page, (newPage, oldPage) => {
  if(newPage != oldPage) {
    getMovies()
  }
})

async function moviesLoved() {
  let token = document.cookie.split("=");
  let headers = {
    headers: {
      Authorization: `Bearer ${token[1]}`,
    },
  };
  let moviesLoved = await axios.get(
    process.env.VUE_APP_URL_APIUSER + "relations/movies" + "?page=" + page.value,
    headers
  );
  allPages.value = moviesLoved.data.allPages
  moviesLoved.data.data.forEach((elem) => {
    listmoviesLoved.value.push(elem.movie);
  });
  return listmoviesLoved.value;
}

async function getMovies() {
  loading.value = true

  movies.value =  []
  listmoviesLoved.value = []
  
  let moviesFavorites = await moviesLoved();
  moviesFavorites.forEach(async (elem) => {
    let moviesLoved = await axios.get(
      process.env.VUE_APP_URL +
      String(elem) +
      process.env.VUE_APP_KEY +
      "&language=pt-BR");
      movies.value.push(moviesLoved.data);
  });

  loading.value = false
}

function findLove(idMovie) {
  let listMovies = listmoviesLoved.value;

  let loved = listMovies.findIndex((elem) => elem == idMovie);
  if (loved == -1) {
    return false;
  } else {
    return true;
  }
}

getMovies()
</script>

<template>
  <Navbar />
  <Pagination :allPages="allPages" :page="page" />

  <div v-if="movies.length == 0">
    <div class="h-screen w-full">
      <div
        class="m-auto text-4xl mt-7 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
        Nao ha filmes favoritos</div>
      <router-link to="/movies/1"
        class="inline-flex mt-5 items-center justify-center p-2 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">Voltar
        para o Menu</router-link>
    </div>
  </div>
  <div v-else>

    <div class="container_movies my-5">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <Card :movie="movie" :movieLoved="findLove(movie.id)" />
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