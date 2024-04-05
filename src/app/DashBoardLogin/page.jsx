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
import { useSignUp } from "../Context/SignupContext";

const page = () => {
  const router = useRouter();
  // const [adminName, setAdminName] = useState("");
  // const [adminPassword, setAdminPassword] = useState("");

  const { adminName, adminPassword, handleName, handlePassword } = useSignUp();

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
      (user) => user.name === adminName && user.password === adminPassword
    );

    if (user) {
      alert(`Welcome, ${user.name}!`);
      gotToDashBoard();
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  // function handleName(e) {
  //   setAdminName(e.target.value);
  // }
  // function handlePassword(e) {
  //   setAdminPassword(e.target.value);
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
              value={adminName}
              onChange={handleName}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password"
              type="password"
              value={adminPassword}
              onChange={handlePassword}
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
