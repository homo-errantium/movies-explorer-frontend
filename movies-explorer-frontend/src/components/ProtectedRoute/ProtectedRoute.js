// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...props }) => {
//     return (
//         <Route>
//             {() =>
//                 props.loggedIn ? <Component {...props} /> : <Navigate to='/' />
//             }
//         </Route>
//     );
// };

// export default ProtectedRoute;

import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isLoggedIn }) {
    return isLoggedIn ? <Outlet /> : <Navigate to='/' replace />;
}
