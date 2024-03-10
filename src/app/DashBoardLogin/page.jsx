"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "../Context/AuthContext";
import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  TextField,
  FormControlLabel,
  Button,
} from "@mui/material";
import "./page.css";

const page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function gotToDashBoard() {
    router.push("./Dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUsers = [
      { name: "Ashwin Kapile", password: "12345" },
      { name: "Atharva Kurumbhatte", password: "12345" },
      { name: "Atharva Chakankar", password: "12345" },
      { name: "Tanish Kinkar", password: "12345" },
    ];

    const user = validUsers.find(
      (user) => user.name === name && user.password === password
    );

    if (user) {
      alert(`Welcome, ${user.name}!`);
      gotToDashBoard();
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  // function gotToDashBoard() {
  //   router.push("./Dashboard");
  // }

  return (
    <Card className="centered-card">
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            <b>Login To Your DashBoard</b>
          </Typography>
          {/* {errorMessage ? (
            <Typography color="error">{errorMessage}</Typography>
          ) : null} */}
          <form className="centered-card">
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "15px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default page;
