import React, { useState, useEffect, useRef } from "react";
import { toast } from 'react-hot-toast';


function Todos_Item() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    getAllTasks();
  }, []);


  const getAllTasks = async () => {
    const response = await fetch('http://localhost:5000/api/getAllTasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const allTasks = data.allTasks;
    setItems(allTasks);
  }

  const addItem = async () => {
    const response = await fetch('http://localhost:5000/api/addTask', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        taskName: input,
      })
    });

    const data = await response.json();

    if (data.success) {
      getAllTasks();
      setInput("");
      toast.success('Task Added successfully');
    } else {
      toast.error('Unable to Add Task ! Please try again later.');
    }
  };

  const deleteItem = async (_id) => {
    const response = await fetch('http://localhost:5000/api/deleteTask/' + _id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.success) {
      getAllTasks();
      toast.success("Task Deleted Successfully");
    }
    else {
      toast.error("Unable to Delete Task" + data.message);
    }
  }

  const changeStatus = () => {

  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  }


  return (
    <>
    <div className="form flex justify-center items-center my-4">
      <input
        type="text"
        value={input}
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="p-2 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button
        onClick={() => addItem()}
        className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
      >
        ADD
      </button>
    </div>
    <ul className="todolist list-decimal list-inside mx-4">
  {items.map((item) => {
    const { _id, taskName } = item;
    // Remove the initial number from the taskName
    const formattedTaskName = taskName.replace(/^\d+\.\s*/, '');

    return (
      <li key={_id} className="my-2 p-2 bg-gray-100 rounded shadow">
        <div className="text-container flex justify-between items-center">
          <span className="flex-grow text-gray-700">{formattedTaskName}</span>
          <span className="flex space-x-2">
            <button
              className="status p-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => changeStatus(_id)}
            >
              Done
            </button>
            <button
              className="delete p-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => deleteItem(_id)}
            >
              Delete
            </button>
          </span>
        </div>
      </li>
    );
  })}
</ul>

  </>
  );
}

export default Todos_Item;