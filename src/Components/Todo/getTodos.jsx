import { useEffect, useState } from "react";
import { axi } from "../../lib/axios";
import { isEmpty } from "lodash";

const getId = async() => {
    const url = 'http://localhost:9000/io/readFile';
    const fileName = 'static/todo.json';
    const data = { fileName };
    const res = await axi.post(url, data);
    const todos = await res.data;
    const id = isEmpty(todos) ? 0 :  parseInt(todos.at(-1).id) + 1
    return [id, todos];
}

const getTodos = () => {
    const [ i, setId ] = useState(null);
    const [ todos, setTodos ] = useState([]);
    
    useEffect(() => {
        getId().then(([id, todos]) => setId(id));
        getId().then(([id, todos]) => setTodos(todos));
    }, [])

    return [i, todos]
}
 
export default getTodos;