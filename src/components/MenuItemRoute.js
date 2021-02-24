import React from 'react'
import { Link } from "react-router-dom";
import { Icon, Menu } from 'antd';
import toUpperFirstChar from 'helpers/toUpperFirstChar'
const SubMenu = Menu.SubMenu

export default function MenuItemRoute(route) {
  console.log(route)
  const {component} = route
  //if route has component
  if(component){
    return (
      <Menu.Item key={route.name} {...route}>
        <a href={`#${route.path}`}>
          <Icon type={route.icon} /><span>{toUpperFirstChar(route.name)}</span>
        </a>
      </Menu.Item>
    )
  }

  //if route doesnt have component but has sub routes
  else if(route.routes){ 
    return(
      <SubMenu {...route}
        key={route.name}
        title={<span><Icon type={route.icon} /><span>{toUpperFirstChar(route.name)}</span></span>}
      >
        {route.routes.map((sub)=>(
          <Menu.Item key={sub.name}><Link to={sub.path}>{toUpperFirstChar(sub.name)}</Link></Menu.Item>
        ))}
      </SubMenu>
    )
  }

  //redirect routing
  else if(route.redirect){ 
    return null 
  }

    
}