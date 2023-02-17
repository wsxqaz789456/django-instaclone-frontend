import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Text,
  Box,
  Flex,
  Stack,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../api";
import { IModalData, IProfileModalProps } from "../../types";
import ModalComments from "./ModalComments";
import PostDeleteModal from "./PostDeleteModal";
import PostEditModal from "./PostEditModal";

const ProfileModal = ({ isOpen, onClose, pk }: IProfileModalProps) => {
  const { data } = useQuery<IModalData>(["post", pk], getPost);

  const {
    isOpen: editIsOpen,
    onClose: editIsClose,
    onOpen: editOnOpen,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="60vw" minH={"80vh"}>
          <ModalBody style={{ overflow: "hidden" }}>
            <Flex>
              <Box
                width="70%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={data?.image} maxWidth="100%" height="auto" />
              </Box>
              <Box width="520px" height="80vh">
                <Stack spacing={8} height={"100%"}>
                  <HStack
                    pb={4}
                    borderBottom={"1px"}
                    justifyContent={"space-between"}
                  >
                    <HStack>
                      <Avatar size={"sm"} src={data?.author?.avatar} />
                      <Text fontWeight="bold">{data?.author?.username}</Text>
                    </HStack>
                    {data?.is_owner && (
                      <Menu>
                        <MenuButton>
                          <Button variant={"ghost"}>ㆍㆍㆍ</Button>
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={editOnOpen}>수정</MenuItem>
                          <MenuItem onClick={deleteOnOpen}>삭제</MenuItem>
                        </MenuList>
                      </Menu>
                    )}
                  </HStack>
                  {data && (
                    <ModalComments
                      pk={data.pk}
                      author={data.author}
                      avatar={data.author.avatar}
                      caption={data.caption}
                      comments={data.comments}
                      likesCount={data.likes_count}
                      isLiked={data.is_liked}
                      isSaved={data.is_saved}
                    />
                  )}
                </Stack>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <PostEditModal
        isOpen={editIsOpen}
        onClose={editIsClose}
        data={data}
        pk={pk}
      />
      <PostDeleteModal isOpen={deleteIsOpen} onClose={deleteOnClose} pk={pk} />
    </>
  );
};

export default ProfileModal;
