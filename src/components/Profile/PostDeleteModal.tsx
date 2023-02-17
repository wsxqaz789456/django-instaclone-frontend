import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import { postDelete } from "../../api";

export default function PostDeleteModal({ isOpen, onClose, pk }: any) {
  const mutation = useMutation(postDelete, {
    onSuccess: () => {
      window.location.reload();
    },
  });
  const handleDelete = () => {
    mutation.mutate(pk);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>게시물을 삭제할까요?</ModalHeader>
        <Button
          width="100%"
          variant={"ghost"}
          color={"red.500"}
          onClick={handleDelete}
        >
          삭제
        </Button>
        <Button width="100%" variant={"ghost"} onClick={onClose}>
          취소
        </Button>
      </ModalContent>
    </Modal>
  );
}
