import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  // const previous = (await parent).openGraph || [];

  return {
    title: "Articles - WilliamTest",
    description: "List of all articles from the database on WilliamTest.",
    keywords: [],
    openGraph: {
        title: "Articles - WilliamTest",
        description:
          "List of all articles from the database on WilliamTest.",
      },
  };
}

export default function AllArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
