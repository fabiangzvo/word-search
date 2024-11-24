import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

import { siteConfig } from "@config/site";
import { title, subtitle } from "@components/primitives";
import { GithubIcon } from "@components/icons";

import { createWordSearch } from "./actions";

export default async function Home() {
  const response = await createWordSearch();
  console.log(response);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link isExternal href={siteConfig.links.docs}>
          Documentation
        </Link>
        <Button color="primary">
          <GithubIcon size={20} />
          GitHub
        </Button>
      </div>

      <div className="mt-8">{JSON.stringify(response)}</div>
    </section>
  );
}
