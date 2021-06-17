import { useState } from "react";


function Task({ task, setTask, ownTask, status, taskCompleted, setTaskCompleted }) {
  const onClickHandlerDelete = function () {
    const t = task.filter((element) => element !== ownTask)
    setTask(t)
  }
  const onclickHandlerChange = function () {
    if (status) {
      let t = task.filter((element) => element !== ownTask)
      setTask(t)
      t = taskCompleted.map((element) => element)
      t.push(ownTask)
      setTaskCompleted(t)
    }
    else {
      let t = taskCompleted.filter((element) => element !== ownTask)
      setTaskCompleted(t)
      t = task.map((element) => element)
      t.push(ownTask)
      setTask(t)
    }
  }

  return (
    <div className={(status ? "bg-gray-700 p-5 rounded-md mb-3 " : "bg-gray-400 p-5 rounded-md mb-3 opacity-75")}>
      <span className="text-white text-4xl">{ownTask}</span>
      <button className="mx-3 bg-red-600 p-3 rounded-md float-right" onClick={onClickHandlerDelete}>Delete</button>
      <button className="mx-3 bg-white p-3 rounded-md float-right" onClick={onclickHandlerChange}>{status ? "Mark Done" : "Mark Undone"}</button>
    </div >
  )
}


function App() {

  const [task, setTask] = useState([1, 2, 3]);
  const [taskCompleted, setTaskCompleted] = useState([4, 5, 6]);
  const [inputTask, setInputTask] = useState('');
  const [show, setShow] = useState('all');

  const radioHandler = function (event) {
    if (event.target.nodeName === "INPUT") {
      setShow(event.target.value)
    }
  }

  return (
    <div className="App ">
      <div className="flex justify-center pt-10 mb-3">
        <input type="text" placeholder="Enter Task" className="" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
        <button className="bg-white mx-2 p-3" onClick={() => { setTask((task) => [...task, `${inputTask}`]); setInputTask(''); console.log(task, taskCompleted) }}>Add</button>
      </div>

      <div className="flex justify-center" onClick={radioHandler}>
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


      {(show === 'active' || show === 'all') && <div className="flex flex-col justify-center mx-3">
        {task.map(element => {
          return <Task key={element} task={task} ownTask={element} setTask={setTask} status taskCompleted={taskCompleted} setTaskCompleted={setTaskCompleted} />
        })}
      </div>}

      {(show === 'completed' || show === 'all') && <div className="flex flex-col justify-center mx-3">
        {taskCompleted.map(element => {
          return <Task key={element} task={task} ownTask={element} setTask={setTask} status={false} taskCompleted={taskCompleted} setTaskCompleted={setTaskCompleted} />
        })}
      </div>}

    </div>
  );
}

export default App;
