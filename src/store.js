import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
import mutations from './store/mutations.js'
import * as actions from './store/actions'
import * as getters from './store/getters'
// 修改state时 console.log
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 调试工具，检测state是否是通过mutation修改
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
