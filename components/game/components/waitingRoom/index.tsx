import { JSX } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal'
import { Button } from '@heroui/button'

import { WaitingRoomProps } from './types'
import ActivePlayers from '../activePlayers'

function WaitingRoomModal(props: WaitingRoomProps): JSX.Element {
  const { isOpen, onStartGame, users, gameId, showStartButton } = props

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader>Esperando jugadores...</ModalHeader>
        <ModalBody className="text-center">
          <p className="mb-4 text-base">
            Esperando a que se unan todos los participantes para iniciar la
            partida.
          </p>
          <ActivePlayers users={users} shadow="none" />
        </ModalBody>
        <ModalFooter>
          {showStartButton && (
            <Button onPress={onStartGame} color="primary">
              Comenzar partida
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WaitingRoomModal
