import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from './tailwind.css'

export const meta: MetaFunction = () => {
  return {
    charset: 'utf-8',
    title: 'Heybin',
    description: 'A lightweight pastebin and URL shortener',
    viewport: 'width=device-width,initial-scale=1',
    'og:type': 'website',
    'og:title': 'Heybin',
    'og:url': 'https://www.heyb.in/',
    'og:image': 'https://heyb.in/heybin.webp',
    'og:description': 'A lightweight pastebin and URL shortener',
  }
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>',
    },
    { rel: 'stylesheet', href: styles },
  ]
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='flex flex-col h-screen mx-4 space-y-4 bg-slate-200 text-[#393939]'>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
