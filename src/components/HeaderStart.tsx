import { Link } from '@tanstack/react-router'

import { useState } from 'react'

export type HeaderItem = 'toStart' | 'about' | 'projects'

export default function HeaderStart() {
  return (
    <>
      <header>
        <nav className="flex justify-end font-bold text-2xl">
          <div className="px-8 pt-16 pb-4">
            <Link to="/home" className="hover:text-white text-black">
              To Start
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}
