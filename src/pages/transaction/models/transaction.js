import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { fundsDetails } from './../services/funds'
import queryString from 'query-string'
import { config } from 'utils'
import moment from 'moment'
import { pageModel } from 'utils/model'
import * as usersService from '../services/users'

import { routerRedux } from 'dva/router'
const { query } = usersService
const { prefix } = config
export default modelExtend(pageModel, {
  namespace: 'transaction',
  state: {
    fundsData: [],
    id: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/transaction/daytransaction').exec(pathname)
        if (match) {
          const urlParams = queryString.parse(location.search) || { page: 1, pageSize: 10 }

          dispatch({
            type: 'getTransactionById',
            payload: {
              urlParams,
              query, 
              pathname
            }
          })
        }
      })
    },
  },

  effects: {
    * getTransactionById({
      payload
    }, { call, put, select }) {
    
      if(payload.urlParams.query !== undefined){
        const data = yield call(query, { query :payload.urlParams.query} )
        const { pathname } = payload
        if (data.datas.list.length!==0) {
          yield put({
            type: 'query',
            payload: { uid: data.datas.list[0].ID, ...payload.urlParams }
          })
  
        }else{
          throw '找不到此用户'
        }
      }else{
        yield put({
          type: 'query',
          payload: {  ...payload.urlParams }
        })
      }
  
    },

    * query({
      payload,
    }, { call, put }) {

      const data = yield call(fundsDetails, payload)

      const {
        success, message, status, ...other
      } = data
      if (success) {
        console.log(other.datas)
        yield put({
          type: 'querySuccess',
          payload: {
            data: other.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: other.total,
            },
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data, pagination } = payload
      return {
        ...state,
        fundsData: data,
        pagination
      }
    },
  },
})
