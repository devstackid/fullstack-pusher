import React from 'react'

export default function ContentEmpty() {
  return (
    <div className='order-3 h-screen w-full flex-1 flex-col items-center justify-center sm:flex gap-4 border-l border-secondary hidden'>
      <img src="/images/message-empty.png" alt="message-empty.png" className='w-[200px]' />
      <h5 className='text-xs font-medium text-foreground'>
        Pilih chat untuk menampilkan percakapan
      </h5>
    </div>
  )
}
