/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import moment from 'moment'
import { create, remove, update } from '../services/user'
import * as usersService from '../services/users'
import { pageModel } from 'utils/model'

const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
     
      history.listen((location) => {
        if (location.pathname === '/user') { 
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
    
      const data = yield call(query, payload)
      if (data) {
        //设置语言
        moment.locale('zh-CN')
        const list = data.datas.list.map((v)=>{
            if(v.user.AddTime){
              const rda = Math.ceil(Math.random()*10)
              return {balance:v.balance,...v.user,AddTime:moment.unix(v.user.AddTime).format('YYYY-MM-DD HH:mm:ss'),avatar:v.user.Avatar?v.user.Avatar:''}
            }
        })
        console.log(list)

        
        yield put({
          type: 'querySuccess',
          payload: {
            list: list,//data.datas.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.datas.total,
            },
          },
        })

      }else{
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
