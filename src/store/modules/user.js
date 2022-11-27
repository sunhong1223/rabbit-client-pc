// 用户模块
export default {
  // 命名空间: 开启
  namespaced: true,
  // 状态/数据
  state () {
    return {
      // 用户资料
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  // 通过提交 mutation 修改状态/数据
  mutations: {
    // 修改用户资料的mutation
    setProfile (state, payload) { // payload为形参，表示修改后的用户资料
      state.profile = payload
    }
  }
}
