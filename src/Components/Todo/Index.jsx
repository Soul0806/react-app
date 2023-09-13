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



const Todo = () => {

    const [invalid, setInvalid] = useState(false);
    const { id, setId, todos, setTodos } = getTodos();

    const ref = useRef(false);
    const tagRef = useRef(123);

    useEffect(() => {
        // console.log(todos);
    }, [todos])

    useEffect(() => {
        if (ref.current) {
            const modalTag = Dom('.tag').dom;
            Dom('.modal__tag__open').event('click', () => {
                modalTag.showModal();
            })
            Dom('.modal__tag__close').event('click', () => {
                modalTag.close();
            })

            // Dom('.tag').event('click', );
        }
        return () => {
            ref.current = true;
        }
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
        ref: tagRef,
        onchange: () => {
            console.log(tagRef.current.value);
        },
       
    }

    return (
        <>
            <div className="todo-wrapper">
                <dialog data-modal-tag className="tag">
                    <div className="menu">
                        <span className="material-symbols-outlined modal__tag__close">
                            Close
                        </span>
                    </div>
                    <FormText {...tagProps} ref={tagRef}/>
                    <div className="action">
                        <button className="">新增</button>
                    </div>
                </dialog>
                <div className="flex">
                    <div className="flex flex-col">
                        <h1 style={{ margin: '1rem 0' }}>Todo</h1 >
                        <button className="modal__tag__open" onClick={modalShow}>新增標籤</button>
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

