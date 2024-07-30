"use client";
import { Alert, Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import OWTextField from "../components/OWTextField";
import OWButton from "../components/OWButton";
import { ArrowForward } from "@mui/icons-material";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    const res = await SignInWithEmailAndPassword(email, password);

    if (!res) {
      setLoading(false);
      setError("Cannot sign in with those credentials");
    } else {
      console.log({ res });
      sessionStorage.setItem("userId", res.user.uid);
      setEmail("");
      setPassword("");
      router.push("/");
    }
  };

  return (
    <div
      id="log-in-form"
      className="flex flex-col w-1/2 m-auto mt-16 max-[600px]:w-11/12"
    >
      <h1 className="roboto-regular text-lg pb-5">Sign In:</h1>
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
          id="outlined-password-input"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Alert severity="error">Error signing in! {error}</Alert>}

        <div className="m-auto">
          <OWButton startIcon={<ArrowForward />} onClick={() => handleSignIn()}>
            {loading ? (
              <CircularProgress disableShrink color="inherit" size={30} />
            ) : (
              "Sign In"
            )}
          </OWButton>
        </div>
      </Box>
    </div>
  );
};

export default SignInPage;
