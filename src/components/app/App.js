import "./App.css";
import { Home } from "../home/home.jsx";
import { Todo } from "../todo/todo.jsx";
import {
  Card,
  Typography,
  Paper,
  CardMedia,
  Grid,
  CardContent,
} from "@mui/material";

import React, { useState } from "react";

function App() {
  return (
    <div>
      {/* <Home /> */}
      <Todo />
    </div>
  );
}

export default App;
