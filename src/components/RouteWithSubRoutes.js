import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthObject } from '@/components'

export default function RouteWithSubRoutes(route) {
  // const {name, path, icon, redirect, component, hideChildrenInMenu, ...otherProps} = route
  
  if(route.redirect){
    return(
      <Redirect exact from={route.path} to={route.redirect}/>
    );
  }else 
  
  if(route.component){
    return (
      <Route
        name={route.name}
        breadcrumbName={route.name}
        path={route.path}
        render={props => {
          if(route.authobject){
            return (
              // pass the sub-routes down to keep nesting
              <AuthObject redirect allow={route.authobject}>
                <route.component {...props} routes={route.routes} />
              </AuthObject>
            )
          }
          return (
            <route.component {...props} routes={route.routes} />
          )
        }}
      />
    );
  }else 
    
  if(route.routes){
    //map the children routes
    return handleSubRoute(route)
  }
}

function handleSubRoute(item){
  //map the children routes
  return(
    <Switch key={`item-${item.path}`}>
      {item.routes.map((sub,i)=>{
        // console.log(sub,i)
        if(sub.redirect){
          return(
            <Redirect exact key={`sub-${i}`} from={sub.path} to={sub.redirect}/>
          );
        }else 

        if(sub.component){
          return (
            <Route key={`sub-${i}`}
              name={sub.name}
              breadcrumbName={sub.name}
              path={sub.path}
              render={props => {
                if(sub.authobject){
                  return (
                    // pass the sub-routes down to keep nesting
                    <AuthObject redirect allow={sub.authobject}>
                      <sub.component {...props} routes={sub.routes} />
                    </AuthObject>
                  )
                }
                return (
                  <sub.component {...props} routes={sub.routes} />
                )
              }}
            />
          )
        }

        else if(sub.routes){
          //map the children routes
          return handleSubRoute(sub)
        }
      })}
    </Switch>
  )
}