<script setup>
import { ref } from 'vue'
import modalUser from "./modalUser.vue"

const modalShow = ref(false)

function showUserModal() {
  modalShow.value = true
}

function closeModal(result) {
  modalShow.value = result
}
</script>

<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a class="flex items-center cursor-default">
        <h3 class="logo">LoveMovie</h3>
      </a>
      <div id="navbar-default">
        <ul
          class="flex items-center mt-4 border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link to="/movies/1"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Filmes</router-link>
          </li>
          <li>
            <router-link to="/favorites/1"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Favoritos</router-link>
          </li>
          <li>
            <button @click="showUserModal"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><img
                class="w-10 h-10 rounded-full" src="../assets/profile-picture-5.jpg" alt="Rounded avatar">

            </button>
            <modalUser :showModal="modalShow" @close="closeModal" />
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scope>
.logo {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: aliceblue;
  font-size: 1.5rem;
}</style>