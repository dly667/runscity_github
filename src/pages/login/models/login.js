import { routerRedux } from 'dva/router'
import { login } from '../services/login'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      
      const data = yield call(login, payload)
 
      const { locationQuery } = yield select(_ => _.app)
     
      if (data.code === 200) {
        //保存Token到sessionStorage
        sessionStorage.setItem("token",data.datas)
        //登录成功后，将手机号码保存到全局app ->state -> adminInfo
        yield put({type:'app/updateState',payload:{
          adminInfo:{
            phone:payload.phone
          }
        }})
        console.log( yield select(_ => _.app),9090);
        const { from } = locationQuery
        yield put({ type: 'app/query',payload:'' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
  },

}
