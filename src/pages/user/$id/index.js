import React from 'react'
import router from 'umi/router'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import queryString from 'query-string'
import styles from './index.less'
import { Card, Form, Input, Button, Table } from 'antd'

const Detail = (props) => {
  const { userDetail, transaction, location, dispatch, loading } = props
  const { data } = userDetail
  const { fundsData, pagination } = transaction
  const { query, pathname } = location
 
  const user = data.list ? data.list[0] : []



  const handleSubmit = () => {
    console.log('handle')
  }
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))

  }
  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const buttonLayout = {
    wrapperCol: { span: 14, offset: 4 },
  }

  const { getFieldDecorator } = props.form;

  const listProps = {
    // loading: loading.effects['transaction/query'],
    onChange(page) {

      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  }

  //开始
  const columns = [{
    title: '用户名',
    dataIndex: 'MemberName',
    key: 'MemberName'

    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
    // sorter: (a, b) => a.name.length - b.name.length,
  }, {
    title: '操作类型',
    dataIndex: 'ZType',
    key: 'ZType',
    filters: [{
      text: '藏宝',
      value: 'cb',
    }, {
      text: '寻宝',
      value: 'xb',
    }, {
      text: '转入',
      value: 'trans_in',
    }, {
      text: '转出',
      value: 'trans_out',
    }, {
      text: '卖出',
      value: 'sale',
    }, {
      text: '买入',
      value: 'buy',
    }, {
      text: '买入超币',
      value: 'buy-cb',
    }, {
      text: '卖出超币',
      value: 'sale-cb',
    }],
    defaultSortOrder: 'descend',
    onFilter: (value, record) => record.ZType.indexOf(value) === 0,
    // sorter: (a, b) => a.age - b.age,
    render:(text,record)=>{
 
      switch(text){
        case 'cb':return "藏宝"
        case "xb":return "寻宝"
        case "trans_in":return "转入"
        case "trans_out":return "转出"
        case "sale":return "卖出"
        case "buy":return "买入"
        case "but-cb":return "买入超币"
        case "sale-cb":return "卖出超币"
      }
    }
  },
  {
    title: '超币/美金',
    dataIndex: 'AType',
    key: 'AType',
    filters: [{
      text: '美金',
      value: '2',
    }, {
      text: '超币',
      value: '1',
    }],
    // filterMultiple: false,
    onFilter: (value, record) => record.AType.toString().indexOf(value) === 0,
    render:(text,record)=>{
 
      switch(text){
        case 1:return "超币"
        case 2:return "美金"
      }
    }
  }, {
    title: '变动金额',
    dataIndex: 'Amount',
    key: 'Amount',
  }, {
    title: '变动后余额',
    dataIndex: 'address2',
    key: 'address2',
    filters: [{
      text: 'London',
      value: 'London',
    }, {
      text: 'New York',
      value: 'New York',
    }],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
  }];


  const tabledemodata = fundsData.list ? fundsData.list.map((item,key) => {
    return {
      key:key,
      MemberName: item.user.MemberName,
      ZType: item.ra.ZType,
      AType: item.ra.AType,
      Amount: item.ra.Amount,
    }
  }) : []



  function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter)
  }

  //结束
  return (<div className="content-inner">
    <div className={styles.content}>
      <Card title="用户信息" style={{ width: "auto", height: "100%" }}>
        <Button onClick={() => router.goBack()}>返回</Button>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "30px",marginTop:"20px",fontSize:"1.3em" }}>
          <p>用户名：{user.MemberName}</p>
          <p>联系方式：{user.PhoneArea + user.Phone}</p>
          <p>美金余额：{user.Balance}</p>
          <p>超币余额：{user.Zsb}</p>
        </div>

      </Card>
      <Card title="资金明细" style={{ width: "auto", height: "100%", margin: "15px 0" }}>
        <Table columns={columns} dataSource={tabledemodata}  {...listProps} pagination={pagination} />
      </Card>
    </div>
  </div>)
}

Detail.propTypes = {
  userDetail: PropTypes.object,
}

export default connect(({ userDetail, transaction, loading }) => ({ userDetail, transaction, loading: loading.models.userDetail }))(Form.create()(Detail))
