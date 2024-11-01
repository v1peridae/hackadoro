import logo from "../src/assets/logo.png";

function App() {
  return (
    <main className="py-2 bg-background h-screen justify-center ">
      <img src={logo} className="App-logo h-60 mx-auto" alt="logo" />

      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className=" items-center row-span-1">
          <div className="flex justify-between">
            <div className="timer">
              <h3>Set Timer</h3>
            </div>
            <div className="break">
              <h3>Set Break</h3>
            </div>
            <div className="loops">
              <h3>Set Loop</h3>
            </div>
          </div>
        </div>

        <div className=" items-center row-span-3">
          <h1>__:__</h1>
          <button className="bg-primary text-white rounded-lg px-4 py-2 mt-4">Start/Stop</button>
        </div>

        <div className=" items-center row-span-1">
          <h3>To Do List</h3>
          <div className=""></div>
        </div>
      </div>
    </main>
  );
}

export default App;
