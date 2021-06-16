import { useState } from "react";


function TaskList({ task, setTask }) {
  const temp = [];
  const onClickHandler = (e) => {
    if (e.target.nodeName === "BUTTON") {
      const t = task.filter((elemet) => elemet !== e.target.previousElementSibling.innerHTML)
      setTask(t)
    }
  }
  for (let i = 0; i < task.length; i++) {
    temp.push(
      <div key={i} id={`${i}`} onClick={onClickHandler} className=" bg-gray-700 p-5 rounded-md mb-3">
        <span className="text-white text-4xl">{task[i]}</span>
        <button className="mx-3 bg-white p-3 rounded-md float-right">Delete</button>
      </div>
    )
  }

  return (
    <>
      {temp}
    </>
  )
}

function App() {

  const [task, setTask] = useState([]);
  const [inputTask, setInputTask] = useState('');

  return (
    <div className="App ">
      <div className="flex justify-center pt-10 mb-3">
        <input type="text" placeholder="Enter Task" className="" value={inputTask} onChange={(e) => setInputTask(e.target.value)} />
        <button className="bg-white mx-2 p-3" onClick={() => { setTask((task) => [...task, `${inputTask}`]); setInputTask('') }}>Add</button>
      </div>

      <div className="flex flex-col justify-center mx-3">
        <TaskList task={task} setTask={setTask} />
      </div>
    </div>
  );
}

export default App;
