import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'
import TabsPage from '@/views/TabsPage.vue'
import { useAuth } from '@/composables/useAuth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { somenteVisitante: true }
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterPage.vue'),
    meta: { somenteVisitante: true }
  },
  {
    path: '/reset',
    component: () => import('@/views/ResetPasswordPage.vue'),
    meta: { somenteVisitante: true }
  },
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requerAutenticacao: true },
    children: [
      { path: '', redirect: '/tabs/tab1' },
      { path: 'tab1', component: () => import('@/views/Tab1Page.vue') },
      { path: 'tab2', component: () => import('@/views/Tab2Page.vue') },
      { path: 'tab3', component: () => import('@/views/Tab3Page.vue') },
      { path: 'tab4', component: () => import('@/views/Tab4Page.vue') },
      { path: 'tab5', component: () => import('@/views/Tab5Page.vue') },
      { path: 'about', component: () => import('@/views/AboutPage.vue') }
    ]
  },
  {
    path: '/terms',
    component: () => import('@/views/TermsPage.vue'),
    meta: { requerAutenticacao: true }
  },
  {
    path: '/privacy',
    component: () => import('@/views/PrivacyPage.vue'),
    meta: { requerAutenticacao: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/tabs/tab1'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const { ensureSession } = useAuth()
  const usuario = await ensureSession()
  const requerAutenticacao = to.matched.some(
    (route) => route.meta.requerAutenticacao
  )

  if (requerAutenticacao && !usuario) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.somenteVisitante && usuario) {
    return '/tabs/tab1'
  }

  return true
})

export default router
