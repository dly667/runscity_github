import modelExtend from 'dva-model-extend'
import { query } from '../services/posts'
import { pageModel } from 'utils/model'
import queryString from 'query-string'

export default modelExtend(pageModel, {

  namespace: 'post',

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        console.log(location.pathname)
        if (location.pathname === '/post') {
          dispatch({
            type: 'query',
            payload: {
              status: 2,
              ...queryString.parse(location.search),
            },
          })
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      console.log(query,11)
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },
  },
})
