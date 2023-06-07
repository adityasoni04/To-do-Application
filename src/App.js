import { useEffect, useState } from 'react'
import './App.css';
import firebase from 'firebase/compat/app';
import { db } from './firebase_config';
import TodoListItem from './Todo';
import { doc, updateDoc } from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputlist, setInputlist] = useState("");
  const [id, setId] = useState("");
  const [btn, setBtn] = useState(true);

  const todolist = (e) => {
    return setInputlist(e.target.value);
  };
  const addtodo = (e) => {
    e.preventDefault();
    if (inputlist !== "") {
      db.collection("todos").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: inputlist,
      });
    }
    setInputlist("");
  };
  useEffect(() => {
    getTodos();
  }, [])

  function getTodos() {
    db.collection("todos").orderBy("timestamp", "asc").onSnapshot(function (querySnapshot) {
      setTodos(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        completed: false,
      })
      ))
    });
  }

  const getId = (data) => {
    setId(data)
  }
  const getBtn = (data) => {
    setBtn(data)
  }
  const EditTodo = (data) => {
    setInputlist(String(data))
  }
  const update = (e) => {
    e.preventDefault();
    setBtn(true)
    updateDoc(doc(db, "todos", id), {
      todo: inputlist
    })
    setInputlist("")
  }

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <h1>ToDo List</h1>
          <form>
            <input type="text" placeholder="Add a ToDo" onChange={todolist} value={inputlist} />
            {btn ? <button type="submit" className='add' onClick={addtodo} >+</button>
              : <button type="submit" className='update' onClick={update} >update</button>}
          </form>
          <ul className="alltodo">
            {todos.map((t) => {
              return <TodoListItem t={t.todo} todos={todos} id={t.id} getId={getId} getBtn={getBtn} EditTodo={EditTodo} />
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
