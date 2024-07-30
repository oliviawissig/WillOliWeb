import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export type OWUser = {
  id: string;
  email: string;
  username: string;
  image_url: string;
  display_name: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  const docRef = doc(db, "users", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return NextResponse.json(docSnap.data());
  } else {
    console.log("No such document!");
    return new NextResponse("No document found!", { status: 404 });
  }
}
