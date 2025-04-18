'use client'

import { type JSX, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { insertGame } from '@queries/game'

import { INotification } from '@/types/notification'

function PlayButton({ puzzleId }: { puzzleId: string }): JSX.Element {
  const router = useRouter()
  const session = useSession()

  const handlePlay = useCallback(async () => {
    const notification: INotification = {
      message:
        'El enlace del juego se ha copiado al portapapeles. ¡Compártelo con tus amigos y empieza a jugar!',
      settings: {
        type: 'success',
      },
    }

    try {
      if (session.status === 'unauthenticated') return router.push('/login')
      const game = await insertGame({
        puzzle: puzzleId,
        users: [session.data?.user.id ?? ''],
      })

      await navigator.clipboard.writeText(
        `${window.location.origin}/puzzle/${game._id}`
      )

      toast(notification.message, notification.settings)
      router.push(`/puzzle/${game._id}`)

      return
    } catch (e) {
      console.error(e)

      notification.settings.type = 'error'
      notification.message = 'No se ha podido crear el juego.'
    }

    toast(notification.message, notification.settings)
  }, [router, session, puzzleId])

  return (
    <Button className="font-bold" color="primary" onPress={handlePlay}>
      Jugar
    </Button>
  )
}

export default PlayButton
