import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
// import Root, { loader as rootLoader, action as rootAction, }  from './routes/Root';
// import Contact, { loader as conatactLoader} from "./routes/contact";
// import Edit, { action as editAction }from "./routes/edit";
// import Department, { loader as rootLoader, action as rootAction } from "./routes/Department";
import Product, { loader as rootLoader, action as rootAction } from './routes/Product';
import { loader as tableLoader } from './routes/Table';
import Page, { loader as pageLoader }from './routes/Page';
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Product />,
    errorElement: <ErrorPage />,
    loader: tableLoader,
    action: rootAction,
    children: [
      {
        path: "/page/:pageN",
        element: <Page />,
        loader: pageLoader
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);