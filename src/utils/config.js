
const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

// const cal = 'cal/'

// const indexUrl = ['http://localhost:8000','']
const indexUrl = ['http://localhost:8000','http://103.80.27.159','']
const apiUrl = ['http://localhost:8000'+APIV1,'http://api.runscity.com/microapi','']
// 开发模式 0 ，生产模式 1
const mode = 0
// const mode = 1

module.exports = {
  name: '跑棒后台',
  prefix: 'antdAdmin',
  footerText: 'Run  © 2018 跑棒',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: ['http://api.runscity.com'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${apiUrl[mode]}/v1/adminrun/User/Login`,
    // userLogout: `${APIV1}/${cal}User/Logout`,
    userInfo: `${apiUrl[mode]}/userInfo`,
    users: `${apiUrl[mode]}/v1/adminrun/Member/GetList`,
    user: `${apiUrl[mode]}/v1/adminrun/Member/GetList`,
    //健身房管理
    gymList: `${apiUrl[mode]}/v1/adminrun/Gym/List`,
    gymAdd: `${apiUrl[mode]}/v1/adminrun/Gym/Add`,
    gymDel: `${apiUrl[mode]}/v1/adminrun/Gym/Del`,
    gymUpdate: `${apiUrl[mode]}/v1/adminrun/Gym/Add`,
    
    //菜单管理
    menus: `${indexUrl[mode]}/menu.json`,
    weather: `${indexUrl[mode]}${APIV1}/weather`,
    v1test: `${indexUrl[mode]}${APIV1}/test`,
    v2test: `${indexUrl[mode]}${APIV2}/test`,
    // zbTotal: `${APIV1}/${cal}admin/v1/Member/ZbTotal`,
    //访问mock数据
    recharge: `${APIV1}/recharge`,
    posts: `${APIV1}/posts/test`,
    dashboard: `${APIV1}/dashboard`,
    fundsDetail:`${APIV1}/fundsDetail`,
    gymManage:`${APIV1}/systemconfig/gymManage`,
  },
}
