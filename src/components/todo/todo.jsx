import { TextField, Container, IconButton } from "@mui/material";
import "./todo.css";
import React, { useState, useContext } from "react";
import { CheckCircleTwoTone, Delete } from "@mui/icons-material";
import { TodoContext } from "../../state/todo/context";

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{
        color: task.completed ? "#bababa" : "#FFFFFF",
        textDecoration: task.completed ? "line-through" : "",
      }}
    >
      {task.title}
      {/* change buttons to icons */}
      <IconButton onClick={() => removeTask(index)}>
        <Delete />
      </IconButton>
      <IconButton onClick={() => completeTask(index)}>
        <CheckCircleTwoTone />
      </IconButton>
    </div>
  );
}

function CreateTodo() {
  //Make this into global context
  const { tasks, setTasks } = useContext(TodoContext);

  const addTask = (title) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="todo-container">
      <div className="header">TO DO LIST</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            key={index}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Container minWidth={2000}>
        <TextField
          //type="text"
          sx={{ input: { color: "white" } }}
          variant="standard"
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "40px",
          }}
          className="textfield"
          value={value}
          placeholder="Enter task"
          onChange={(e) => setValue(e.target.value)}
          fullWidth
        />
      </Container>
    </form>
  );
}
export const Todo = () => {
  return <CreateTodo />;
};
