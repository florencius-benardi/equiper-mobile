import React from 'react'
import DefaultSelect from '../Default'
import Api from '@/helpers/api';
import NumberFormat from 'react-number-format';
const api = new Api();


const columns = [
  // {
  //   title: 'Type',
  //   dataIndex: 'type',
  //   render: (type) => {
  //     if (type === 1) { 
  //       return <span>Vendor</span>
  //     }else{
  //       return <span>Manufacturer</span>
  //     }
  //   },
  //   sorter: true,
  //   width:150
  // },
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    width:150
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width:200,
    className: 'col-overflow',
  },
  {
    title: 'Valuation Price',
    dataIndex: 'unit_price',
    render: (unit_price) => {
      // if (unit_price) { 
      return <NumberFormat value={unit_price} decimalScale={2} thousandSeparator={true}  displayType={'text'} fixedDecimalScale={true}/>
      // }
    },
    sorter: true,
    width:150,
    className: 'col-number',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    sorter: true,
    width:150,
  },
  // {
  //   title: 'Address',
  //   dataIndex: 'location',
  //   render: (location) => {
  //     if (location) { return location.address }
  //   },
  //   sorter: true,
  //   className: 'col-overflow',
  //   width:250
  // },
]

const config = {
  //api to get select options
  api: null,
  //api to get select options by reference id
  apiWithRef: api.getPreveredVendor,
  //if true select require reference id before fetching
  requireRefId: true,
  //field to show in dropdown
  dataName: 'code',
  //field to show description in bottom of dropdown
  dataDescription: 'description',
  //columns to show in table modal
  columns: columns,
}

export default (props)=>{
  return <DefaultSelect {...config} {...props} />
}