import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Product, { action as productAction } from './routes/Product';
import { loader as tableLoader } from './routes/Table';
import Page, { loader as pageLoader }from './routes/Page';
import Backend, { action as backendAction } from './routes/backend/Backend';
import ErrorPage from "./error-page";
import './index.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Product />,
    errorElement: <ErrorPage />,
    loader: tableLoader,
    action: productAction,
    children: [
      {
        index: true,
        element: <Page />,
        loader: pageLoader
      },
      {
        path: "/page/:pageN",
        element: <Page />,
        loader: pageLoader
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