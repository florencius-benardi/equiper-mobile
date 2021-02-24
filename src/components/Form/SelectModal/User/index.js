import React from 'react'
import { Icon } from 'antd';
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => {
      if (status !== 1) {
        return (<Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />)
      }
      else {
        return (<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: '20px' }} />)
      }
    },
    width: 80,
    className: 'col-center',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: 200
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 250
  },
]

const config = {
  //api to get select options
  api: api.getAllUsers,
  //api to get select options with string
  apiName: null,
  //param api for apiName
  apiParam: null,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'name',
  //field to show description in bottom of dropdown
  dataDescription: 'email',
  //columns to show in table modal
  columns: columns,
}

export default (props) => {
  return <DefaultSelect {...props} {...config} />
}