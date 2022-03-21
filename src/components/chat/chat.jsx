import React, { useState, useContext } from "react";
import { useInterval } from "../../hooks/use-interval";
import {
  Container,
  TextField,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@mui/material";

function Message(props) {
  return (
    <Box
      className="message"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      <Paper style={{ marginBottom: "1rem", padding: ".5rem" }}>
        {props.message.currUser}
        {props.message.text}
      </Paper>
    </Box>
  );
}

function ChatRoom(props) {
  const [messages, setMessages] = useState([]);

  const addMessage = (text, currUser) => {
    const newMessages = [...messages, { text, currUser }];
    setMessages(newMessages);
  };

  useInterval(
    (params) => {
      const chatId = params[0];
      fetch(
        `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${chatId}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.Items);
        });
    },
    1000, // fast polling
    //60000, // slow polling
    props.id
  );

  return (
    <div
      style={{
        width: "40vw",
        margin: "auto",
        padding: "20px 10px 20px 20px",
      }}
    >
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            style={{ flexShrink: 1 }}
            message={message}
            index={index}
            key={index}
          />
        ))}
      </div>
      <div className="create-message">
        <CreateMessage addMessage={addMessage} />
      </div>
    </div>
  );
}

function CreateMessage({ addMessage }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    addMessage(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Container minwidth={2000}>
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
          placeholder="Say something..."
          onChange={(e) => setValue(e.target.value)}
          fullWidth
        />
      </Container>
    </form>
  );
}

function ChatList(props) {
  const [chats, setChats] = React.useState([]);

  // const handleChange = (event) => {
  //   setChats(event.target.chats);
  //   //setChat(currChat);
  // };

  // const setChat = (chatID) => {
  //   const thisChat = [chats, { chatID }];
  //   setCurrChat(thisChat);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!chats) return;

  //   addChat(chats);
  //   setChats("");
  // };

  useInterval(
    () => {
      fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`)
        .then((response) => response.json())
        .then((data) => {
          setChats(data.Items);
        });
    },
    1000 // fast polling
    //60000 // slow polling
  );

  return (
    <Box
      style={{
        width: "7rem",
        float: "left",
        margin: "2rem",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chats</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chats}
          label="ChatRoomList"
          //onChange={() => handleChange}
        >
          <div>
            {chats.map((chatID, index) => (
              <MenuItem
                value={chatID}
                index={index}
                key={index}
                onClick={() => props.setCurrChat(chatID)}
              >
                {chatID.name}
              </MenuItem>
            ))}
          </div>
        </Select>
      </FormControl>
      {/*<form onSubmit={handleSubmit}>
        <Container minwidth={2000}>
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
            value={chats}
            placeholder="New chatname..."
            onChange={(e) => setChats(e.target.chats)}
            fullWidth
          />
        </Container>
          </form>*/}
    </Box>
  );
}

function CreateChatRoom() {
  const [chats, setChats] = useState([]);
}

function UserList() {
  const [users, setUsers] = React.useState([]);
  const [currUser, setCurrUser] = useState({});

  const setUser = (userID) => {
    const thisUser = [currUser, { userID }];
    setCurrUser(thisUser);
  };

  const handleChange = (event) => {
    setUsers(event.target.value);
  };

  return (
    <Box
      style={{
        width: "7rem",
        float: "right",
        margin: "2rem",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Users</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={users}
          label="UserList"
          onChange={handleChange}
        >
          <div>
            {users.map((user, index) => (
              <MenuItem value={user} index={index} key={index}>
                {user}
              </MenuItem>
            ))}
          </div>
        </Select>
      </FormControl>
    </Box>
  );
}

function CreateChat({}) {
  const [currChat, setCurrChat] = useState({});

  return (
    <div>
      <ChatList value={(currChat, setCurrChat)} />
      <UserList />
      <ChatRoom value={currChat} />
    </div>
  );
}

export const Chat = () => {
  return <CreateChat />;
};
