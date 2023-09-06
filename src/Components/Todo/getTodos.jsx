import { useEffect, useState } from "react";
import { axi } from "../../lib/axios";
import { isEmpty } from "lodash";

const getId = async() => {
    const url = 'http://localhost:9000/io/readFile';
    const fileName = 'static/todo.json';
    const data = { fileName };
    const res = await axi.post(url, data);
    const result = await res.data;
    const id = isEmpty(result) ? 0 :  parseInt(result.at(-1).id) + 1
    return id;
}

const getTodos = () => {
    const [ i, setId ] = useState(null);
    
    useEffect(() => {
        getId().then(id => setId(id));
    }, [])

    return [i]
}
 
export default getTodos;