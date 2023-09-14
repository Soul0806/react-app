import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Fetch Data
import getTodos from "./getTodos";

// lib 
import { axi } from "../../lib/axios";
import { Dom, dt } from "../../lib/helper";
import API from "../../api";
import FormText from "../custom/FormText";

// Third party
import { isEmpty } from "lodash";


const getTag = async() => {
    const payload = { fileName: 'static/test.json' };
    const { data } = await axi.post(API.READ_JSONFILE, payload);
    return data.tag;
}

const Todo = () => {
  

    const [invalid, setInvalid] = useState(false);
    const { id, setId, todos, setTodos } = getTodos();
    const [tags, setTags] = useState([]);

    const ref = useRef(false);
    const refTag = useRef('');
    const refDialog = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(todos);
    }, [todos]) 

    useEffect(() => {
        Dom('.modal__tag__open').event('click', () => {
            refDialog.current.showModal();
        })
        Dom('.modal__tag__close').event('click', () => {
            refDialog.current.close();
        })
        getTag().then(tags => setTags(tags));
        // Dom('.tag').event('click', );
    }, [])

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

    const modalShow = () => {
        // modalTag.modalShow();
    }

    const tagProps = {
        id: "tag",
        label: "標籤",
        className: "tag form__input",
        placeholder: '標籤',
        ref: refTag,
        autoComplete: 'off',
        onchange: () => {
            console.log(refTag.current.value);
        },
       
    }

    const tagCreate = () => {
        if(!tags.includes(refTag.current.value)) {
            const fileName = 'static/test.json';
            const data = { 
                key: 'tag',
                value: refTag.current.value,
            };
            const payload = { fileName, data };
            axi.post(API.WRITE_JSON_PROP, payload);

            setTags(prev => [...prev, refTag.current.value]);
        } 
        refDialog.current.close();
    }

    return (
        <>
            <div className="todo-wrapper">
                <dialog data-modal-tag className="tag" ref={refDialog}>
                    <div className="menu">
                        <span className="material-symbols-outlined modal__tag__close">
                            Close
                        </span>
                    </div>
                    <FormText {...tagProps} ref={refTag}/>
                    <div className="action">
                        <button onClick={tagCreate}>新增</button>
                    </div>
                </dialog>
                <div className="flex">
                    <div className="flex flex-col">
                        <h1 style={{ margin: '1rem 0' }}>Todo</h1 >
                        <button className="modal__tag__open" onClick={modalShow}>新增標籤</button>
                        <div>
                            {!isEmpty(tags) && 
                                tags.map(tag => (
                                    <div>{tag}</div>
                                ))
                            }
                        </div>
                    </div>
                    <form onSubmit={handelSubmit}>
                        <label style={checkValid} htmlFor="todo">請輸入</label>
                        <input type="text" name="todo" id="todo" size="50" onChange={handleChange} autoComplete="off" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                {/* {!isEmpty(todos) &&
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
                } */}
            </div>
        </>
    );
}

export default Todo;

