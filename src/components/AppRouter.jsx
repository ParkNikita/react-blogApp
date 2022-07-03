import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';

import { privateRoutes, publicRoutes } from '../router';


const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)
    console.log(isAuth)
    return (
        <div>
            {isAuth 
            ?
            <Routes>
                {privateRoutes.map(route=>
                    <Route
                    path={route.path}
                    element={route.component}
                    exact={route.exact}
                    key={route.path}
                    />
                )}
            </Routes> 
            :
            <Routes>
                {publicRoutes.map(route=>
                    <Route
                    path={route.path}
                    element={route.component}
                    exact={route.exact}
                    key={route.path}
                    />
                )}
            </Routes>     
            }
           
        </div>
    );
};

export default AppRouter;

