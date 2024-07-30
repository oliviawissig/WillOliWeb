import { db } from "@/app/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export type Article = {
  id: string;
  content: string;
  author: string;
  published: string;
  title: string;
};

export async function GET(request: NextRequest) {
  const q = query(collection(db, "articles"));
  let articles: Article[] = [];

  const response = await getDocs(q).then((querySnapshot) => {
    // querySnapshot.docs.map((doc) => doc.data());
    querySnapshot.docs.map((doc) => {
      let articleData = {
        id: '',
        content: '',
        author: '',
        published: '',
        title: '',
      };
      articleData.id = doc.data().id;
      articleData.content = doc.data().content;
      articleData.author = doc.data().author;
      articleData.title = doc.data().title;
      articleData.published = doc.data().published;
      articles.push(articleData);
    });
  });

  const usersJson = JSON.parse(JSON.stringify(articles));

  return NextResponse.json(usersJson);
}
