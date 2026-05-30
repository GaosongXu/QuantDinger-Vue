const LOCAL_USER = Object.freeze({
  id: 1,
  user_id: 1,
  username: 'local',
  nickname: 'Local Admin',
  email: '',
  avatar: '',
  is_demo: false,
  must_change_initial_password: false,
  remaining_credits: null,
  role: { id: 'admin', permissions: ['dashboard', 'admin'] },
  roles: [{ id: 'admin', permissionList: ['dashboard', 'admin'] }]
})

function ok (data = {}) {
  return Promise.resolve({ code: 1, msg: 'ok', data })
}

export function localUserInfo () {
  return { ...LOCAL_USER, role: { ...LOCAL_USER.role }, roles: LOCAL_USER.roles.map(r => ({ ...r })) }
}

export function getUserInfo () {
  return ok(localUserInfo())
}
