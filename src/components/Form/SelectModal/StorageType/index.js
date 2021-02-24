import React from 'react'
import DefaultSelect from '../Default'

const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    width: 200
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 300
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
  dataName: 'code',
  //field to show description in bottom of dropdown
  dataDescription: 'description',
  //columns to show in table modal
  columns: columns,
}

export default (props) => {
  return <DefaultSelect {...config} {...props} />
}