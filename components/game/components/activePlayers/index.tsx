import { JSX, useMemo } from 'react'
import { Chip } from '@heroui/chip'
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Listbox, ListboxItem } from '@heroui/listbox'
import { Avatar } from "@heroui/avatar";

import { type ActivePlayersProps } from './types'

function ActivePlayers(props: ActivePlayersProps): JSX.Element {
  const { users } = props

  const userList = useMemo(() => users
    .map((user) => (
      <ListboxItem
        key={user._id}
        startContent={<Avatar size="sm" showFallback name={user.name.at(0)} isBordered />}
        title={user.name}
      />
    )), [users])

  return (
    <Card className='max-xl:w-full'>
      <CardHeader className='flex justify-between'>
        <h2 className="text-xl font-bold">Jugadores</h2>
        <Chip
          color="primary"
          variant="flat"
          radius='sm'
        >
          {users.length} En linea
        </Chip>
      </CardHeader>
      <CardBody>
        <Listbox
          disallowEmptySelection
          aria-label="active users"
          className="pointer-events-none"
          selectionMode="multiple"
          variant="flat"
          itemClasses={{ base: "mb-2 bg-primary-50 p-3 dark:bg-opacity-5", title: "ml-2 font-kanit" }}
        >
          {userList}
        </Listbox>
      </CardBody>
    </Card>
  );
}

export default ActivePlayers;