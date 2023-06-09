import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'
import UpgradeToProView from '../views/UpgradeToProView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/pro',
      name: 'pro',
      component: UpgradeToProView
    },
  ]
})

export default router
