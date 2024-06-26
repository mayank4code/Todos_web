import { useState, useEffect } from "react"

function Todos_Item() {
  const [items, setItems] = useState(["task 1", "task 2" ,"task 3", "task 4" , "task 5", "task 6"]);
  const [input, setInput] = useState("");



  const addItem = () => {
    const currentItems = items;
    currentItems.push(input);
    setInput("");
    setItems(currentItems);
  };

  const deleteItem = (index) => {
    const remainingItems = items.filter((_, i) => i !== index);
    setItems(remainingItems);
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }


  return (
    <>
      <div className="form">
        <input type='text' value={input} onChange={handleChange}></input>
        <button onClick={()=>addItem()}>
          <span>ADD</span>
        </button>
      </div>
      <ul className="todolist">
        {items.map((item , index ) => {
          return <li>{item} <button onClick={()=>deleteItem(index)}> X </button></li>
        })}

      </ul>

    </>
  );
}

export default Todos_Item;