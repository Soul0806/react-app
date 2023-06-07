import { Form } from 'react-router-dom';

export function action() {
    return {}
}
export default function Backend() {
    return (
        <div>
            <Form method="post">
                <select name="rebuild">
                    <option value=""> --------</option>
                    <option value="30"> 重建30筆</option>
                    <option value="50"> 重建50筆</option>
                    <option value="100">重建100筆</option>
                </select>
                <select name="mode">
                    <option value="fix"> 固定</option>
                    <option value="fix"> 隨機</option>
                </select>
                <button className="" value="submit">確定</button>
            </Form>
        </div>
    )
}

