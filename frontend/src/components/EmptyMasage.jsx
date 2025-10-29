import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from '@heroui/react'

function EmptyMasage({ imageSrc, message }) {
  return (
    <div className="flex flex-col items-center justify-around gap-3 py-3">
      <Image alt="Shopping Bag" src={imageSrc} width={300} />
      <p className="mb-5">{message}</p>
      <Button
        as={Link}
        to={'/brands'}
        className="rounded-lg bg-gray-950 from-cyan-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-gradient-to-r"
      >
        Continue Shopping
      </Button>
    </div>
  )
}

export default EmptyMasage
