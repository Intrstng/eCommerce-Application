import { createBrowserRouter, Navigate, Outlet, RouteObject } from "react-router-dom";
import { PATH } from '../enums';
import { App } from 'app/ui/App';


export const PrivateRoutes = () => {
  const isAuth = true; // Temporary solution
  return isAuth ? <Outlet/> : <Navigate to={PATH.LOGIN}/>
};

const publicRoutes: RouteObject[] = [

]

const privateRoutes: RouteObject[] = [

]

export const router = createBrowserRouter([
  {
    path: PATH.PAGE_ROOT,
    element: <App/>,
    errorElement: <Navigate to={PATH.ERROR}/>,
    children: [
      {
        index: true, // to pass to main page automatically when root url '/' is entered
        element: <Navigate to={PATH.MAIN} />,
      },
      {
        element: <PrivateRoutes/>,
        children: privateRoutes,
      },
      ...publicRoutes,
    ]
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
});