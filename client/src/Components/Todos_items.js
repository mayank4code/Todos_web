import React, { useState, useEffect, useRef } from "react";
import { toast } from 'react-hot-toast';


function Todos_Item() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("Task ");
  const inputRef = useRef("Task ");

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
      setInput("Task ");
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
      <div className="form">
        <input
          type='text'
          value={input}
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown} ></input>
        <button onClick={() => addItem()}>
          ADD
        </button>
      </div>
      <ol className="todolist" >
        {items.map((item) => {
          const { _id, taskName } = item
          return (<li key={_id}>
            <div className="text-container">
              {taskName}
            <span>
            <button className="status" onClick={() => changeStatus(_id)}>
              Done
            </button>
            <button className="delete" onClick={() => deleteItem(_id)} >
              Delete
            </button>   
            </span>
            </div>
          </li>)
        })}
      </ol>
    </>
  );
}

export default Todos_Item;