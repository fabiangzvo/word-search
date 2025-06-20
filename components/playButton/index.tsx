'use client'

import { type JSX, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import copy from 'copy-to-clipboard'

import { INotification } from '@/types/notification'
import { type IGameClient } from '@/types/game'

function PlayButton({ puzzleId }: { puzzleId: string }): JSX.Element {
  const router = useRouter()
  const session = useSession()

  const handlePlay = useCallback(async () => {
    const notification: INotification = {
      message:
        'El enlace del juego se ha copiado al portapapeles. ¡Compártelo con tus amigos y empieza a jugar!',
      settings: {
        type: 'success',
        position: 'top-right',
      },
    }

    try {
      if (session.status === 'unauthenticated') return router.push('/login')

      const response = await fetch('/api/game', {
        method: 'POST',
        body: JSON.stringify({
          puzzle: puzzleId,
          owner: session.data?.user.id ?? '',
        }),
      })

      if (!response.ok && response.status !== 201)
        throw new Error("Couldn't create game")

      const game: IGameClient = await response.json()

      const isCopied = copy(`${window.location.origin}/puzzle/${game._id}`)

      if (!isCopied)
        notification.message =
          '¡Comparte la diversión! Copia esta URL y envíala a tus amigos para que se unan al juego.'

      toast(notification.message, notification.settings)
      router.push(`/puzzle/${game._id}`)

      return
    } catch (e) {
      console.error(e)

      notification.settings.type = 'error'
      notification.message = 'No se ha podido iniciar el juego.'
    }

    toast(notification.message, notification.settings)
  }, [router, session, puzzleId])

  return (
    <Button
      className="font-bold md:absolute md:top-0 md:right-0 max-md:w-full"
      color="primary"
      onPress={handlePlay}
    >
      Jugar
    </Button>
  )
}

export default PlayButton
