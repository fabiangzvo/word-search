import React, { useState, useEffect } from 'react'

interface PlayerJoinNotificationProps {
  playerName: string
}

export const PlayerJoinNotification: React.FC<PlayerJoinNotificationProps> = ({
  playerName,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-emerald-500 dark:bg-fuchsia-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
      {playerName} has joined the game!
    </div>
  )
}
