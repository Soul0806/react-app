import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// component
import Home from './routes/Home';
import Merchandise from './routes/Merchandise';
import Tire from './routes/tire/Tire';
import Spec from './routes/Tire/Spec';
import Record from './routes/Tire/Record';
import CSV from './routes/CSV/csv';
import Page from './routes/Page';
import Backend, { action as backendAction } from './routes/backend/Backend';

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
        path: "/merchandise",
        element: <Merchandise />,
        errorElement: <ErrorPage />,
        children: [
          {  
            path: "page/:pageN",
            element: <Page />,
          }
        ]
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
        element: <CSV />,
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