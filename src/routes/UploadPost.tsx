import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postUpload } from "../api";
import Layout from "../components/Feed/LayOut";
import SideBar from "../components/Feed/SideBar";
import ProtectedPage from "../components/ProtectedPage";

import { uploadPhoto } from "../shared/shared.utils";

export default function UploadPost({ data }: any) {
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const mutation = useMutation(postUpload, {
    onSuccess: () => {
      navigate(`/${data?.username}`);
      toast({
        status: "success",
        title: "게시글이 등록되었습니다.",
      });
    },
  });

  const fileHandleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const profilePhoto = event.target.files[0];
      const photoURL = await uploadPhoto(profilePhoto, data);
      setUploadImage(photoURL);
      setImage(photoURL);
    }
  };

  const postSubmit = ({ caption }: any) => {
    mutation.mutate({ caption, image });
  };

  return (
    <ProtectedPage>
      <Layout>
        <SideBar />
        <Box
          flex={1}
          padding="20px"
          flexDirection="column"
          mx={"250px"}
          mt={"50px"}
          mb={"20px"}
        >
          <Box minW={"60vw"} minH={"80vh"}>
            <Flex as={"form"} onSubmit={handleSubmit(postSubmit)}>
              <Box
                width="70%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  height={"100%"}
                  flex={1}
                >
                  <Image maxWidth="100%" height="auto" src={uploadImage} />
                  <Input
                    type={"file"}
                    id="file"
                    name="file"
                    onChange={fileHandleChange}
                  />
                </Box>
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <HStack>
                  <Avatar src={data?.avatar} />
                  <Text as={"b"}>{data?.username}</Text>
                </HStack>
                <Input
                  {...register("caption", { required: true })}
                  type={"text"}
                  height={"500px"}
                  width={"400px"}
                  placeholder={"내용을 입력해주세요."}
                />
              </Box>
              <Button
                type={"submit"}
                isLoading={mutation.isLoading}
                colorScheme={"blue"}
                variant={"ghost"}
              >
                게시글 등록
              </Button>
            </Flex>
          </Box>
        </Box>
      </Layout>
    </ProtectedPage>
  );
}
