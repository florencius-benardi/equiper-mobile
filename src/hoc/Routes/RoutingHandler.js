/* eslint-disable array-callback-return */
import React from 'react';
import { } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

const RouteHandler = (link) => {
    if (link.redirect) {
        return (
            <Redirect exact from={link.path} to={link.redirect} />
        );
    }
    else if (link.component) {
        return (
            <Route
                name={link.name}
                breadcrumb={link.name}
                path={link.path}
                render={props => { return (<link.component {...props} subroutes={link.subRoutes} />) }}
            />
        );
    }

    // else if (link.subRoutes)
    //     return SubRouteHandler(link);

}

// const SubRouteHandler = (link) => {
//     return (
//         <Switch key={`item-${link.path}`} >
//             {
//                 link.subRoutes.map((sub, i) => {
//                     if (link.redirect)
//                         return (
//                             <Redirect exact key={`sub-${i}`} from={sub.path} to={sub.redirect} />
//                         );
//                     else if (link.component)
//                         return (
//                             <Route
//                                 name={sub.name}
//                                 breadcrumb={sub.name}
//                                 path={sub.path}
//                                 render={props => { return (<sub.component {...props} subroutes={sub.subRoutes} />) }}
//                             />
//                         );
//                     else
//                         return SubRouteHandler(sub);
//                 })
//             }
//         </Switch >
//     )

// }

export default RouteHandler;