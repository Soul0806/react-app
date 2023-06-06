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
import Popup, { loader as popupLoader, action as popupAction } from './routes/popup';
import Table, { loader as tableLoader } from './routes/Table';
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Product />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "/",
        element: <Table />,
        loader: tableLoader,
      },
      {
        path: "/page/:pageN",
        element: <Table />,
        loader: tableLoader,
      }
    ]
    
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);