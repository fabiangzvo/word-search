import { JSX } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal'
import { Button } from '@heroui/button'

import ActivePlayers from '../activePlayers'

import { WaitingRoomProps } from './types'

function WaitingRoomModal(props: WaitingRoomProps): JSX.Element {
  const { isOpen, onStartGame, users, showStartButton } = props

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
    >
      <ModalContent>
        <ModalHeader>Esperando jugadores...</ModalHeader>
        <ModalBody className="text-center">
          <p className="mb-4 text-base">
            Esperando a que se unan todos los participantes para iniciar la
            partida.
          </p>
          <ActivePlayers shadow="none" users={users} />
        </ModalBody>
        <ModalFooter>
          {showStartButton && (
            <Button color="primary" onPress={onStartGame}>
              Comenzar partida
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WaitingRoomModal
