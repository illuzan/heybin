import { ActionFunction, redirect } from '@remix-run/cloudflare'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { nanoid } from 'nanoid/non-secure'
import { useEffect } from 'react'

export const action: ActionFunction = async ({ context, request }) => {
  const formData = await request.formData()
  const textArea = formData.get('text-area')
  const key = nanoid(8)
  const urlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/im

  if (typeof textArea === 'string') {
    if (urlRegex.test(textArea)) {
      const response = { type: 'url', data: textArea }
      const responseJSON = JSON.stringify(response)
      await context.HEYBIN_KV.put(key, responseJSON)
      const url = `${new URL(request.url).origin}/${key}`
      return { type: 'url', data: url, slug: key }
    } else {
      const response = { type: 'code', data: textArea }
      const responseJSON = JSON.stringify(response)
      await context.HEYBIN_KV.put(key, responseJSON)
      return redirect(`/${key}`)
    }
  }
}

export const Header = ({
  showSaveButton = false,
}: {
  showSaveButton?: boolean
}) => {
  return (
    <header className='flex items-center justify-between px-4 py-3 mt-4 text-xl border-b shadow-md bg-neutral-50 rounded-xl'>
      <a
        href='/'
        className='font-semibold text-[#393939] hover:underline  decoration-[#008FF8]'
      >
        <span className='text-[#008FF8]'>&lt;Hey</span>bin/&gt;
      </a>
      {showSaveButton && (
        <button
          form='textareaForm'
          className='text-base'
          type='submit'
          aria-label='Save button'
        >
          {' '}
          <svg
            className='w-6 h-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='#393939'
            viewBox='0 0 256 256'
          >
            <path fill='none' d='M0 0H256V256H0z'></path>
            <path
              fill='none'
              stroke='#393939'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='16'
              d='M216 91.3V208a8 8 0 01-8 8H48a8 8 0 01-8-8V48a8 8 0 018-8h116.7a7.9 7.9 0 015.6 2.3l43.4 43.4a7.9 7.9 0 012.3 5.6z'
            ></path>
            <path
              fill='none'
              stroke='#393939'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='16'
              d='M80 216v-64a8 8 0 018-8h80a8 8 0 018 8v64'
            ></path>
            <path
              fill='none'
              stroke='#393939'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='16'
              d='M152 72L96 72'
            ></path>
          </svg>
        </button>
      )}
    </header>
  )
}

export const Footer = () => {
  return (
    <footer className=' flex justify-between px-4 py-3 !mb-4 text-base font-bold border-b shadow-md bg-neutral-50   rounded-xl'>
      <a className='hover:underline' href='https://gaurav.wtf'>
        {' '}
        © {new Date().getFullYear()} Gaurav Singh
      </a>
      <a
        className='text-[#008FF8] hover:underline'
        href='https://github.com/illuzan/heybin'
      >
        Fork me!
      </a>
    </footer>
  )
}

export default function Index() {
  const actionData = useActionData()
  const transition = useTransition()

  const state: 'idle' | 'success' | 'error' | 'submitting' =
    transition.submission
      ? 'submitting'
      : actionData?.type === 'url'
      ? 'success'
      : actionData?.error
      ? 'error'
      : 'idle'

  useEffect(() => {
    const handleClick = (event) => {
      if (
        (window.navigator.platform.match('Mac')
          ? event.metaKey
          : event.ctrlKey) &&
        event.keyCode == 83
      ) {
        event.preventDefault()
        document.getElementById('textareaForm').submit()
      }
    }
    document.addEventListener('keydown', handleClick)

    return () => {
      document.removeEventListener('keydown', handleClick)
    }
  }, [])

  return (
    <>
      <Header showSaveButton={true} />
      <main className='h-full bg-white border-b shadow-md rounded-xl'>
        <Form
          replace
          method='post'
          id='textareaForm'
          className='h-full'
          hidden={state === 'success'}
        >
          <textarea
            className='w-full h-full px-6 py-4 font-semibold tracking-wide bg-white outline-none resize-none rounded-xl disabled:opacity-75'
            placeholder='> Paste, save, share! (Pasting just a URL will shorten it!)'
            required={true}
            name='text-area'
            tabIndex={state === 'success' ? -1 : 0}
          ></textarea>
        </Form>
        <div
          hidden={state !== 'success'}
          className='w-full h-full px-6 py-4 font-semibold tracking-wide bg-white outline-none resize-none rounded-xl disabled:opacity-75'
        >
          {}
          <span>
            Your shortened url is:{' '}
            <a
              className='text-[#008FF8] hover:underline'
              href={actionData?.slug ? `/${actionData.slug}` : '/'}
            >
              {actionData?.data}
            </a>
          </span>
        </div>
      </main>
      <Footer />
    </>
  )
}
