import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/PagesUser/HomeView.vue'
import LoginView from '@/views/Login e Cadastro/LoginView.vue'
import CadastreView from '@/views/Login e Cadastro/CadastreView.vue'
import MoviesView from '@/views/PagesUser/MoviesView.vue'
import HomePage from '@/views/HomePage.vue'
import { tokenAuth, tokenAuthParam } from '@/middleware/auth'
import AccountedCreate from '@/views/Login e Cadastro/AccountedCreateView.vue'
import RecoveryPassView from '@/views/Login e Cadastro/RecoveryPassView.vue'
import NewPassView from '@/views/Login e Cadastro/NewPasswordView.vue'
import favoritesView from '@/views/PagesUser/FavoritesView.vue'
import SearchMovies from '@/views/PagesUser/SearchView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/movies/:page',
    name: 'PageMovies',
    component: HomeView,
    beforeEnter: tokenAuth
  },
  {
    path: '/search/:page',
    name: 'SearchMovies',
    component: SearchMovies,
    beforeEnter: tokenAuth
  },
  {
    path: '/favorites/:page',
    name: 'FavoritesMovies',
    component: favoritesView,
    beforeEnter: tokenAuth
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/cadastre',
    name: 'Cadastre',
    component: CadastreView,
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: MoviesView,
    beforeEnter: tokenAuth
  },
  {
    path: '/accountcreated/:token',
    name: 'AccountedCreated',
    component: AccountedCreate
  },
  {
    path: '/recoverypass',
    name: 'RecoveryPass',
    component: RecoveryPassView,
  },
  {
    path: '/newpass/:token',
    name: 'NewPass',
    component: NewPassView,
    beforeEnter: tokenAuthParam
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
