<script setup>
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const page = computed(() => route.params.page);
const search = ref(null)

const movies = ref([]);
const listmoviesLoved = ref([]);

const allPages = ref(10);
const loading = ref(false)

watch(page, (newPage, oldPage) => {
  if (newPage != oldPage) {
    getMovies()
  }
})

async function getMovies() {
  loading.value = true
  axios.get(process.env.VUE_APP_URL + "popular" + process.env.VUE_APP_KEY + "&language=pt-BR" + "&page=" + page.value + "&include_adult=false").then(res => {
    loading.value = false
    allPages.value = res.data.total_pages
    movies.value = res.data.results
  }).catch(err => {
    loading.value = false
    console.log(err)
  });
}
async function moviesLoved() {
  let token = document.cookie.split("=")
  let headers = {
    headers: {
      Authorization: `Bearer ${token[1]}`
    }
  }

  axios.get(process.env.VUE_APP_URL_APIUSER + "relations/allmovies", headers).then(res => {
    listmoviesLoved.value = res.data
  }).catch(err => {
    console.log(err)
  })
}
function findLove(idMovie) {
  let listMovies = listmoviesLoved.value
  let loved = listMovies.findIndex(elem => elem.movie == idMovie)
  if (loved == -1) {
    return false
  } else {
    return true
  }
}

getMovies()
moviesLoved()
</script>

<template>
  <Navbar />

  <div class="my-4 flex w-full sm:w-1/2 m-auto">
    <div class="relative w-full">
            <input type="search" v-model="search" @keyup.enter="$router.push({ name: 'SearchMovies', params: { page: '1' }, query: { search } })" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Pesquisars" required>
            <router-link :to="{ name: 'SearchMovies', params: { page: '1' }, query: { search } }">
              <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ">
                  <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span class="sr-only">Search</span>
              </button>
          </router-link>
        </div>
  </div>

  <Pagination :allPages="allPages" :page="page" />
  <div class="container_movies my-5">
    <div class="movie" v-for="movie in movies" :key="movie.id">
      <Card :movie="movie" :loading="loading" :movieLoved="findLove(movie.id)" />
    </div>
  </div>

  <Pagination :allPages="allPages" :page="page" />
</template>

<style scoped>
.container_movies {
  width: 97%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}</style>