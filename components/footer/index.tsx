import { JSX } from "react";
import { Link } from "@nextui-org/link";
import Image from "next/image";

import { siteConfig } from "@config/site";

export default function Footer(): JSX.Element {
  return (
    <footer className=" dark:text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center max-md:text-center">
        <div className="max-md:flex max-md:w-full max-md:justify-center">
          <div className="flex items-center mb-4">
            <Image
              src="/brain_transparent.png"
              alt="MindGrid Logo"
              width={40}
              height={40}
              className="mr-1"
            />
            <span className="font-bold mr-1">MindGrid</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" color="foreground">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="#" color="foreground">
                Características
              </Link>
            </li>
            <li>
              <Link href="#" color="foreground">
                Precios
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Sígue al desarrollador</h4>
          <div className="flex space-x-4">
            <Link
              href={siteConfig.links.portfolio}
              target="_blank"
              color="foreground"
            >
              Portafolio
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              color="foreground"
            >
              Twitter
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              color="foreground"
            >
              Github
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-base">
        <p>
          &copy; {new Date().getFullYear()} MindGrid. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
