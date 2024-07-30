"use client";
import { useEffect, useState } from "react";
import OWLink from "../components/OWLink";
import { Article } from "../api/articles/route";
import OWProgress from "../components/OWProgress";
import { MessagesCount } from "@open-web/react-sdk";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foo = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles`
      );

      if (response.ok) {
        const tempArticles = await response.json();
        setArticles(tempArticles);
        setLoading(false);
      }
    };
    foo();
  }, []);

  return (
    <>
      <h1 className="text-center">Articles</h1>
      {loading ? (
        <OWProgress />
      ) : (
        <div>
          {articles.map((a, key) => {
            return (
              <div key={key}>
                <OWLink
                  className="capitalize text-xl"
                  href={`/articles/${a.id}`}
                >
                  {a.id}
                </OWLink>
                <h2 className="italic text-base mb-0">by {a.author}</h2>
                <p className="mt-0 text-[14px] text-slate-500">
                  <MessagesCount spotId="sp_BWykFJiw" postId={a.id} /> Comments
                </p>
              </div>
            );
          })}
          {/* <Chip
            icon={<AutoAwesome />}
            label='These article titles & body were generated with ChatGPT using characters from the show "The X Files".'
            variant="outlined"
            color="primary"
          /> */}
        </div>
      )}
    </>
  );
}
