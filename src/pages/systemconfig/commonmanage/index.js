import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import moment from 'moment'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import FormList from './../components/FormList'


const SystemConfig = ({
  location, dispatch, systemonfig, loading, route
}) => {
  const { query, pathname } = location
  // const {
  //   //  pagination
  // } = systemonfig


  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }


  const FormListProps = {

  }


  return (
    <Page inner>
      <FormList {...FormListProps}></FormList>
    </Page>
  )
}

SystemConfig.propTypes = {
  systemonfig: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ systemonfig, loading }) => ({ systemonfig, loading }))(SystemConfig)
