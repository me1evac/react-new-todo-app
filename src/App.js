import { useCallback, useEffect, useState } from "react";
import ToDoList from "./components/ToDoList";
import add_icon from './components/icon-components/add-icon.svg';

const DATA_KEY = "9298d8e4-177e-4c5e-8261-715ecbc992ea"

// Cookie helpers
function setCookie(name, value, days) {
  const expires = days ? "; expires=" + new Date(Date.now() + days*864e5).toUTCString() : "";
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, "");
}

function App(){
  // Initialize todoList from cookie
  const [todoList, setToDoList] = useState(() => {
    const data = getCookie(DATA_KEY);
    if (data) {
      // Only return tasks that are not completed
      return JSON.parse(data).filter(task => !task.compl);
    } else {
      return [];
    }
  });
  const [textInput, setTextInput] = useState("");

  // Save todoList to cookie whenever it changes
  useEffect(()=> {
    setCookie(DATA_KEY, JSON.stringify(todoList), 30);
  }, [todoList])

  const txt_change = useCallback((e) => {
    setTextInput(e.target.value);
  }, [])

  const onAddData = useCallback((e) => {
    // Generate a unique id using crypto.randomUUID if available, else fallback
    let cid = "";
    if (window.crypto && window.crypto.randomUUID) {
      cid = window.crypto.randomUUID();
    } else {
      cid = Date.now().toString() + Math.random().toString(36).slice(2);
    }
    setToDoList(prefc => [
      {
        id: cid,
        des: textInput,
        compl: false
      },
      ...prefc
    ]);
    setTextInput("");
  }, [textInput]);

  const check = useCallback((id) => {
    setToDoList((prev) => prev.map((content) => {
      if (content.id === id) {
        return { ...content, compl: true };
      } else {
        return content;
      }
    }));
  }, [])

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
      <ToDoList lst={todoList} check={check}/>
    </div>
  </>
  );
}

export default App;
