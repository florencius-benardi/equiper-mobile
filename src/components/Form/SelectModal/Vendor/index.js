import React from 'react'
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    render: (type) => {
      if (type === 1) {
        return <span>Vendor</span>
      } else {
        return <span>Manufacturer</span>
      }
    },
    sorter: true,
    width: 150
  },
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    width: 150
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: 200
  },
  {
    title: 'Address',
    dataIndex: 'location',
    render: (location) => {
      if (location) { return location.address }
    },
    sorter: true,
    className: 'col-overflow',
    width: 250
  },
]

const config = {
  //api to get select options
  api: api.getMasterVendor,
  //api to get select options with string
  apiName: null,
  //param api for apiName
  apiParam: null,
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
  return <DefaultSelect {...props} {...config} />
}