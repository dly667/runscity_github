import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './../components/List'
import Filter from './../components/Filter'
import Modal from './../components/Modal'
import systemconfig from '../models/systemconfig';
import LalModal from './../components/LalModal'


const Gymmanage = ({
  location, dispatch, systemconfig, loading, route
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, LalModalVisible, LalModalType,
  } = systemconfig
  console.log('currentItem:',currentItem)
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const modalProps = {
    
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['systemconfig/update'],
    title: `${modalType === 'create' ? '新增健身房' : '更新健身房信息'}`,
    wrapClassName: 'vertical-center-modal',
    LatitudeLongitude:systemconfig.LatitudeLongitude,
    selectedAddr:systemconfig.selectedAddr,
    onOk(data) {
      data = {...data,LatitudeLongitude:systemconfig.LatitudeLongitude}

      dispatch({
        type: `systemconfig/${modalType}`,
        payload: data,
      })
        .then(() => {
          //清空当前经纬度
          dispatch({
            type: `systemconfig/resetLalModal`,
          })
          handleRefresh()
        })
    },
    onCancel() {
      dispatch({
        type: 'systemconfig/hideModal',
      })
      dispatch({
        type: `systemconfig/resetLalModal`,
      })
    },
    LalonClick() {

      dispatch({
        type: 'systemconfig/LalShowModal',
        payload: {
          LalModalType: 'create',
        },
      })
    },

  }
  //嵌套经纬度地图选择modal
  const LalModalProps = {
    // LalModalVisible,
    // LalModalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: LalModalVisible,
    width:'700px',
    maskClosable: false,
    confirmLoading: loading.effects['systemconfig/update'],
    title: `${modalType === 'create' ? '选择经纬度' : '选择经纬度'}`,
    wrapClassName: 'vertical-center-modal',
    LatitudeLongitude:systemconfig.LatitudeLongitude,
    selectedAddr:systemconfig.selectedAddr,
    onOk(data) {
      dispatch({
        type: 'systemconfig/LalHideModal',
      })
      // dispatch({
      //   type: `systemconfig/${modalType}`,
      //   payload: data,
      // })
        // .then(() => {
        //   // handleRefresh()
         
        // })
    },
    onCancel() {
      dispatch({
        type: 'systemconfig/LalHideModal',
      })
    },
    onSelectMapLal(payload){
      dispatch({
        type: 'systemconfig/updateState',
        payload
      })
    }
     
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['systemconfig/query'],
    pagination,
    location,
    isMotion,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem(id) {
   
      dispatch({
        type: 'systemconfig/delete',
        payload: id,
      })
        .then(() => {

          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem(item) {
      console.log("onEditItem")
      dispatch({
        type: 'systemconfig/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'systemconfig/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onAdd() {

      dispatch({
        type: 'systemconfig/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'systemconfig/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'systemconfig/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
      .then(() => {
        handleRefresh({
          page: (list.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
  }
  
  return (
    <Page inner>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>移除</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {LalModalProps.visible && <LalModal {...LalModalProps} />}
    </Page>
  )
}

Gymmanage.propTypes = {
  systemconfig: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ systemconfig, loading }) => ({ systemconfig, loading }))(Gymmanage)
