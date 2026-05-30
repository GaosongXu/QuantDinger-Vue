import storage from 'store'

const NOTIFICATION_SETTINGS_KEY = 'quantdinger.local.notificationSettings'

function ok (data = {}) {
  return Promise.resolve({ code: 1, msg: 'ok', data })
}

function defaultNotificationSettings () {
  return {
    default_channels: ['browser'],
    telegram_bot_token: '',
    telegram_chat_id: '',
    email: '',
    phone: '',
    discord_webhook: '',
    webhook_url: '',
    webhook_token: ''
  }
}

function readNotificationSettings () {
  const saved = storage.get(NOTIFICATION_SETTINGS_KEY) || {}
  return { ...defaultNotificationSettings(), ...(saved && typeof saved === 'object' ? saved : {}) }
}

export function getNotificationSettings () {
  return ok(readNotificationSettings())
}
