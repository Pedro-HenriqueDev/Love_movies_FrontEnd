import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login e Cadastro/LoginView.vue'
import CadastreView from '../views/Login e Cadastro/CadastreView.vue'
import MoviesView from '../views/MoviesView.vue'
import HomePage from '../views/HomePage.vue'
import { tokenAuth, tokenAuthHome, tokenAuthParam } from '@/middleware/auth'
import AccountedCreate from '@/views/Login e Cadastro/AccountedCreateView.vue'
import RecoveryPassView from '@/views/Login e Cadastro/RecoveryPassView.vue'
import NewPassView from '@/views/Login e Cadastro/NewPasswordView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    beforeEnter: tokenAuthHome
  },
  {
    path: '/movies/:page',
    name: 'PageMovies',
    component: HomeView,
    beforeEnter: tokenAuth
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: tokenAuthHome
  },
  {
    path: '/cadastre',
    name: 'Cadastre',
    component: CadastreView,
    beforeEnter: tokenAuthHome
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
    component: AccountedCreate,
    beforeEnter: tokenAuthHome
  },
  {
    path: '/recoverypass',
    name: 'RecoveryPass',
    component: RecoveryPassView,
    beforeEnter: tokenAuthHome
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
