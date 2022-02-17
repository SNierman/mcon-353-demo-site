import {
  Typography,
  TextField,
  Container,
  Card,
  List,
  Checkbox,
  IconButton,
  Icon,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { render } from "@testing-library/react";
import "./todo.css";
import React, { useState } from "react";
import { CheckCircleTwoTone, Delete } from "@mui/icons-material";
import { display, padding } from "@mui/system";
{
  /*}
// button you click to add an item to the todo list
function AddItem(props) {
  return (
    <button className="addItem" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// item that is added when you click AddItem, it has a title, checkbox and discard button
class Item extends React.Component {
  constructor(prop) {
    super(props);
    this.state = {
      // get text from textfield
      description: inputListItem.value,
      checkBox: Checkbox,
      isChecked: false,
    };
  }

  renderItem(i) {
    return (
      <ListItem>
        <Item></Item>
      </ListItem>
    );
  }
}

//list of checkboxes
class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      isChecked: false,
    };
  }

  //handle the click of the checkbox
  handleCheckClick(i) {
    const boxes = this.state.items.slice();
    boxes[i] = this.state;
    this.setState({
      items: boxes,
      //check if the checkbox at position i is checked, if yes uncheck it, if no, check it
      isChecked: boxes[i].state.isChecked ? false : true,
    });
  }

  //show the checkbox
  renderCheckbox(i) {
    return (
      <Checkbox
        value={this.state.boxes[i]}
        onClick={() => this.handleCheckClick(i)}
      />
    );
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItemList() {}
}
*/
}
/*
function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <Delete />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value)}
              dense
            >
              <CheckCircleTwoTone>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </CheckCircleTwoTone>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}*/

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
  ]);

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
/*
export const Todo = () => {
  /*const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <Typography
        variant="h3"
        padding={2}
        style={{ justifyContent: "center", display: "flex", color: "#00adb5" }}
      >
        To Do List
      </Typography>
      <Container maxWidth="sm">
        <TextField
          id="inputListItem"
          label="Enter Task"
          variant="standard"
          /*value={this.state.textFieldValue}
          fullWidth
        />
      </Container>
      <IconButton aria-label="addItem">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Icon
          style={{
            justifyContent: "center",
            display: "flex",
            color: "#00adb5",
          }}
        >
          add_circle
        </Icon>
      </IconButton>
      <Card maxWidth="sm" variant="outlined" color="#00adb5" minWidth="sm">
        {/*<CheckboxList></CheckboxList>}
        {/*<ItemList>{props.renderItemList()}</ItemList>}
        {/*<List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <CheckCircleTwoTone>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </CheckCircleTwoTone>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>
        );}

};*/
