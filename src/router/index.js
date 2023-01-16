import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login e Cadastro/LoginView.vue'
import CadastreView from '../views/Login e Cadastro/CadastreView.vue'
import MoviesView from '../views/MoviesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movies/:page',
    name: 'PageMovies',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastre',
    name: 'Cadastre',
    component: CadastreView
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: MoviesView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
