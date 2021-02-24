import React from 'react';
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Reason',
    dataIndex: 'reason',
    sorter: true,
  },
]

const config = {
  //api to get select options
  api: null,
  //api to get select options by reference id
  apiWithRef: api.getReasonByMovementType,
  //if true select require reference id before fetching
  requireRefId: true,
  //field to show in dropdown
  dataName: 'reason',
  //field to show description in bottom of dropdown
  dataDescription: 'description',
  //columns to show in table modal
  columns: columns,
}

export default (props)=>{
  return <DefaultSelect {...props} {...config}/>
}