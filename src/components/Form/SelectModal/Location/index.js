import React from 'react'
import DefaultSelect from '../Default'
import Api from '@/helpers/api';

const api = new Api();


const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    width:100,
    fixed:'left',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: 180,
    fixed:'left',
    className: 'col-overflow',
  },
  {
    title: 'Type',
    dataIndex: 'location_type',
    sorter: true,
    render: (location_type) => (location_type ? `${location_type.code} - ${location_type.description}` : null),
    width: 150,
    className: 'col-overflow',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 350,
    className: 'col-overflow'
  },
  {
    title: 'City',
    dataIndex: 'city',
    width: 150,
  },
  {
    title: 'Province',
    dataIndex: 'province',
    className: 'col-overflow'
  },
]

const config = {
  //api to get select options
  api: api.getMasterLocation,
  //api to get select options by reference id
  apiWithRef: null,
  //if true select require reference id before fetching
  requireRefId: false,
  //field to show in dropdown
  dataName: 'code',
  //field to show description in bottom of dropdown
  dataDescription: 'name',
  //columns to show in table modal
  columns: columns,
}

export default (props)=>{
  return <DefaultSelect {...props} {...config}/>
}