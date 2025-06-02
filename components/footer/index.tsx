import { type JSX } from 'react'
import { Link } from '@heroui/link'
import Image from 'next/image'
import { twMerge } from "tailwind-merge";

import { siteConfig } from '@config/site'

import type { FooterProps } from "./types";

export default function Footer({ classname }: FooterProps): JSX.Element {
  return (
    <footer className={twMerge("dark:text-gray-300 py-12 px-6", classname)}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center max-md:text-center">
        <div className="max-md:flex max-md:w-full max-md:justify-center">
          <div className="flex items-center mb-4">
            <Image
              alt="MindGrid Logo"
              className="mr-1"
              height={40}
              src="/brain_transparent.png"
              width={40}
            />
            <span className="font-bold mr-1">MindGrid</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2">
            <li>
              <Link color="foreground" href="/">
                Inicio
              </Link>
            </li>
            <li>
              <Link color="foreground" href="/#features">
                Características
              </Link>
            </li>
            <li>
              <Link color="foreground" href="/#how-it-works">
                Cómo funciona
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Sigue al creador</h4>
          <div className="flex space-x-4">
            <Link
              color="foreground"
              href={siteConfig.links.portfolio}
              target="_blank"
            >
              Portafolio
            </Link>
            <Link
              color="foreground"
              href={siteConfig.links.twitter}
              target="_blank"
            >
              Twitter
            </Link>
            <Link
              color="foreground"
              href={siteConfig.links.github}
              target="_blank"
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
  )
}
