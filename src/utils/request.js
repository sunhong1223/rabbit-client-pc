// 1. 创建一个新的axios实例
// 2. 请求拦截器：如果有token进行头部携带
// 3. 响应拦截器：① 剥离无效数据；② 处理token失效
// 4. 导出一个函数，调用当前的axios实例发请求，返回值promise

// 安装axios：执行终端命令 npm i axios --legacy-peer-deps
// 导入axios
import axios from 'axios'
// 导入vuex的store仓库
import store from '@/store'
// 导入路由
import router from '@/router'
// 导出基准地址。原因：其他地方不是通过axios发请求的地方使用基准地址
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
// 1. 创建一个新的axios实例
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 2. 请求拦截器
instance.interceptors.request.use(config => { // config 请求配置
  // 在发送请求之前做什么 -- 如果本地有token就在请求头携带
  // 2.1 获取用户资料
  const { profile } = store.state.user
  // 2.2 判断是否有token
  if (profile.token) {
    // 2.3 请求头设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 3. 响应拦截器
instance.interceptors.response.use(response => response.data, error => { // axios默认加了一层data，response.data获取服务器返回的数据对象
  // 对响应错误做点什么 -- 401 状态码，进入该函数
  if (error.response && error.response.status === 401) { // 有响应且状态码是401，排除无响应情况
    // 3.1 清空无效用户资料
    store.commit('user/setProfile', {}) // 提交vuex中user模块中修改用户资料的mutation即setProfile函数，同时传参{}
    // 3.2 跳转到登录页，跳转需要传参(当前路由地址)给登录页
    // 获取当前路由地址：
    // 组件中：如`/user?id=01&name=JJ`   $route.path === /user   $route.fullPath === /user?id=01&name=JJ
    // js模块中：router.currentRoute.value.fullPath // Router属性currentRoute 表示当前路由地址，只读。因为router.currentRoute是ref响应式对象，所以加.value
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath) // URL编码函数encodeURIComponent()对url进行编码
    router.push('/login?redirectUrl=' + fullPath) // fullPath需要进行URL编码
  }
  return Promise.reject(error)
})

// 4. 请求工具函数
export default (url, method, submitData) => {
  // 发送axios请求
  instance({
    url,
    method,
    // 如果是get请求，需要使用params传递submitData 查询参数
    // 如果不是get请求，需要使用data传递submitData 请求体参数
    // [] 设置动态的key，应为表达式，表达式执行结果当作key
    // method可能为get/Get/GET，需要转换成小写get后再判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
