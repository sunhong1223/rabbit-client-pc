import { createStore } from 'vuex'

// 导入模块
import cart from '@/store/modules/cart'
import user from '@/store/modules/user'
import category from '@/store/modules/category'

// vue2.0 new Vuex.Store({}) 创建仓库
// vue3.0 createStore({}) 创建仓库
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    user,
    category
  }
})
