import clsx from 'clsx'
import React from 'react'

export default function BadgeOnline({className} : {className?: string}) {
  return (
    <div className={clsx("bg-success dark:bg-success-dark absolute ring-2 bottom-1 right-0 h-2 w-2 rounded-full ring-white dark:ring-gray-200", className)}></div>
  )
}
