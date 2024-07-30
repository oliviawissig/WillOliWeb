import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const docRef = doc(db, "articles", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json(docSnap.data());
  } else {
    return new NextResponse("No article found!", { status: 404 });
  }
}
