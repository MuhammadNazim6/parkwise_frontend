import React from 'react'

function Instructions({ step, no_ }) {
  return (
    <article className='flex justify-start items-center gap-5'>
      <div className="text-white font-serif">{no_}</div>
      <div className="text-white text-sm">{step}</div>
    </article>
  )
}

export default Instructions