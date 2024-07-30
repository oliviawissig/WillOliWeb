import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${params.slug}`
  );

  // fetch data
  const tempArticle = await response.json();

  // optionally access and extend (rather than replace) parent metadata
  // const previous = (await parent).openGraph || [];

  return {
    title: tempArticle.title,
    keywords: tempArticle.keywords,
    authors: [{ name: tempArticle.author }],
    description: `An article about ${tempArticle.title}`,
    openGraph: {
      title: tempArticle.title,
      authors: [tempArticle.author],
      url: `http://oliviaweb.oliviawissig.com/articles/${tempArticle.id}`,
      images: [
        {
          url: tempArticle.image_url, // Must be an absolute URL
          width: 750,
          height: 500,
        },
      ],
      locale: "en_US",
    },
  };
}

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
