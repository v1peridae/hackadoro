import React, { useState, useEffect } from "react";
import logo from "../src/assets/logo.png";
import YoutubeVid from "./playYoutube";

interface Todo {
  text: string;
  completed: boolean;
}

function App() {
  const [timer, setTimer] = useState(20);
  const [breakTime, setBreakTime] = useState(5);
  const [loop, setLoop] = useState(3);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [countdown, setCountdown] = useState(timer * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("5l8khj88MFQ");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const [totalTime, setTotalTime] = useState(0);

  const videoOptions = [
    { id: "5l8khj88MFQ", title: "Lo-fi Beats" },
    { id: "DWuAn6C8Mfc", title: "In Rainbows" },
    { id: "yLOM8R6lbzg", title: "White Noise" },
  ];

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, step = 5) => setter(value + step);
  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, step = 5) => setter(Math.max(0, value - step));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 0) {
            if (onBreak) {
              setOnBreak(false);
              setCountdown(timer * 60);
              setCurrentLoop((prevLoop) => prevLoop + 1);
            } else {
              if (currentLoop + 1 < loop) {
                setOnBreak(true);
                setCountdown(breakTime * 60);
              } else {
                setIsRunning(false);
              }
            }
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, countdown, onBreak, timer, breakTime, loop, currentLoop]);

  useEffect(() => {
    const totalTimeInterval = setInterval(() => {
      if (isRunning && !onBreak) {
        setTotalTime((prev) => prev + 5);
      }
    }, 300000);

    return () => clearInterval(totalTimeInterval);
  }, [isRunning, onBreak]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    if (!isRunning) setCountdown(onBreak ? breakTime * 60 : timer * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setOnBreak(false);
    setCountdown(timer * 60);
    setCurrentLoop(0);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index: number) => {
    setTodos(todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="block pt-2 pb-3 h-screen w-screen bg-background text-textone overflow-hidden">
      {/* Main Column Stuff */}
      <div className="grid grid-cols-12 w-full">
        {/* Left Column */}
        <div className="col-span-3">
          <div className="bg-[#7f1a5d3b] text-[#69316D] px-5 rounded-3xl mx-10 h-auto mb-10 mt-10 font-neuebit">
            <span className="text-textone px-5 text-7xl">Set Timer</span>
            <div className="space-x-5 mx-auto flex justify-center">
              <button className="text-8xl" onClick={() => decrement(setTimer, timer)}>
                -
              </button>
              <span className="text-8xl text-[#977C8E] px-3">{timer}</span>
              <button className="text-8xl" onClick={() => increment(setTimer, timer)}>
                +
              </button>
            </div>
          </div>

          <div className="bg-[#7f1a5d3b] text-[#69316D] px-5 rounded-3xl mx-10 h-auto mb-7 font-neuebit">
            <span className="text-textone px-5 text-7xl">Set Break</span>
            <div className="space-x-5 mx-auto flex justify-center">
              <button className="text-8xl" onClick={() => decrement(setBreakTime, breakTime)}>
                -
              </button>
              <span className="text-8xl text-[#977C8E] px-3">{breakTime}</span>
              <button className="text-8xl" onClick={() => increment(setBreakTime, breakTime)}>
                +
              </button>
            </div>
          </div>

          <div className="bg-[#7f1a5d3b] text-[#69316D] px-5 rounded-3xl mx-10 h-auto mb-7 font-neuebit">
            <span className="text-textone px-5 text-7xl">Set Loop</span>
            <div className="space-x-5 mx-auto flex justify-center">
              <button className="text-8xl" onClick={() => decrement(setLoop, loop, 1)}>
                -
              </button>
              <span className="text-8xl text-[#977C8E] px-3">{loop}</span>
              <button className="text-8xl" onClick={() => increment(setLoop, loop, 1)}>
                +
              </button>
            </div>
          </div>

          <div className="bg-[#7f1a5d3b] text-[#69316D] px-5 pb-3 rounded-3xl mx-10 h-auto mb-7 font-neuebit text-center align-top">
            <h2 className="text-textone px-2 text-5xl pt-3 leading-7">Total Time Spent</h2>
            <span className="text-4xl text-[#977C8E]">
              {Math.floor(totalTime / 60)} hours {totalTime % 60} minutes
            </span>
          </div>
        </div>

        {/* Center Column */}
        <div className="col-span-6 row-span-3 text-center align-top font-neuebit">
          <img src={logo} className="align-top mb-40" alt="logo" />
          <span className="text-9xl leading-10 text-texttwo font-neuebit h-60">
            {Math.floor(countdown / 60)
              .toString()
              .padStart(2, "0")}
            :{(countdown % 60).toString().padStart(2, "0")}
          </span>
          <div className=" items-center content-around ">
            <h1 className="text-7xl mt-28 text-center cursor-pointer text-[#977C8E] font-neuebit" onClick={handleStartStop}>
              {isRunning ? "STOP" : "START"}
            </h1>{" "}
            <h1 className="text-6xl text-center cursor-pointer text-[#977C8E] font-neuebit" onClick={resetTimer}>
              RESET
            </h1>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3">
          <div className="bg-[#7f1a5d3b] text-[#69316D] pb-3 rounded-3xl mx-10 h-auto mb-10 mt-12 font-neuebit text-center align-top">
            <h2 className="text-textone text-5xl mb-4">To-Do List</h2>
            <div className="flex justify-center mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a task..."
                className="text-3xl text-texttwo placeholder-texttwo px-2 py-1 rounded-xl w-full mx-3 bg-[#977C8E] outline-none"
              />
              <button onClick={addTodo} className="text-5xl pr-4 pb-1 text-[#977C8E] rounded-lg">
                +
              </button>
            </div>
            <ul className="text-left px-4">
              {todos.map((todo, index) => (
                <li key={index} className="text-2xl mb-3 flex items-center text-[#977C8E]">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                    className="mr-3 accent-[#977C8E] outline-[#977C8E] w-5 h-5"
                  />
                  <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
                  <button onClick={() => deleteTodo(index)} className="ml-auto text-[#977C8E] text-2xl">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#7f1a5d3b] text-[#69316D] px-5 pb-5 rounded-3xl mx-10 h-auto mb-10 mt-12 font-neuebit text-center flex flex-col items-center">
            <h2 className="text-textone px-2 text-5xl">Now Playing</h2>
            <div className="text-[#977C8E]">
              <select
                className=" appearance-none outline-none leading-none text-6xl bg-[#00000000] w-full text-center cursor-pointer "
                onChange={(e) => setSelectedVideoId(e.target.value)}
                value={selectedVideoId}
              >
                {videoOptions.map((video) => (
                  <option className="text-4xl" key={video.id} value={video.id}>
                    {video.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-center rounded-2xl overflow-hidden">
              <YoutubeVid videoId={selectedVideoId} />
            </div>
          </div>

          <div className="bg-[#7f1a5d3b] text-[#69316D] px-5 pb-3 rounded-3xl mx-10 h-auto mb-10 mt-12 font-neuebit text-center align-top">
            <h2 className="text-textone px-2 text-5xl pt-3 leading-7">Quick Notes</h2>
            <textarea
              rows={3}
              cols={20}
              className=" placeholder-texttwo w-full mt-3 px-4 py-2 text-2xl rounded-2xl bg-[#977c8e] text-texttwo outline-none resize-none"
              placeholder="Today I worked on..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
