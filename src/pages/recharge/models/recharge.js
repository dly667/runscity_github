/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import moment from 'moment'
import { query} from '../services/recharge'
import { pageModel } from 'utils/model'


const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'recharge',

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
        if (location.pathname === '/recharge') { 
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
        //mock:data.data
        //线上：data.datas.list
        const list = data.data.map((v)=>{
            
              const rda = Math.ceil(Math.random()*10)
              return {...v,avatar:'./../../../../public/avatar/random/'+rda+'.jpg'}
            
        })

        yield put({
          type: 'querySuccess',
          payload: {
            list: list,//data.datas.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,  //mock:data.total//线上：data.datas.total
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
