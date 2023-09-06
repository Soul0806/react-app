import { useEffect, useState } from "react";
import { axi } from "../../lib/axios";
import { get, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import getTodos from "./getTodos";

const WRITE_API = `http://localhost:9000/io/writeFile`;


// const getId = async() => {
//     const url = 'http://localhost:9000/io/readFile';
//     const fileName = 'static/todo.json';
//     const data = { fileName };
//     const res = await axi.post(url, data);
//     const result = await res.data;
//     const id = isEmpty(result) ? 0 :  parseInt(result.at(-1).id) + 1
//     return id;
// }

const Todo = () => {
    const [id , setId ] = useState(0);
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    var [i] = getTodos();

    console.log(i);

    const checkValid = {
        color: invalid ? 'red' : ''
    }

    const handleChange = () => {
        setInvalid(false);
    }

    const handelSubmit = (e) => {
        
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const todo = formData.get('todo');

        if (!todo) {
            setInvalid(true);
            return;
        }
        const content = { 
            id: i, 
            todo, 
        }   
        // console.log(content);
        const fileName = 'static/todo.json';
        const data = { fileName, content }
        axi.post(WRITE_API, data);
        i += 1;
    }

    return (
        <>
            <h1 style={{ margin: '1rem 0' }}>Todo</h1 >
            <form onSubmit={handelSubmit}>
                <label style={checkValid} htmlFor="todo">請輸入:</label>
                <input type="text" name="todo" id="todo" size="50" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Todo;