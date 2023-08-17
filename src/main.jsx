import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// component
// import Merchandise from './Components/Merchandise';
// import Page from './Components/Tire/Page';
import Home from './Components/Home';
import Tire from './Components/Tire/index';
import Spec from './Components/Tire/Spec';
import Record from './Components/Record/index';
import Csv from './Components/Csv/index';
import Backend, { action as backendAction } from './Components/Backend/index';

// erro page
import ErrorPage from "./error-page";

// scss index
import './assets/css/index.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        // path: "/merchandise",
        // element: <Merchandise />,
        // errorElement: <ErrorPage />,
        // children: [
        //   {
        //     path: "page/:pageN",
        //     element: <Page />,
        //   }
        // ]
      },
      {
        path: "/tire",
        element: <Tire />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":area/spec/:inch",
            element: <Spec />,
          }
        ]
      },
      {
        path: "/record",
        element: <Record />,
        errorElement: <ErrorPage />,
        // children: [
        //   {
        //     path: ":area/spec/:inch",
        //     element: <Spec />,
        //   }
        // ]
      },
      {
        path: "/csv",
        element: <Csv />,
        errorElement: <ErrorPage />,
      }
    ]
  },
  {
    path: "/backend",
    element: <Backend />,
    errorElement: <ErrorPage />,
    action: backendAction,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);