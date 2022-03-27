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
  List,
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
      defaultValue=""
    >
      <Paper style={{ marginBottom: "1rem", padding: ".5rem" }}>
        {props.userName}
        {props.text}
      </Paper>
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
        <TextField
          sx={{ input: { color: "white" } }}
          variant="standard"
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "40px",
          }}
          className="textfield"
          value={message}
          placeholder="Say something..."
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
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
        placeholder="Enter chatroom name..."
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
    </form>
  );
}

export const Chat = () => {
  const [currChatId, setCurrChatId] = useState(
    "975a3df9-c9b0-4e90-933e-52628736bdd5"
  );
  const [currChatName, setCurrChatName] = useState("Chat");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [currUser, setCurrUser] = useState("");

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
      userName: currUser,
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

  return (
    <div>
      {/* chatlist */}
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
          <InputLabel id="demo-simple-select-label">{currChatName}</InputLabel>
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
      {/* chatroom with chats */}
      <div
        style={{
          width: "40vw",
          margin: "auto",
          padding: "20px 10px 20px 20px",
        }}
      >
        <div className="messages">
          {messages
            .slice(0)
            .reverse()
            .map((message, index) => (
              <Message
                style={{ flexShrink: 1 }}
                userName={message.userName}
                index={index}
                key={index}
                text={message.text}
              />
            ))}
        </div>
        <div className="create-message">
          <CreateMessage addMessage={addMessage} />
        </div>
      </div>
    </div>
  );
};
