import './App.css';
import React, { useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid'; // ユニークIDのために使用

function App() {
  const [tasks, setTasks] = useState([]); 
  const [input, setInput] = useState(""); 

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); //json形式で保存されるので、それを読み込む
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => {
    if(input.trim() !== ""){ //空白だけでの登録を削除
      const newTask = {
        "taskName":input,
        "status":"Not Done",
        "id":uuidv4()
      }
        setTasks([...tasks, newTask]); //配列に追加
        console.log(tasks)
        setInput("") //addできたら初期化
    };
  };

  const toggleTaskStatus = (index) => {
    const foundIndex = tasks.findIndex((task) => task.id === index); //findIndexメソッドでIDで検索して、配列の何番目の要素かを確認

    const updatedTasks = [...tasks]; //Stateの特定の要素だけを更新できないため、別変数を宣言
    updatedTasks[foundIndex].status = !updatedTasks[foundIndex].status; // ステータス更新
    setTasks(updatedTasks); 
  };


  const notDoneTasks = tasks.filter((task) => task.status === 'Not Done');
  // const DoneTasks = tasks.filter((task) => task.status === 'Done');

  return (
    <div className="App">
      <div className='ToDoInput'>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Input Task"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              addTask(); // Enter キーが押されたらタスクを追加
            }
          }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='ToDoList'>
        <h2>ToDo List</h2>
        {notDoneTasks.map((task) => (
          <div key={task.id}>
            <div>
              <input
                type="checkbox"
                onChange={() => toggleTaskStatus(task.id)}
              />
              <span>{task.taskName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

/* Memo 
・setTaskは配列追加も可能
・ユニークな8文字（数字＋アルファベット）を生成しようとしたが、重複の可能性があるため、uuidライブラリを使用

あとでやること
・done/non-doneステータス追加
・データの保持
・スタイリング
*/