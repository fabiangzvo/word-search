'use client'

import { type JSX, useCallback } from 'react'
import { Button } from '@heroui/react'
import { ChevronRight } from 'lucide-react'

export default function ClientButton(): JSX.Element {
  const handleClick = useCallback(() => {
    window.location.href = '#register'
  }, [])

  return (
    <Button color="primary" size="lg" onPress={handleClick}>
      Juega Ahora
      <ChevronRight />
    </Button>
  )
}
