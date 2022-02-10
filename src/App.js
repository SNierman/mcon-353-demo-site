import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  Slider,
  Card,
  Typography,
  Paper,
  CardMedia,
  Grid,
  DialogContentText,
  CardContent,
} from "@mui/material";

import React, { useState } from "react";

function App() {
  //First variable holds value variable, other one changes the value using an already-working function
  /*const [value, setValue] = useState(55);

  function onSliderChange(event) {
    const newValue = event.target.value;
    console.log(newValue);
    setValue(newValue);
  }*/

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" padding={2}>
          Welcome
        </Typography>
        <Typography variant="h5">To Shaindel Nierman's Home Page</Typography>
        <Card
          id="shaindelImg"
          variant="outlined"
          sx={{ width: 800, margin: 4 }}
        >
          <CardMedia
            component="img"
            height="500"
            image="shaindel.jpg"
            alt="shaindel nierman"
            style={{ justifyContent: "center", display: "flex" }}
          />
          <CardContent>
            I am a 20 year old college student majoring in computer science. I
            love the challenge of solving complex coding algorithms and the
            creativity of designing user-friendly websites. Besides coding, I
            enjoy baking and travelling. As yet, I have not been able to do all
            that much travelling, with the time and expenses involved, but one
            day I hope to run around the world and see the sights!
          </CardContent>
        </Card>
        <Paper sx={{ width: 400, margin: 4 }}>
          <Card sx={{ padding: 2 }}>Here are some of my favorite foods:</Card>
        </Paper>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={2} sm={2} margin={1} padding={1}>
            <Card id="chocolate" variant="outlined">
              <CardMedia
                component="img"
                height="140"
                image="chocolate.jpg"
                alt="chocolate"
              />
            </Card>
          </Grid>
          <Grid item xs={2} sm={2} margin={2} padding={1}>
            <Card id="cookies" variant="outlined">
              <CardMedia
                component="img"
                height="140"
                image="cookies.jpg"
                alt="cookies"
              />
            </Card>
          </Grid>
          <Grid item xs={2} sm={2} margin={2} padding={1}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                height="140"
                image="ice cream.jpg"
                alt="ice cream"
              />
            </Card>
          </Grid>
          <Grid item xs={2} sm={2} margin={2} padding={1}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                height="140"
                image="muffins.jpg"
                alt="muffins"
              />
            </Card>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
