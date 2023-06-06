import { useOutletContext, useParams } from 'react-router-dom';


export default function Table() {

    let [ products ] = useOutletContext();
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Ttile</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Category</th>

                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(p => (
                        <tr key={p.ID}>
                            <td className="id">{p.ID}</td>
                            <td className="title">{p.Title}</td>
                            <td className="price">{p.Price}</td>
                            <td className="brand">{p.Brand}</td>
                            <td className="category">{p.Category}</td>
                            <td>
                                <span class="material-symbols-outlined" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={() => handleModalOpen(p.ID)}>edit</span>
                                <span class="material-symbols-outlined" onClick={() => handleDelete(p.ID)}>
                                    delete
                                </span>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}