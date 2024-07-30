"use client";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { deleteUser } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { OWUser } from "../api/users/[id]/route";
import OWTextField from "../components/OWTextField";
import OWButton from "../components/OWButton";
import { ArrowForward } from "@mui/icons-material";
import {
  verifyEmail,
  verifyDisplayName,
  verifyUsername,
} from "../components/ValidationHandler";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [overallLoading, setLoading] = useState(false);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    const emailResMsg = await verifyEmail(email);
    if (emailResMsg != "success") {
      setError(emailResMsg);
      setLoading(false);
      return;
    }

    const usernameResMsg = await verifyUsername(username);
    if (usernameResMsg != "success") {
      setError(usernameResMsg);
      setLoading(false);
      return;
    }

    const displayNameResMsg = await verifyDisplayName(displayName);
    if (displayNameResMsg != "success") {
      setError(displayNameResMsg);
      setLoading(false);
      return;
    }

    //////////////////////////////////////////////////
    // ATTEMPT TO CREATE USER 
    //////////////////////////////////////////////////

    const res = await createUserWithEmailAndPassword(email, password);
    if (!res) {
      setLoading(false);
      setError("Cannot create a user with those credentials");
    } else {
      const userData = {
        email: email,
        username: username,
        id: res.user.uid,
        display_name: displayName,
      };

      const response3 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          cache: "no-store",
        }
      );

      setLoading(false);
      if (response3.ok) {
        //clear form
        sessionStorage.setItem("userId", res.user.uid);
        setEmail("");
        setUsername("");
        setPassword("");
        setDisplayName("");
        router.push("/");
      } else {
        setError(response3.statusText);
      }
    }
  };

  return (
    <div
      id="log-in-form"
      className="flex flex-col w-1/2 m-auto mt-16 max-[600px]:w-11/12"
    >
      <h1 className="roboto-regular text-lg pb-5">Sign Up / Register:</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex flex-col"
        rowGap={3}
      >
        <OWTextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <OWTextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />

        <OWTextField
          id="outlined-basic"
          label="Display Name"
          variant="outlined"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <OWTextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Alert severity="error">Error creating user! {error}</Alert>}

        <div className="m-auto">
          <OWButton startIcon={<ArrowForward />} onClick={() => handleSignUp()}>
            {overallLoading ? (
              <CircularProgress disableShrink color="inherit" size={30} />
            ) : (
              "Register"
            )}
          </OWButton>
        </div>
      </Box>
    </div>
  );
};

export default RegisterPage;
