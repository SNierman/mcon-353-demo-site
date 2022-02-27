import "./App.css";
import { Home } from "../home/home.jsx";
import { Todo } from "../todo/todo.jsx";
import { Header } from "../header/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState } from "react";

//create context in App
//const ThemedContext...

function App() {
  return (
    <div>
      {/*BrowserRouter figures out where to go based on the route list below */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
