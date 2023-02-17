import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { postEdit } from "../../api";

export default function PostEditModal({ isOpen, onClose, data, pk }: any) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const mutation = useMutation(postEdit, {
    onSuccess: () => {
      queryClient.refetchQueries(["post"]);
      onClose();
    },
  });
  const onSubmit = ({ caption }: any) => {
    mutation.mutate({ caption, pk });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalCloseButton size={"lg"}></ModalCloseButton>
      <ModalContent minW="50vw" minH={"60vh"}>
        <ModalHeader>정보 수정</ModalHeader>
        <Flex>
          <Box
            width="70%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={data?.image} maxWidth="100%" height="auto" />
          </Box>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <Avatar size={"sm"} src={data?.author.avatar} />
              <Text as="b" fontSize={"16px"}>
                {data?.author.username}
              </Text>
            </HStack>
            <Input
              {...register("caption", { required: true })}
              width={"100%"}
              height={"60%"}
              defaultValue={data?.caption}
              placeholder={"내용을 입력해주세요."}
            />
            <Button type={"submit"} colorScheme={"blue"}>
              변경
            </Button>
          </Box>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
