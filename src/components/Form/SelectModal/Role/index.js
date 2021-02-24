import React from 'react'
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width:'50%'
  },
  {
    title: 'Total Auth Object',
    dataIndex: 'total_auth_object',
    className: 'col-number',
    // width: '30%'
  },
]

const config = {
  //api to get select options
  api: api.getMasterRole,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'name',
  //field to show description in bottom of dropdown
  dataDescription: 'name',
  //columns to show in table modal
  columns: columns,
}

export default (props)=>{
  return <DefaultSelect {...props} {...config}/>
}