import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import routes from 'routes'

//get app home routes
let breadcrumbNameMap = []
let mainRoute = routes.find(item=>(item.path==='/'))
filterRouteBreadcrumb(mainRoute).forEach(item=>{
  breadcrumbNameMap.push({url:item.path, name:item.breadcrumbName}) 
  handleSubRoute(item);
})

//filter only routes that have breadcrumbName
function filterRouteBreadcrumb(route){
  return route.routes.filter((item)=>item.breadcrumbName!=null)
}
//handle subroute
function handleSubRoute(route){
  if(route.routes){
    route.routes.filter((item)=>item.breadcrumbName!=null).forEach((item)=>{
      breadcrumbNameMap.push({url:item.path, name:item.breadcrumbName})
    })
  }
}

// console.log(breadcrumbNameMap)

const BreadcrumbComponent = (props)=>{
  // console.log(props)
  const { location } = props.router;
  const pathname = location.hash.replace(/^#/g,'')
  const pathSnippets = pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const breadcrumbName = breadcrumbNameMap.find(b=>(b.url===url.replace(/\d+/,':id')))
    const name = breadcrumbName ? breadcrumbName.name : null
      
    if(!name){return null}

    if(index===(pathSnippets.length-1)){
      return(
        <Breadcrumb.Item key={url}>
          {name}
        </Breadcrumb.Item>
      )
    }

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {name}
        </Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [(
    <Breadcrumb.Item key="home">
      <Link to="/"><Icon type="home"/></Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);
    
  return(
    <Breadcrumb style={{marginBottom:'0.5rem'}}>
      {breadcrumbItems}
    </Breadcrumb>
  )
}

const mapStateToProps = (state) => ({
  router: state.router
})


export default connect(mapStateToProps)(BreadcrumbComponent)