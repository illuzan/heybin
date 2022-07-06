import { LoaderFunction, redirect } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Footer, Header } from '.'

// type kvResponse {}

export const loader: LoaderFunction = async ({ context, params }) => {
  const response = await context.HEYBIN_KV.get(params.slug)
  if (!response) {
    return redirect('/')
  }
  const responseJson = JSON.parse(response)

  if (responseJson.type === 'url') {
    return redirect(responseJson.data)
  } else if (responseJson.type === 'code') {
    return responseJson
  }
  return redirect('/')
}

export default function Code() {
  const data = useLoaderData()

  return (
    <>
      <Header />
      <main className='h-full bg-white rounded-xl overflow-clip'>
        <p className='h-full px-6 py-4 overflow-y-auto font-bold tracking-wide whitespace-pre-wrap'>
          {data.data}
        </p>
      </main>
      <Footer />
    </>
  )
}
