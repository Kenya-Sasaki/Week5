import './App.css';
import React, { useState} from 'react';

function App() {
  const [tasks, setTasks] = useState([]); 
  const [input, setInput] = useState(""); 

  const addTask = () => {
    const newTask = input;
    if (newTask.trim() !== '') { //空白だけでの登録を削除
      setTasks([...tasks, newTask]); //配列に追加
    }
    console.log(tasks)
    setInput("") //addできたら初期化
  };

  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Input Task"
      />
      <button onClick={addTask}>Add Task</button>
      {tasks.map((task, index) => (
        <div key={index}>
          <input
            type="checkbox"
          />
          <span>{task}</span>
        </div>
      ))}
    </div>
  );
}

export default App;

/* Memo 
・setTaskは配列追加も可能
・

あとでやること
・done/non-doneステータス追加
・データの保持
・スタイリング
*/