import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Fetch Data
import getTodos from "./getTodos";

// lib 
import { axi } from "../../lib/axios";
import { dt } from "../../lib/helper";
import API from "../../api";

// Third party
import { isEmpty } from "lodash";


const Todo = () => {

    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();

    const { id, setId, todos, setTodos } = getTodos();

    // console.log(todos.data);
    // return (123)

    useEffect(() => {
        console.log(todos);
    }, [todos])

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
            id,
            todo,
            createdAt: dt.getTodayDate(),
        }

        const fileName = 'static/todo.json';
        const data = { fileName, content }
        axi.post(API.WRITE_JSONFILE, data);

        setTodos(prev => {
            return [...prev, content]
        })
        setId(prev => prev + 1);

    }

    const handelDelete = (id) => {


        setTodos(todos => {
            return todos.filter(todo => {
                if (todo.id !== id)
                    return todo;
            })
        })

        const fileName = 'static/todo.json';
        const payload = { fileName, id }
        const del = axi.post(API.HOST + `/todo/del`, payload);
    }

    // console.log(todos.alldata);
    // // return (123)
    return (
        <>
            <div className="todo-wrapper">
                <h1 style={{ margin: '1rem 0' }}>Todo</h1 >
                <form onSubmit={handelSubmit}>
                    <label style={checkValid} htmlFor="todo">請輸入</label>
                    <input type="text" name="todo" id="todo" size="50" onChange={handleChange} autoComplete="off" />
                    <button type="submit">Submit</button>
                </form>
                {!isEmpty(todos) &&
                    <>{todos.map(todo => (
                        <div key={todo.id} className="todo-list">
                            <div>{todo.id}</div>
                            <div>{todo.todo}</div>
                            <div>{todo.createdAt}</div>
                            <span className="material-symbols-outlined" onClick={() => handelDelete(todo.id)}>
                                delete
                            </span>
                        </div>
                    ))}</>
                }
            </div>
        </>
    );
}

export default Todo;

