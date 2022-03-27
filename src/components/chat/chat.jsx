import React, { useState, useContext } from "react";
import { useInterval } from "../../hooks/use-interval";
import "./chat.css";
import {
  Container,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/Send";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

function Message(props) {
  return (
    <Box
      className="message"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
      defaultValue=""
      style={{
        justifyContent:
          props.username == props.currUser ? "flex-end" : "flex-start",
      }}
    >
      <h6 style={{ color: "lightBlue" }}>{props.username}</h6>
      <Chip
        style={{
          marginBottom: "1rem",
          padding: ".5rem",
          background: props.username == props.currUser ? "#FFCB55" : "white",
        }}
        label={props.text}
      />
    </Box>
  );
}

function CreateMessage({ addMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    addMessage(message);
    setMessage("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Container minwidth={2000}>
        <IconButton onClick={handleSubmit} style={{ float: "right" }}>
          <SendRoundedIcon />
        </IconButton>
        <TextField
          sx={{ input: { color: "white" } }}
          variant="standard"
          style={{
            justifyContent: "center",
            display: "flex",
          }}
          className="textfield"
          value={message}
          placeholder="Say something..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </Container>
    </form>
  );
}

function NewRoomInput({ addNewRoom }) {
  const [room, setRoom] = useState("");

  const newRoomInput = (e) => {
    e.preventDefault();
    if (!newRoomInput) return;
    addNewRoom(room);
    setRoom("");
  };

  return (
    <form onSubmit={newRoomInput}>
      <TextField
        sx={{ input: { color: "white" } }}
        placeholder="Add chatroom..."
        value={room}
        variant="standard"
        onChange={(e) => setRoom(e.target.value)}
        style={{
          marginTop: "3rem",
          marginBottom: "4rem",
          marginLeft: "4rem",
          float: "left",
        }}
      />
      <IconButton
        onClick={newRoomInput}
        style={{ float: "right", marginTop: "2.5rem", marginRight: "4.5rem" }}
      >
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </form>
  );
}

function NewUserInput({ addNewUser }) {
  const [username, setUsername] = useState("");

  const newUserInput = (e) => {
    e.preventDefault();
    if (!newUserInput) return;
    addNewUser(username);
    setUsername("");
  };

  return (
    <form onSubmit={newUserInput}>
      <TextField
        sx={{ input: { color: "white" } }}
        placeholder="Add username..."
        value={username}
        variant="standard"
        onChange={(e) => setUsername(e.target.value)}
        style={{
          marginLeft: "4rem",
          marginTop: "3rem",
          float: "left",
        }}
      />
      <IconButton
        onClick={newUserInput}
        style={{ float: "right", marginTop: "2.5rem", marginRight: "4.5rem" }}
      >
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </form>
  );
}

export const Chat = () => {
  const [currChatId, setCurrChatId] = useState(
    "975a3df9-c9b0-4e90-933e-52628736bdd5"
  );
  const [currChatName, setCurrChatName] = useState("Touro");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [currUser, setCurrUser] = useState("User");
  const [users, setUsers] = useState([]);

  //get chatroom list
  useInterval(
    () => {
      fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`)
        .then((response) => response.json())
        .then((data) => {
          setChats(data.Items);
        });
    },
    1000 // fast polling
  );

  //get chats from chatroom
  useInterval(
    () => {
      fetch(
        `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${currChatId}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.Items);
        });
    },
    1000, // fast polling
    currChatId
  );

  //to add chats to api, uses put
  const addMessage = (text) => {
    const newMessage = {
      chatId: currChatId,
      username: currUser,
      text: text,
    };

    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify(newMessage),
    });
  };

  //to add chatroom to api list
  const addNewRoom = (name) => {
    const chat = {
      name: name,
    };
    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify(chat),
    });
    setCurrChatId(chat);
    setCurrChatName(name);
  };

  const addNewUser = (username) => {
    setCurrUser(username);
    setUsers([...users, username]);
  };

  //need to make a method to fetch the api data from current chatroom when it is clicked. this is called
  // in onclick method
  const handleRoomSelected = (chatId, chatName) => {
    fetch(
      `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${chatId}/messages`
    )
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.Items);
      });
    setCurrChatId(chatId);
    setCurrChatName(chatName);
  };

  const handleUserSelected = (username) => {
    setCurrUser(username);
  };

  return (
    <div>
      {/* chatroom with chats */}
      <div>
        <div
          style={{
            width: "50rem",
            height: "20rem",
            padding: "20px 10px 20px 20px",
            float: "right",
            marginRight: "10rem",
          }}
        >
          <Box
            class="messages"
            style={{
              maxHeight: "25rem",
              minHeight: "25rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              background: "#114E5A",
              overflowY: "scroll",
              borderRadius: "5px",
              outline: "#114E5A solid 20px",
              marginBottom: "1rem",
            }}
          >
            {messages
              .slice(0)
              .reverse()
              .map((message, index) => (
                <Message
                  style={{
                    flexShrink: 1,
                    float: message.username == currUser ? "right" : "left",
                  }}
                  username={message.username}
                  index={index}
                  key={index}
                  text={message.text}
                  currUser={currUser}
                />
              ))}
          </Box>
          <div className="create-message" style={{ paddingTop: "1rem" }}>
            <CreateMessage addMessage={addMessage} />
          </div>
        </div>
      </div>
      {/* chatlist */}
      <Box
        style={{
          width: "7rem",
          margin: "2rem",
          marginLeft: "4rem",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <FormControl
          fullWidth
          style={{
            float: "left",
            marginTop: "2rem",
            background: "white",
            borderRadius: "10px",
          }}
        >
          <InputLabel id="demo-simple-select-label" style={{}}>
            {currChatName}
          </InputLabel>
          <Select>
            <div>
              {chats.map((chat, index) => (
                <MenuItem
                  index={index}
                  key={index}
                  name={chat.name}
                  id={chat.id}
                  onClick={() => handleRoomSelected(chat.id, chat.name)}
                >
                  {chat.name}
                </MenuItem>
              ))}
            </div>
          </Select>
        </FormControl>
      </Box>
      <NewRoomInput addNewRoom={addNewRoom} />

      <Box
        style={{
          width: "7rem",
          margin: "2rem",
          marginLeft: "4rem",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <FormControl
          fullWidth
          style={{
            float: "left",
            marginTop: "2rem",
            background: "white",
            borderRadius: "10px",
          }}
        >
          <InputLabel>{currUser}</InputLabel>
          <Select>
            <div>
              {users.map((username, index) => (
                <MenuItem
                  index={index}
                  key={index}
                  username={username}
                  onClick={() => handleUserSelected(username)}
                >
                  {username}
                </MenuItem>
              ))}
            </div>
          </Select>
        </FormControl>
      </Box>
      <NewUserInput addNewUser={addNewUser} />
    </div>
  );
};
