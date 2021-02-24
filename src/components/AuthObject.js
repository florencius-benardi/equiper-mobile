import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setMessage } from '@/actions/auth'

const WithAuthObject = (props) => {
  const { authobject, allow, redirect, children, dispatch} = props
  if(authobject.length>0){
    //find matched authobject
    const ao = authobject.find(i=>i.object===allow)
    // if user have auth object
    if(ao){
      return children
    }else if(redirect){ 
      dispatch(setMessage(allow))
      // redirect if needed
      return <Redirect to="/403"/>
    }
    else{
      // or return no component
      return null
    }
  }
  return null
}

const mapState = (state) => ({
  // user: state.user,
  authobject: state.authobject.data,
})

export default connect(mapState)(WithAuthObject)