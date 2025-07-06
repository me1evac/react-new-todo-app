import { useCallback, useState } from "react";
import ToDoList from "./components/ToDoList";
import add_icon from './components/icon-components/add-icon.svg';

function App(){

  const [todoList, setToDoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  const txt_change = useCallback((e) => {
    setTextInput(e.target.value);
  }, [])

  const onAddData = useCallback((e) => {
    const cid = prompt("Please name your content id.\nDo not let this box empty or your data will lost");

    setToDoList([
      {
        id: cid,
        des: textInput,
        compl: false
      },
      ...todoList
    ]);

    setTextInput("");
  }, [textInput, todoList]);

  return (<>
    <div className="glass-card">
      <h1>📋 My Tasks</h1>
      <div className="form">
        <div className="form-wrapper">
          <input 
            type="text" 
            placeholder="Add a task" 
            value={textInput}
            onChange={txt_change} 
          />
          <button 
            onClick={onAddData}
            disabled={!textInput}
          ><img src={add_icon} alt='' width={20} height={20} /></button>
        </div>
      </div>
      <ToDoList lst={todoList}/>
    </div>
  </>
  );
}

export default App;
