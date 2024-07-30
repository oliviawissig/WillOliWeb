import { collection, getDocs, query, where } from "firebase/firestore";
import { OWUser } from "../api/users/[id]/route";
import { db } from "../firebase/config";

export async function verifyDisplayName(displayName: string) {
  //////////////////////////////////////////////////
  //3. CHECK IF DISPLAY NAME IS LEGAL
  // - greater than 3 chars, less than 30 characters
  //////////////////////////////////////////////////

  // Check if the string length exceeds 30 characters
  if (displayName.length > 30 || displayName.length < 2) {
    return "Display Name cannot exceed 30 characters, and must be more than 3";
  }

  // Check if the string contains only valid characters (letters, numbers, special characters, and spaces)
  const validCharsRegex =
    /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>~`_+\-=\[\]\\';/]+$/;
  if (!validCharsRegex.test(displayName)) {
    return "Sorry, these language characters are not supported";
  }

  return "success";
}

export async function verifyUsername(username: string) {
  //////////////////////////////////////////////////
  //2. CHECK IF USERNAME EXISTS
  //////////////////////////////////////////////////
  const q2 = query(collection(db, "users"), where("username", "==", username));
  let user: OWUser = {
    id: "",
    username: "",
    email: "",
    image_url: "",
    display_name: "",
  };

  const response2 = await getDocs(q2).then((querySnapshot) => {
    // querySnapshot.docs.map((doc) => doc.data());
    querySnapshot.docs.map((doc) => {
      user.email = doc.data().email;
      user.id = doc.data().id;
      user.username = doc.data().username;
      user.image_url = doc.data().image_url;
      user.display_name = doc.data().display_name;
    });
  });

  if (user.id !== "") {
    return "User with username already exists";
  }

  //////////////////////////////////////////////////
  //3. CHECK IF USERNAME IS LEGAL
  // - greater than 3 chars, less than 30 characters
  // - no spaces, tabs, or ASCII characters
  // - no special characters (i.e. < and >)
  //////////////////////////////////////////////////

  if (username.length < 3 || username.length > 29) {
    return "Username has to be more than 3 characters, and less than 30";
  }

  // Check for delimiters
  const delimiterRegex = /^[\s\t\r\n]+$/;
  if (delimiterRegex.test(username)) {
    return "Username cannot have delimiters";
  }

  // Check for special characters
  const specialCharRegex = /[<>!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
  if (specialCharRegex.test(username)) {
    return "Username cannot have special characters";
  }

  // Check if it is comprised only of foreign language characters
  // Assuming "foreign-language characters" means any non-ASCII characters
  const nonAsciiRegex = /^[^\x00-\x7F]+$/;
  if (nonAsciiRegex.test(username)) {
    return "Sorry, these language characters are not supported";
  }

  return "success";
}

export async function verifyEmail(email: string) {
  //////////////////////////////////////////////////
  //1. CHECK IF EMAIL EXISTS
  //////////////////////////////////////////////////
  const q = query(collection(db, "users"), where("email", "==", email));
  let user: OWUser = {
    id: "",
    username: "",
    email: "",
    image_url: "",
    display_name: "",
  };

  const response = await getDocs(q).then((querySnapshot) => {
    // querySnapshot.docs.map((doc) => doc.data());
    querySnapshot.docs.map((doc) => {
      user.email = doc.data().email;
      user.id = doc.data().id;
      user.username = doc.data().username;
      user.image_url = doc.data().image_url;
      user.display_name = doc.data().display_name;
    });
  });

  if (user.id !== "") {
    return "User with email already exists";
  }

  //////////////////////////////////////////////////
  //1. CHECK IF EMAIL IS CORRECT FORMAT
  //////////////////////////////////////////////////
  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Email is not in the correct format";
  }

  return "success";
}
