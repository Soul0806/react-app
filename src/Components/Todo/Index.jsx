import { useState } from "react";
import { prisma } from "@prisma/client";


const Todo = () => {

    // const todos = await prisma.todo.findMany();
    const [invalid, setInvalid] = useState(false);

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
        console.log(todo);

        if (!todo) {
            setInvalid(true);
            return;
        }
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