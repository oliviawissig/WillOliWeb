import { db } from "@/app/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  await setDoc(doc(db, "users", body.id), {
    email: body.email,
    username: body.username,
    id: body.id,
    display_name: body.display_name
  });

  return NextResponse.json({
    email: body.email,
    username: body.username,
  });
}
