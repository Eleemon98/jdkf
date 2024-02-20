import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',    
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/register",
    name: 'register',  
    component: () => import(/* webpackChunkName: "login" */ '../views/RegisterView.vue')
  },
  {
    path: "/login",
    name: 'login',  
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },  
  {
    path: "/posts",
    name: 'posts',  
    component: () => import(/* webpackChunkName: "post" */ '../views/HomeView.vue')
  },
  {
    path: "/post",
    name: 'post',  
    component: () => import(/* webpackChunkName: "post" */ '../views/HomeView.vue')
  },
  {
    path: "/profile/:id",
    name: 'profile',  
    component: () => import(/* webpackChunkName: "post" */ '../views/HomeView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
