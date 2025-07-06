import React from 'react'
import Todo from './ToDo';

export default function ToDoList({ lst, check }) {
    return (
    <>
        {
        lst.map(cont => (
            <Todo key={cont.id} content={cont} check={check}/>
        ))}
    </>
    );
}
