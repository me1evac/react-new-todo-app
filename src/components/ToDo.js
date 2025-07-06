import React from 'react'
import { ReactComponent as CheckIcon } from './icon-components/check-icon.svg';


export default function Todo( { content, check }){
  return (<>
    <ul className="todo-list">
        <li>
            <label className={content.compl ? "completed" : ""}>{content.des}</label>
            <button 
              className={`check-btn${content.compl ? " completed" : ""}`}
              onClick={() => check(content.id)}
            >
              <CheckIcon className="img_icon"/>
            </button>
        </li>
    </ul>
    </>
  );
}
