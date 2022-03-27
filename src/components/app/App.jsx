import "./App.css";
import { Home } from "../home/home.jsx";
import { Todo } from "../todo/todo.jsx";
import { Header } from "../header/header";
import { Chat } from "../chat/chat";
import { TodoProvider } from "../../state/todo/context";
import { HashRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

//create context in App

function App() {
  return (
    //<div>
    <TodoProvider>
      {/*BrowserRouter figures out where to go based on the route list below */}
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<Todo />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </HashRouter>
    </TodoProvider>
    //</div>
  );
}

export default App;
