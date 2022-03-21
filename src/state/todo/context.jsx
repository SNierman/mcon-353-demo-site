import { Todo } from "../../components/todo/todo";
import React, { useState } from "react";

export const TodoContext = React.createContext();

export const TodoProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  return (
    <TodoContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
