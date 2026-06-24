import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { useAuth } from '@/composables/useAuth' 

const routes: Array<RouteRecordRaw> = [
  
  {
  path: '/login',
  component: () => import('@/views/LoginPage.vue')
},
{
  path: '/register',
  component: () => import('@/views/RegisterPage.vue')
},
{
  path: '/reset',
  component: () => import('@/views/ResetPasswordPage.vue')
},
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        meta: { requerAutenticacao: true}
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta: { requerAutenticacao: true}
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta: { requerAutenticacao: true}
      },
      {
        path: 'tab4',
        component: () => import('@/views/Tab4Page.vue'),
        meta: { requerAutenticacao: true}
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) =>
{
  const requer = to.meta.requerAutenticacao
  const { usuarioLogado } = useAuth()

  if (requer && !usuarioLogado?.value?.nome){
    next({path: '/login', query: {redirect: to.path}})

  } else {
    next()
  }
});

export default router
