export default function Index() {
  return (
    <>
      <header className='flex items-center justify-between px-4 py-3 mt-4 text-xl border-b shadow-md bg-neutral-50 rounded-xl'>
        <a href='/' className='font-semibold text-[#393939] '>
          <span className='text-[#008FF8]'>&lt;Hey</span>bin/&gt;
        </a>
        <button className='text-base'>
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
      </header>
      <main className='h-full bg-white rounded-xl'>
        <textarea
          className='w-full h-full px-6 py-4 font-bold bg-white outline-none resize-none rounded-xl'
          placeholder='> Paste, save, share! (Pasting just a URL will shorten it!)'
        ></textarea>
      </main>
      <footer className='flex justify-between px-4 py-3 !mb-4 text-xs font-bold bg-neutral-50 sm:text-base text-amber rounded-xl'>
        <a href='https://gaurav-singh.com'>
          {' '}
          © {new Date().getFullYear()} Gaurav Singh
        </a>
        <a href='https://github.com/illuzan/heybin'>Fork me!</a>
      </footer>
    </>
  )
}
