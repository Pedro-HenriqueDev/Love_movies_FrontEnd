<script setup>
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'

const route = useRoute()

const movies = ref([]);
const page = computed(() => route.params.page);
const querySearch = computed(() => route.query.search);

const listmoviesLoved = ref([]);
const search = ref(null)

const allPages = ref(10);
const loading = ref(false)

watch(querySearch, (newquerySearch, oldquerySearch) => {
  if (newquerySearch != oldquerySearch) {
    searchMovies()
    moviesLoved()
  }
})

watch(page, (newPage, oldPage) => {
  if (newPage != oldPage) {
    searchMovies()
    moviesLoved()
  }
})

async function moviesLoved() {
  let token = document.cookie.split("=")
  let headers = {
    headers: {
      Authorization: `Bearer ${token[1]}`
    }
  }

  axios.get(process.env.VUE_APP_URL_APIUSER + "relations/movies", headers).then(res => {
    listmoviesLoved.value = res.data.data
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
async function searchMovies() {
  loading.value = true

  axios.get(process.env.VUE_APP_URL_SEARCH + "movie" + process.env.VUE_APP_KEY + "&language=pt-BR" + "&page=" + page.value + "&query=" + textSearch()).then(res => {
    loading.value = false
    allPages.value = res.data.total_pages
    movies.value = res.data.results
  }).catch(err => {
    loading.value = false
    console.log(err)
  });
}
function textSearch() {
  return querySearch.value
}

searchMovies()
moviesLoved()
</script>

<template>
  <Navbar />

  <div class="my-4 flex w-full sm:w-1/2 m-auto">
    <div class="relative w-full">
            <input v-model="search" type="search" @keyup.enter="$router.push({ name: 'SearchMovies', params: { page: '1' }, query: { search } })" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Pesquisar" required>
            <router-link :to="{ name: 'SearchMovies', params: { page: '1' }, query: { search } }">
              <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                  <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span class="sr-only">Search</span>
              </button>
          </router-link>
        </div>
  </div>

  <Pagination :allPages="allPages" :page="page" />

  <div v-if="movies.length == 0">
    <div class="h-screen w-full">
      <div
        class="m-auto text-4xl mt-7 font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
        Nenhum filme encontraddo</div>
      <router-link to="/movies/1"
        class="inline-flex mt-5 items-center justify-center p-2 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">Voltar
        para o Menu</router-link>
    </div>
  </div>

  <div v-else class="container_movies my-5">
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