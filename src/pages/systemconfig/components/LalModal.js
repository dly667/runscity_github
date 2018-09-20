import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Button } from 'antd'
import city from 'utils/city'
import Style from './LalModal.less'
import Map from './Map'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}


const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  onSelectMapLal,
  ...LalModalProps,

}) => {
  const handleOk = () => {
    // validateFields((errors) => {
    //   if (errors) {
    //     return
    //   }
    //   const data = {
    //     ...getFieldsValue(),
    //     key: item.key,
    //   }
    //   data.address = data.address.join(' ')
    //   onOk(data)
    // })
    onOk()
  }
  const modalOpts = {
    ...LalModalProps,
    onOk: handleOk,
  }

  const { LalonClick, LatitudeLongitude, selectedAddr } = LalModalProps

  //使用ES6的Object.keys()方法
  return (
    <Modal {...modalOpts}>
      {/* <div id="container" style={{ width: "300px", height: "540px" }}></div> */}

      <Map onSelectMapLal={onSelectMapLal}></Map>

      <div className={Style.divContent}>
        <p><span>当前选中的经纬度: </span>  {Object.getOwnPropertyNames(LatitudeLongitude).length != 0 ? (LatitudeLongitude.lng + ',' + LatitudeLongitude.lat) : '请选择'}</p>
        <p><span>当前选中的地址:   </span>{selectedAddr!= ''?selectedAddr:'请选择'}</p>
      </div>
    </Modal>
  )
}

modal.propTypes = {

}

export default Form.create()(modal)
