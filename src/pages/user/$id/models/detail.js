import pathToRegexp from 'path-to-regexp'
import queryString from 'query-string'
import { query ,usersQuery} from '../../services/user'


export default {

  namespace: 'userDetail',

  state: {
    data: [
      {
        MemberName:'',
        PhoneArea:'',
        Balance:'',
        Zsb:''
      }
    ],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname ,query}) => {

        const match = pathToRegexp('/user/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'query', payload: { query: match[1] } })
          const urlParams = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({ type:'transaction/query',payload:{uid:query.id,...urlParams}})
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(usersQuery, payload)
      const {
        success, message, status, ...other
      } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other.datas,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
