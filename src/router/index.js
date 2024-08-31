import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //la vue par défaut
    {
      path: '/',
      name: 'home',
      component:() => import('../views/Home.vue')
    },
    //la route me redirigeant sur la page de connexion de l'admin
    {
      path: '/administration/login',
      name: 'login',
      component:() => import('../views/admin/Login.vue')
    },
    //la route me permettant d'accéder au dashboard de l'admin
    {
      path: '/administration',
      name: 'dashboard',
      component:() => import('../views/admin/Dashboard.vue'), //la page d'accueil de l'admin
      //sécurité de l'administration
      beforeEnter: (to, from, next) => {
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
        if (isAdmin) { // si l'administration est connecté je le laisse poursuivre
          next();
        } else { //sinon je le redirige sur la page de connexion
          next('/administration/login');
        }
      }
    },
    //la route permettant à l'admin d'accéder à la liste des questions
    {
      path: '/administration/questions',
      name: 'survey',
      component:() => import('../views/admin/Survey.vue'), //la page des questions sur le dashboard de l'admin
      //sécurité de l'administration
      beforeEnter: (to, from, next) => {
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
        if (isAdmin) { // si l'administration est connecté je le laisse poursuivre
          next();
        } else { //sinon je le redirige sur la page de connexion
          next('/administration/login');
        }
      }
    },
    //la route permettant aux utilisateurs de répondre aux questions
    {
      path: '/form',
      name: 'form',
      component:() => import('../views/Form.vue')
    },
     //la route permettant aux utilisateurs d'avoir accès à leurs réponses
     {
      path: '/responses/:uuid',
      name: 'ResponseUser',
      component:() => import('../views/ResponseUser.vue'),
      props: true // Permet de passer les paramètres de l'URL comme props à la composante ResponseUser
    },
    //la route permettant à l'admin d'avoir accès à toutes les réponses du sondage
    {
      path: '/administration/responses',
      name: 'ResponsesAdmin',
      component:() => import('../views/admin/ResponsesAdmin.vue'),
      //sécurité de l'administration
      beforeEnter: (to, from, next) => {
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
        if (isAdmin) { // si l'administration est connecté je le laisse poursuivre
          next();
        } else { //sinon je le redirige sur la page de connexion
          next('/administration/login');
        }
      }
    },
  ]
})

export default router
