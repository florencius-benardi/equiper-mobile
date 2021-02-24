import React from 'react';
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    width:80,
    className: 'col-number'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width:370,
  },
]

const config = {
  //api to get select options
  api: api.getMasterMovementType,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'code',
  //field to show description in bottom of dropdown
  dataDescription: 'description',
  //columns to show in table modal
  columns: columns,
  //table width
  scrollX: 1200,
}

export default (props)=>{
  return <DefaultSelect {...props} {...config}/>
}