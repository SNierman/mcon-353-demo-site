import "./App.css";
import { Home } from "../home/home.jsx";
import { Todo } from "../todo/todo.jsx";
import { Header } from "../header/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

//create context in App
export const TodoContext = React.createContext();

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Daven",
      completed: true,
    },
    {
      title: "Eat breakfast",
      completed: true,
    },
    {
      title: "Do homework",
      completed: false,
    },
    {
      title: "Go on vacation!!!",
      completed: false,
    },
  ]);

  return (
    //<div>
    <TodoContext.Provider value={{ tasks, setTasks }}>
      {/*BrowserRouter figures out where to go based on the route list below */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
    //</div>
  );
}

export default App;
