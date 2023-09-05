import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import('../views/Home.vue')
    },

    {
      path: '/login',
      name: 'login',
      component:() => import('../views/admin/Login.vue')
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component:() => import('../views/admin/Dashboard.vue')
    },

    {
      path: '/survey',
      name: 'survey',
      component:() => import('../views/admin/Survey.vue')
    },
   
  ]
})

export default router
