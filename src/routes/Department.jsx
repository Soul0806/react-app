import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Outlet, Link, useLoaderData, Form, json } from "react-router-dom";
import Popup from "./popup";
// import { getContacts, createContact  } from "../contacts";
// import Contact from "./contact";
const api_url = 'https://localhost:7299/api/department';

async function Get() {
  return fetch(api_url)
    .then(res => { return res.json() })
    .then(data => {
      return data;
    })
}

async function Put(id) {
  let dep = await fetch(`${api_url}/${id}`)
    .then(res => { return res.json() })
    .then(data => {
      return data[0];
    })

  return dep;
}

export async function loader() {
  const departments = await Get();
  return { departments };
}

export async function action() {
  return {};
}

export default function Product() {

  const { departments } = useLoaderData();
  const [showModal, setShowModal] = useState(false);


  const [dep, setDep] = useState({
    DepartmentId: '',
    DepartmentName: '',
  });
  // const [id, setId] = useState(null);

  var handleModalOpen = (depId) => {
    setShowModal(true);
    // setId(depId)
    Put(depId).then(res => setDep(res));
  }

  return (
    <div id="container">
      <h1>Product</h1>
      <Popup showModal={showModal} setShowModal={setShowModal} dep={dep} setDep={setDep}/>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            departments.map(d => (
              <tr key={d.DepartmentId}>
                <td className="Name">{d.DepartmentName}</td>
                <td>
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => handleModalOpen(d.DepartmentId)}
                  >修改</button>
                  <a href="#">刪除</a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Popup />
    </div>
  );
}