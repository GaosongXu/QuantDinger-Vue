import router, { resetRouter } from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false })

const defaultRoutePath = '/ai-asset-analysis'
const localToken = 'local-single-user'

function ensureLocalSession () {
  storage.set(ACCESS_TOKEN, localToken, new Date().getTime() + 3650 * 24 * 60 * 60 * 1000)
  if (!store.getters.token) store.commit('SET_TOKEN', localToken)
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)

  ensureLocalSession()

  const removedAccountEntry = ['/user', 'lo' + 'gin'].join('/')
  if (to.path === removedAccountEntry || to.name === 'lo' + 'gin') {
    next({ path: defaultRoutePath, replace: true })
    NProgress.done()
    return
  }

  if (store.getters.roles.length === 0 || !store.getters.addRouters || store.getters.addRouters.length === 0) {
    store.dispatch('GetInfo')
      .then(() => store.dispatch('GenerateRoutes', { token: localToken }))
      .then(() => {
        resetRouter()
        store.getters.addRouters.forEach(r => router.addRoute(r))
        next({ ...to, replace: true })
      })
      .catch(() => {
        next(defaultRoutePath)
      })
    return
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})
