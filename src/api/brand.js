import request from '@/utils/request'

/**
 * Fetch public branding / legal / contact configuration.
 *
 * The endpoint is public so shell, sidebar and legal modals can load it
 * immediately. Backend reads BRAND_* / MOBILE_APP_* env
 * vars; empty values fall back to the bundled defaults.
 */
export function getBrandConfig () {
  return request({
    url: '/api/settings/brand-config',
    method: 'get'
  })
}
