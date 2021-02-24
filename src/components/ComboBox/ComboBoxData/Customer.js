import React from 'react'
import ComboBox from '../ComboBox'

const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    width: 200
  },
  {
    title: 'Description',
    dataIndex: 'name',
    width: 300
  },
]

const config = {
  //field to show in dropdown
  fieldDataName: 'code',
  //field to show description in bottom of dropdown
  fieldDataDescription: 'name',
  //columns to show in table modal
  columns: columns,
}

export default (props) => {
  return <ComboBox {...props} {...config} />
}