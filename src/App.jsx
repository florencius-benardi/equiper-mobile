import React, { Component, Suspense } from 'react';
import RouteHandler from './hoc/Routes/RoutingHandler';

import { Switch, BrowserRouter } from 'react-router-dom';
import links from './hoc/Routes/Path';
import Spinner from "@components/Spinner/Spinner";

class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Switch>
            {
              links.map((link, i) => (
                <RouteHandler key={i} {...link} />
              ))
            }
          </Switch>
        </BrowserRouter>
      </Suspense>
    );
  }
}

export default Routes;
