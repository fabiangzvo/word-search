'use client'

import { Button } from '@nextui-org/react'
import { ChevronRight } from 'lucide-react'

export default function ClientButton() {
  const handleClick = () => {
    window.location.href = '#register'
  }

  return (
    <Button color="primary" size="lg" onClick={handleClick}>
      Juega Ahora
      <ChevronRight />
    </Button>
  )
}
