import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Signin = lazy(() => import('./user/Signin'));
const Signup = lazy(() => import('./user/Signup'));
const Displayflow = lazy(() => import('./user/Displayflow'));
const Home = lazy(() => import('./core/Home'));
const NotFound = lazy(() => import('./core/Notfound'));
const PrivateRoute = lazy(() => import('./auth/PrivateRoute'));
const Leaderboard = lazy(() => import('./user/Leaderboard'));
const ShowLeader = lazy(() => import('./user/ShowLeader'));
const Routes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div style={{ backgroundColor: 'rgba(5, 0, 255, 0.4)',height:'100vh' }}>
                <h1 style={{ color: '#131D5A' }}>Loading...</h1>
            </div>}>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/signin" exact component={Signin}></Route>
                    <Route path="/signup" exact component={Signup}></Route>
                    <PrivateRoute path="/display/:id" exact component={Displayflow}></PrivateRoute>
                    <PrivateRoute path="/leaderboard" exact component={Leaderboard}></PrivateRoute>
                    <PrivateRoute path="/leaderboard/:id" exact component={ShowLeader}></PrivateRoute>
                    <Route component={NotFound} ></Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default Routes;