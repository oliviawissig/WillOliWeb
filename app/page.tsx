import "@/app/globals.css";
import OWLink from "./components/OWLink";

export default function Home() {
  return (
    <>
      <h1 className="text-center">{"William's NonSSO -> SSO test"}</h1>
      <p>
        Hello there! This is a site that is used for testing to help
        migrate users back and forth from SSO to nonSSO in an OpenWeb
        experience.
      </p>
      <p>
        Feel free to visit these article pages and check it out for yourself:
      </p>
      <OWLink href="/articles" className="text-2xl">
      Articles
      </OWLink>
    </>
  );
}
