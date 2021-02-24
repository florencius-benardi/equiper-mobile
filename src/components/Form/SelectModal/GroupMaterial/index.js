import React from 'react'
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Material Group',
    dataIndex: 'material_group',
    sorter: true,
    width:200
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 250
  },
]

const config = {
  //api to get select options
  api: api.getMasterGroupMaterial,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'material_group',
  //field to show description in bottom of dropdown
  dataDescription: 'description',
  //columns to show in table modal
  columns: columns,
}

export default (props)=>{
  return <DefaultSelect {...props} {...config}/>
}