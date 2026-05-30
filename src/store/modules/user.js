import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { localUserInfo } from '@/api/local-user'
import { ACCESS_TOKEN, USER_INFO, USER_ROLES } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

storage.addPlugin(expirePlugin)

const LOCAL_TOKEN = 'local-single-user'
const LOCAL_ROLE = { id: 'admin', permissionList: ['dashboard', 'admin'] }
const LOCAL_INFO = localUserInfo()
const EXPIRES_AT = () => new Date().getTime() + 3650 * 24 * 60 * 60 * 1000

function installLocalSession () {
  const expiresAt = EXPIRES_AT()
  storage.set(ACCESS_TOKEN, LOCAL_TOKEN, expiresAt)
  storage.set(USER_INFO, LOCAL_INFO, expiresAt)
  storage.set(USER_ROLES, [LOCAL_ROLE], expiresAt)
}

installLocalSession()

const user = {
  state: {
    token: LOCAL_TOKEN,
    name: LOCAL_INFO.nickname || LOCAL_INFO.username || 'Local Admin',
    welcome: welcome(),
    avatar: LOCAL_INFO.avatar || '/avatar2.jpg',
    roles: [LOCAL_ROLE],
    info: LOCAL_INFO
  },

  mutations: {
    SET_TOKEN: (state, token) => { state.token = token || LOCAL_TOKEN },
    SET_NAME: (state, { name, welcome: welcomeText }) => {
      state.name = name || LOCAL_INFO.nickname
      state.welcome = welcomeText || welcome()
    },
    SET_AVATAR: (state, avatar) => { state.avatar = avatar || LOCAL_INFO.avatar },
    SET_ROLES: (state, roles) => { state.roles = (roles && roles.length) ? roles : [LOCAL_ROLE] },
    SET_INFO: (state, info) => { state.info = { ...LOCAL_INFO, ...(info || {}) } }
  },

  actions: {
    FetchUserInfo ({ commit }) {
      installLocalSession()
      commit('SET_INFO', LOCAL_INFO)
      return Promise.resolve(LOCAL_INFO)
    },

    GetInfo ({ commit }) {
      installLocalSession()
      commit('SET_TOKEN', LOCAL_TOKEN)
      commit('SET_INFO', LOCAL_INFO)
      commit('SET_NAME', { name: LOCAL_INFO.nickname, welcome: welcome() })
      commit('SET_AVATAR', LOCAL_INFO.avatar)
      commit('SET_ROLES', [LOCAL_ROLE])
      return Promise.resolve(LOCAL_INFO)
    }
  }
}

export default user
