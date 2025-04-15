'use client'

import { type JSX, useMemo, useCallback } from 'react'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from '@heroui/navbar'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { link as linkStyles } from '@heroui/theme'
import NextLink from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'
import { GithubIcon } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { siteConfig } from '@config/site'
import ThemeSwitch from '@components/themeSwitch'
import SearchInput from '@components/searchInput'

const loginButton = (
  <Button prefetch as={NextLink} color="primary" href="/login" variant="flat">
    Iniciar Sesión
  </Button>
)

export default function Navbar(): JSX.Element {
  const session = useSession()

  const logout = useCallback(async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }, [])

  const logoutButton = (
    <Button color="primary" href="/login" variant="flat" onPress={logout}>
      Cerrar sesión
    </Button>
  )

  const items = useMemo(
    () =>
      siteConfig.navItems.slice(1).map((item) => (
        <NavbarItem key={item.href}>
          <NextLink
            prefetch
            className={clsx(
              linkStyles({ color: 'foreground' }),
              'data-[active=true]:text-primary data-[active=true]:font-medium'
            )}
            color="foreground"
            href={item.href}
          >
            {item.label}
          </NextLink>
        </NavbarItem>
      )),
    []
  )

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href={session.data?.user.id ? '/dashboard' : '/'}
          >
            <Image
              alt="BrainWord Logo"
              height={50}
              src="/brain_transparent.png"
              width={50}
            />
            <p className="font-bold text-inherit">MindGrid</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">{items}</ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <SearchInput />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {session.status === 'authenticated' ? logoutButton : loginButton}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <SearchInput />
        <div className="mx-4 mt-2 flex flex-col gap-2 items-center">
          {items}
        </div>
        {session.status === 'authenticated' ? logoutButton : loginButton}
      </NavbarMenu>
    </NextUINavbar>
  )
}
