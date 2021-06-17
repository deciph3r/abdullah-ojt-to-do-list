import { useState } from "react";

function Task({ task, setTask, ownTask, status, taskCompleted, setTaskCompleted }) {
  const onClickHandlerDelete = function () {
    (status) ?
      setTask((task) => task.filter(element => element !== ownTask)) :
      setTaskCompleted((taskCompleted) => taskCompleted.filter(element => element !== ownTask))
  }

  const onclickHandlerChange = function () {
    if (status) {
      setTask((task) => task.filter(element => element !== ownTask))
      setTaskCompleted((taskCompleted) => [...taskCompleted, ownTask])
    }
    else {
      setTaskCompleted((taskCompleted) => taskCompleted.filter(element => element !== ownTask))
      setTask((task) => [...task, ownTask])
    }
  }

  return (
    <div className={(status ? "bg-gray-700 p-5 rounded-md mb-3 " : "bg-gray-400 p-5 rounded-md mb-3 opacity-75")}>
      <span className="text-white text-4xl">{ownTask}</span>
      <button className="mx-3 bg-red-600 p-3 rounded-md float-right text-white" onClick={onClickHandlerDelete}>Delete</button>
      <button className="mx-3 bg-white p-3 rounded-md float-right" onClick={onclickHandlerChange}>{status ? "Mark Done" : "Mark Undone"}</button>
    </div >
  )
}

function App() {

  const [task, setTask] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [inputTask, setInputTask] = useState('');
  const [show, setShow] = useState('all');

  const radioHandler = function (event) {
    if (event.target.nodeName === "INPUT") {
      setShow(event.target.value)
    }
  }

  const addButtonHandler = function () {
    const newTask = inputTask.toString().trim();
    setInputTask('');
    task.includes(newTask) || taskCompleted.includes(newTask) || setTask((task) => [...task, newTask])
  }

  return (
    <div className="App ">
      <div className="flex justify-center pt-10 mb-3">
        <input type="text" placeholder="Enter Task" className="p-3" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
        <button className=" mx-2 p-3 bg-green-600 rounded-md text-white" onClick={addButtonHandler}>Add</button>
      </div>

      <div className="flex justify-center mb-3" onClick={radioHandler}>
        <div className="mx-3">
          <input type="radio" name="choice" value="all" />
          <span>All</span>
        </div>
        <div className="mx-3">
          <input type="radio" name="choice" value="active" />
          <span>Active</span>
        </div>
        <div className="mx-3">
          <input type="radio" name="choice" value="completed" />
          <span>completed</span>
        </div>
      </div>

      <div className="flex flex-col mx-3">
        {
          (show === 'active' || show === 'all') &&
          task.map(element => <Task key={element} task={task} ownTask={element} setTask={setTask} status taskCompleted={taskCompleted} setTaskCompleted={setTaskCompleted} />)
        }{
          (show === 'completed' || show === 'all') &&
          taskCompleted.map(element => <Task key={element} task={task} ownTask={element} setTask={setTask} status={false} taskCompleted={taskCompleted} setTaskCompleted={setTaskCompleted} />)
        }
      </div>

    </div>
  );
}

export default App;