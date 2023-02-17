import React from "react";
import {
  Avatar,
  Button,
  HStack,
  Input,
  Text,
  Box,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Layout from "../components/Feed/LayOut";
import SideBar from "../components/Feed/SideBar";

import { uploadPhoto } from "../shared/shared.utils";
import { changeAvatar, changeProfile } from "../api";
import { IEditProfileForm } from "../types";

import ProtectedPage from "../components/ProtectedPage";

export default function EditAccount({ data }: any) {
  const { register, handleSubmit, setValue } = useForm<IEditProfileForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const profileMutation = useMutation(changeProfile, {
    onSuccess: () => {
      toast({
        title: "성공적으로 프로필이 변경되었습니다.",
        status: "success",
      });
    },
  });
  const avatarMutation = useMutation(changeAvatar, {
    onSuccess: () => {
      queryClient.refetchQueries(["me"]);
      toast({
        title: "성공적으로 사진이 변경되었습니다.",
        status: "success",
      });
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const profilePhoto = event.target.files[0];
      const photoURL = await uploadPhoto(profilePhoto, data);
      const avatarJSON = { avatar: photoURL };
      avatarMutation.mutate(avatarJSON);
    }
  };

  const onChangeProfile = (data: any) => {
    profileMutation.mutate(data);
  };

  React.useEffect(() => {
    setValue("username", data?.username);
    setValue("first_name", data?.first_name);
    setValue("last_name", data?.last_name);
    setValue("bio", data?.bio);
    setValue("email", data?.email);
  }, [data, setValue]);

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
          <VStack>
            <HStack>
              <Avatar src={data?.avatar} />
              <VStack>
                <Text>{data?.username}</Text>
                <Text>프로필 사진 바꾸기</Text>
                <Input
                  type={"file"}
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </VStack>
            </HStack>
            <VStack
              as="form"
              alignItems={"flex-start"}
              onSubmit={handleSubmit(onChangeProfile)}
            >
              <HStack>
                <Text>이름</Text>
                <Input
                  {...register("first_name", {
                    maxLength: {
                      value: 150,
                      message: "이름은 150자를 초과할 수 없습니다.",
                    },
                  })}
                  type="text"
                  defaultValue={data?.first_name}
                  placeholder={data?.first_name}
                ></Input>
              </HStack>
              <HStack>
                <Text>성</Text>
                <Input
                  {...register("last_name", {
                    maxLength: {
                      value: 150,
                      message: "성은 150자를 초과할 수 없습니다.",
                    },
                  })}
                  type="text"
                  defaultValue={data?.last_name}
                  placeholder={data?.last_name}
                ></Input>
              </HStack>
              <HStack>
                <Text>사용자 이름</Text>
                <Input
                  {...register("username", {
                    minLength: {
                      value: 6,
                      message: "유저이름은 최소 6자입니다.",
                    },
                    maxLength: {
                      value: 30,
                      message: "유저이름은 30자를 초과할 수 없습니다.",
                    },
                  })}
                  type="text"
                  defaultValue={data?.username}
                  placeholder={data?.username}
                ></Input>
              </HStack>
              <HStack>
                <Text>소개</Text>
                <Input
                  {...register("bio", {
                    maxLength: {
                      value: 250,
                      message: "소개는 250자를 초과할 수 없습니다.",
                    },
                  })}
                  type="text"
                  defaultValue={data?.bio}
                  placeholder={data?.bio}
                ></Input>
              </HStack>
              <HStack>
                <Text>이메일</Text>
                <Input
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                      message: "올바른 이메일 형식이 아닙니다.",
                    },
                  })}
                  type="email"
                  defaultValue={data?.email}
                  placeholder={data?.email}
                ></Input>
              </HStack>
              <Button
                isLoading={profileMutation.isLoading}
                type="submit"
                colorScheme={"blue"}
              >
                제출
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Layout>
    </ProtectedPage>
  );
}
