import { db } from "@/app/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";
import { OWUser } from "./[id]/route";

export async function GET(request: NextRequest) {
  try {
    //get users list query
    const q = query(collection(db, "users"));
    //set list to empty user list
    let users:OWUser[] = [];

    const response = await getDocs(q)
    .then((querySnapshot) => {
      // querySnapshot.docs.map((doc) => doc.data());
      querySnapshot.docs.map((doc) => {
        let userData = {
            email: '',
            id: '',
            username: '',
            image_url: '',
            display_name: ''
        };
        userData.email = doc.data().email;
        userData.id = doc.data().id;
        userData.username = doc.data().username;
        userData.image_url = doc.data().image_url;
        userData.display_name = doc.data().display_name;
        users.push(userData);
      });
    });

    const usersJson = JSON.parse(JSON.stringify(users));

    return NextResponse.json(usersJson);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
