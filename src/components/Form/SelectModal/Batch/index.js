import React from 'react'
import DefaultSelect from '../Default'

// const api = new Api();


const columns = [
  {
    title: 'Batch Number',
    dataIndex: 'batch_number',
    sorter: true,
    width:150
  },
  {
    title: 'GR Date',
    dataIndex: 'gr_date',
    sorter: true,
    width:200
  },
  {
    title: 'Manufacture Date',
    dataIndex: 'manuf_date',
    sorter: true,
    width:250
  },
  {
    title: 'Expiry Date',
    dataIndex: 'sled_date',
    sorter: true,
    width:250
  },
]

const config = {
  //api to get select options
  api: null,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'batch_number',
  //field to show description in bottom of dropdown
  dataDescription: 'description',
  //columns to show in table modal
  columns: columns,
}

export default (props)=>{
  return <DefaultSelect  {...config} {...props}/>
}