import React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { sitePathConfig } from '../constants/sitePathConfig';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import LoginPage from '../containers/account/LoginPage';
import ProfilePage from '../containers/account/ProfilePage';

// import DashBoard from '../containers/Dashboard';
import UserAdminListPage from '../containers/users/UserAdminListPage';

import NotFound from '../compoments/common/NotFound';
import Forbidden from '../containers/Forbidden';
import OrganizeListPage from "../containers/organize/OrganizeListPage";
// import ErrorServer from '../containers/ErrorServer';
// import Layout from '../components/layout/Layout';

const RootRoute = () => {
    const {
        admin,
        login,
        profile,
        forbidden,
        organization,
    } = sitePathConfig;

    return (
        <BrowserRouter>
            <Switch>
                {/* <Redirect exact from="/" to="/delivery/deliveryorder"/>
                {
                    routes.map((MyRoute, index) => ({...MyRoute, key: index}))
                } */}
                <Redirect exact from="/" to={admin.path}/>
                <PublicRoute exact path={login.path} component={LoginPage} />
                <PrivateRoute exact path={profile.path} component={ProfilePage}/>
                <PrivateRoute exact path={admin.path} component={UserAdminListPage}/>
                <PrivateRoute exact path={organization.path} component={OrganizeListPage}/>
                {/* Error Page */}
                <PrivateRoute exact path={forbidden.path} component={Forbidden}/>
                {/* <Route exact path="/error" component={ErrorServer} /> */}
                
                {/* 404 Page */}
                <PublicRoute component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default RootRoute;
