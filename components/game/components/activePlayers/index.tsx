'use client'

import { JSX, useMemo } from 'react'
import { Chip } from '@heroui/chip'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Listbox, ListboxItem } from '@heroui/listbox'
import Avatar from '@components/avatar'
import { mappedColors } from '@config/colors'

import { type ActivePlayersProps } from './types'

function ActivePlayers(props: ActivePlayersProps): JSX.Element {
  const {
    users,
    shadow = 'lg',
    showHeader = true,
    hideEmptyContent = false,
  } = props

  const userList = useMemo(
    () =>
      users.map(({ user, color, endContent, initialName }, i) => (
        <ListboxItem
          key={user._id}
          startContent={
            <Avatar
              isBordered
              showFallback
              avatarColor={mappedColors[color]}
              name={initialName || user?.name?.at(0)}
              size="sm"
            />
          }
          title={user?.name}
          endContent={endContent}
        />
      )),
    [users]
  )

  return (
    <Card className="max-xl:w-full" shadow={shadow}>
      {showHeader && (
        <CardHeader className="flex justify-between">
          <h2 className="text-xl font-bold">Jugadores</h2>
          <Chip color="primary" radius="sm" variant="flat">
            {users.length} En linea
          </Chip>
        </CardHeader>
      )}
      <CardBody>
        <Listbox
          disallowEmptySelection
          aria-label="active users"
          className="pointer-events-none"
          itemClasses={{
            base: 'mb-2 bg-primary-50 p-3 dark:bg-opacity-5',
            title: 'ml-2 font-kanit',
          }}
          selectionMode="multiple"
          variant="flat"
          classNames={{
            emptyContent: 'text-center',
          }}
          hideEmptyContent={hideEmptyContent}
          emptyContent="No hay jugadores"
        >
          {userList}
        </Listbox>
      </CardBody>
    </Card>
  )
}

export default ActivePlayers
