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
        {/* {props.message.currUser} */}
        {props.message}
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
  const [currChat, setCurrChat] = useState(
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
        `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${currChat}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.Items);
        });
    },
    1000, // fast polling
    currChat
  );

  //to add chats to api, uses put
  const addMessage = (text) => {
    const newMessages = {
      currChat: currChat,
      text: text,
    };
    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify(newMessages),
    });
    setMessages(newMessages);
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
  const handleRoomSelected = (chatID, chatName) => {
    fetch(
      `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${currChat}/messages`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrChat(data.Items);
      });
    setCurrChat(chatID);
    setCurrChatName(chatName);
  };

  return (
    <div>
      {/* chatroom with chats */}
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
              message={message.text}
              index={index}
              key={index}
            />
          ))}
        </div>
        <div className="create-message">
          <CreateMessage addMessage={addMessage} />
        </div>
      </div>

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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chats}
            label="ChatRoomList"
            defaultValue={""}
          >
            <div>
              {chats.map((chatID, index) => (
                <MenuItem
                  value={chatID}
                  index={index}
                  key={index}
                  onClick={() => handleRoomSelected(chatID)}
                >
                  {chatID.name}
                </MenuItem>
              ))}
            </div>
          </Select>
        </FormControl>
      </Box>
      <NewRoomInput addNewRoom={addNewRoom} />
    </div>
  );
};
