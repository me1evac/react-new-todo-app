import React from 'react'

export default function Todo( { content }) {
  return (<>
    <ul className="todo-list">
        <li>
            <label >{content.des}</label>
        </li>
    </ul>
    </>
  );
}
