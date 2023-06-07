import React from 'react'
import { useState } from 'react';
import { db } from './firebase_config';
import { updateDoc, doc } from "firebase/firestore";

const TodoListItem = ({ t, todos, id, getId, getBtn, EditTodo }) => {

  const [check, setCheck] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [editid, setEditid] = useState("");

  const DeleteTodo = () => {
    db.collection("todos").doc(id).delete()
  }
  const handleCheck = async () => {
    setCheck(!check)
    await updateDoc(doc(db, "todos", id), {
      completed: check,
    })
  }
  const edit = () => {
    setToggle(false)
    setEditid(id)
    getId(editid)
    getBtn(toggle)
    const editTodo = todos.find((t) => {
      return t.id === id
    });
    EditTodo(editTodo.todo)
  }
  return (
    <>
      <div>
        <li className="singletodo">
          <input type="checkbox" className='checkbox' onClick={handleCheck} />
          {check ? <span className="todotext">{t}</span>
            : <span className="todotext_check">{t}</span>}
          <button onClick={edit} className='edit'>edit</button>
          <button onClick={DeleteTodo}>X</button>
        </li>
      </div>
    </>
  )
}

export default TodoListItem;


