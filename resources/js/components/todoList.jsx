import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        allTasks();
    }, []);

    const allTasks = async () => {
        const response = await axios.get('/tasks/view');
        console.log(response.data);        
        setTasks(response.data);
    };

    const addTask = async () => {
        if (!newTask.trim()) return;

        try {
            const response = await axios.post('/tasks/add', { title: newTask });
            setTasks([...tasks, response.data]);
            setNewTask('');
        } catch (error) {
            alert('Task already exists');
            console.error("Task already exists or other error");
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm('Are you sure to delete this task?')) {
            await axios.delete(`/tasks/delete/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        }
    };


    const Complete = async (id, completed) => {
        const status = completed === 'yes' ? 'no' : 'yes';
        const response = await axios.put(`/tasks/update/${id}`, { completed: status });
        setTasks(tasks.map(task => task.id === id ? response.data : task));
      };

    return (
        <div>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button className="btn btn-success" onClick={addTask}>Add Task</button>
            <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Completed ?</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index+1}</td>
                                <td>{task.title}</td>
                                <td>{task.completed === 'yes' ? 'Yes' : 'No'}</td>
                                <td>
                                    {task.completed === 'yes' ? (
                                    <i className="bi bi-trash" onClick={() => deleteTask(task.id)}></i>
                                    ) : (
                                    <>
                                        <i
                                        className="bi bi-check-circle"
                                        onClick={() => Complete(task.id, !task.completed)}
                                        ></i> ||
                                        <i className="bi bi-trash" onClick={() => deleteTask(task.id)}></i>
                                    </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    );
};

export default TaskList;


