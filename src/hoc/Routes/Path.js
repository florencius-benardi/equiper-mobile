import { Suspense, lazy } from 'react';

const Login = lazy(() => import('@containers/Login/Login'));

const links = [
    {
        path: '/login',
        component: Login,
        subRoutes: {}
    },
    {
        path: '/',
        component: Login,
        subRoutes: {}
    },
];

export default links;