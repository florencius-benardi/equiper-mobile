import React from 'react'
import { Tag } from 'antd';
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Classification Name',
    dataIndex: 'name',
    sorter: true,
    width: 200
  },
      
  {
    title: 'Parameters',
    dataIndex: 'parameters',
    render: (parameters) => (parameters.map((parameter, i) => (<Tag key={i}>{parameter.name}</Tag>))),
    width: 250
  },
]

const config = {
  //api to get select options
  api: api.getMasterClassificationForWAOnly,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'name',
  //field to show description in bottom of dropdown
  // dataDescription: 'parameters',
  //columns to show in table modal
  columns: columns,
}

export default (props)=>{
  return <DefaultSelect {...props} {...config}/>
}
