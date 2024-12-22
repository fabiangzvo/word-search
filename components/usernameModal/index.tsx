import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

interface UsernameModalProps {
  isOpen: boolean;
  onClose: (username: string) => void;
}

export const UsernameModal: React.FC<UsernameModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) {
      onClose(username.trim());
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      placement="center"
      backdrop="blur"
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Enter Your Username
        </ModalHeader>
        <ModalBody>
          <Input
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onPress={handleSubmit}
            disabled={!username.trim()}
          >
            Start Game
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};