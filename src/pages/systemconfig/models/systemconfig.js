import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { fundsDetails } from './../services/funds'

import queryString from 'query-string'
import { config } from 'utils'
import moment from 'moment'
import { pageModel } from 'utils/model'
import * as systemconfigService from '../services/systemconfig'

import { routerRedux } from 'dva/router'
const { query, create ,remove ,update} = systemconfigService
const { prefix } = config
export default modelExtend(pageModel, {
  namespace: 'systemconfig',
  state: {
    confirmDirty: false,
    autoCompleteResult: [],
    LatitudeLongitude: {

    },
    selectedAddr: '',
    selectedRowKeys: [],

    currentItem: {},
    modalVisible: false,
    modalType: 'create',



    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',

    LalModalVisible: false,
    LalModalType: 'create',

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {

        const match = pathToRegexp('/systemconfig/gymmanage').exec(pathname)

        if (match) {

          const urlParams = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          
          dispatch({
            type: 'query',
            payload: {
              urlParams,
              // query,
              // pathname
            }
          })
        }


      })
    },
  },

  effects: {


    * query({
      payload,
    }, { call, put }) {
      
      const data = yield call(query, payload.urlParams)
     
      const {
        success, message, status, ...other
      } = data
      if (success) {
        //处理接口数据以匹配table表格
        let temp = other.datas.list.map((value) => {
          let Obj 
          try {
            Obj = JSON.parse(value.Intro)
          } catch (e) {
          
            
          }
          //时间戳
          return {
            ...value,
            ...Obj,
            AddTime:moment.unix(value.AddTime).format("YYYY-MM-DD HH:mm")
          }
        })
        
        
        //结束处理
        
        yield put({
          type: 'querySuccess',
          payload: {
            data: temp,
            pagination: {
              current: Number(payload.urlParams.page) || 1,
              pageSize: Number(payload.urlParams.pageSize) || 10,
              total: other.datas.total,
            },
          },
        })
      } else {
        throw data
      }
    },
    * delete({ payload }, { call, put, select }) {

      const data = yield call(remove, { id: payload })

      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },

    * multiDelete({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    * create({ payload }, { call, put }) {

      //处理数据以匹配接口字段
      let temp = {
        chain_name: payload.chain_name,
        lat: payload.LatitudeLongitude.lat,
        lng: payload.LatitudeLongitude.lng,
        city:payload.city,
        intro: JSON.stringify({
          Phone: payload.Phone,
          Address: payload.Address,
          Principal: payload.Principal
        }),//`Phone:${payload.Phone},Address:${payload.Address},Principal:${payload.Principal}`,
        open_time: ''//暂时为空
      }
      payload = temp
      //结束处理
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * update({ payload }, { select, call, put }) {
      //处理数据以匹配接口字段
      let temp = {
        id:payload.id,
        chain_name: payload.chain_name,
        lat: payload.LatitudeLongitude.lat,
        lng: payload.LatitudeLongitude.lng,
        city:payload.city,
        intro: JSON.stringify({
          Phone: payload.Phone,
          Address: payload.Address,
          Principal: payload.Principal
        }),//`Phone:${payload.Phone},Address:${payload.Address},Principal:${payload.Principal}`,
        open_time: ''//暂时为空
      }
      payload = temp
      //结束处理
    
      const data = yield call(update,payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    // showModal (state, { payload }) {
    //   return { ...state, ...payload, modalVisible: true }
    // },
    querySuccess(state, { payload }) {
      const { data, pagination } = payload
      return {
        ...state,
        list: data,
        pagination
      }
    },
    showModal(state, { payload }) {

      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion(state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

    LalShowModal(state, { payload }) {

      return { ...state, ...payload, LalModalVisible: true }
    },

    LalHideModal(state) {
      return { ...state, LalModalVisible: false }
    },

    //重置地图经纬度选择器
    resetLalModal(state) {
      return { ...state, LatitudeLongitude: {}, selectedAddr: '' }
    }



  },
})
