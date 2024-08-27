
import React from 'react';
import ReactDOM from 'react-dom/client';
import TaskList from './components/todoList';



if (document.getElementById('todolist')) {
    const Index = ReactDOM.createRoot(document.getElementById("todolist"));

    Index.render(
        <React.StrictMode>
            <TaskList/>
        </React.StrictMode>
    )
}