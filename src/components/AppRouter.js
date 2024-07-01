import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {routes} from "../routes";
import AccessDenied from "../pages/Common/AccessDenied";


const AppRouter = () => {
    const isAuth = true;
    return (
        <Routes>
            {!isAuth ?
                <Route path={'/'} element={<AccessDenied/>}/>
            :
                routes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} exact/>
                )
            }
        </Routes>
    );
};

export default AppRouter;
