// "use client";
// import { useState } from "react";
// import { UserAuth } from "../Context/AuthContext";
// import "./signUp.css";

// const page = ({ onSubmit }) => {
//   const { createUser, errorMessage, addDataToFireStore } = UserAuth();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [type, setType] = useState("");

//   console.log("this is the value in state", type);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createUser(email, password);

//     console.log("this is the value in handleSubmit", type);

//     const added = addDataToFireStore(name, email, type, password);

//     console.log("result is: ", added);

//     if (added) {
//       setName("");
//       setEmail("");
//       setType("");

//       alert("Account Created");
//     }
//     console.log(email, password);
//     // googleSignIn(email, password);
//   };

//   return (
//     <>
//       <div>{errorMessage ? <h1>email already in use </h1> : <h1></h1>}</div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="">
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>

//         <label>
//           Category:
//           <select
//             name="Type of customer"
//             id=""
//             onChange={(e) => {
//               setType(e.target.value);
//               console.log("Selected type:", e.target.value);
//             }}
//           >
//             <option value=""></option>
//             <option value="Borrower">Borrower</option>
//             <option value="Owner">Owner</option>
//           </select>
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <button type="submit">Create Account</button>
//       </form>
//     </>
//   );
// };

// export default page;

"use client";
import React from "react";
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  TextField,
  Select,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import "./signUp.css";
import { CheckBox } from "@mui/icons-material";

const page = ({ onSubmit }) => {
  const { createUser, errorMessage, addDataToFireStore } = UserAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  console.log("this is the value in state", type);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(email, password);

    console.log("this is the value in handleSubmit", type);

    const added = addDataToFireStore(name, email, type, password);

    console.log("result is: ", added);

    if (added) {
      setName("");
      setEmail("");
      setType("");

      alert("Account Created");
    }
    console.log(email, password);
    // googleSignIn(email, password);

    // function handleSelect(e) {
    //   (e) => setType(e.target.value);
    // }
  };

  return (
    <Card className="centered-card">
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            <b>Sign Up</b>
          </Typography>
          {errorMessage ? (
            <Typography color="error">{errorMessage}</Typography>
          ) : null}
          <form onSubmit={handleSubmit} className="centered-card">
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Select
              style={{ marginTop: "10px" }}
              label="Type Of Customer"
              value={type}
              onChange={(e) => setType(e.target.value)}
              // fullWidth
              margin="normal"
            >
              <option value="Borrower" style={{ cursor: "pointer" }}>
                Borrower
              </option>
              <option value="Owner" style={{ cursor: "pointer" }}>
                Owner
              </option>
            </Select>

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            >
              Create Account
            </Button>
          </form>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default page;
