import { Link } from '@tanstack/react-router'

import { useState } from 'react'

export type HeaderItem = 'toStart' | 'about' | 'projects'

export default function LayerHeader({ title }: { title: string }) {
  return (
    <>
      <header>
        <div className="grow-1 px-8 pt-16 pb-4">
          <span className="font-bold text-4xl">{title}</span>
        </div>
      </header>
    </>
  )
}
