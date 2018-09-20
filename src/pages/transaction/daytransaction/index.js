import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import moment from 'moment'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './../components/List'
import Filter from './../components/Filter'
import Modal from './../components/Modal'


const Transaction = ({
  location, dispatch, transaction, loading, route
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    fundsData, pagination
  } = transaction
 

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  // const tabledemodata = fundsData.list ? fundsData.list.map((item, key) => {
  //   return {
  //     key: key,
  //     MemberName: item.user.MemberName,
  //     ZType: item.ra.ZType,
  //     AType: item.ra.AType,
  //     Amount: item.ra.Amount,
  //     AddTime: moment.unix(item.ra.AddTime).format('YYYY-MM-DD HH:mm:ss'),
  //   }
  // }) : []

  const listProps = {
    dataSource: fundsData,
    loading: loading.effects['user/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  }

  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange(value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }


  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}

Transaction.propTypes = {
  transaction: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ transaction, loading }) => ({ transaction, loading }))(Transaction)
