import Vue from 'vue'

/**
 * Action directive retained for template compatibility.
 * Account-free local mode does not hide controls by per-user permissions.
 */
const action = Vue.directive('action', {
  inserted: function () {}
})

export default action
