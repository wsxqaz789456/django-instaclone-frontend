import { Box, Button, HStack, Input, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api";
import Layout from "../components/Feed/LayOut";
import SideBar from "../components/Feed/SideBar";
import ProtectedPage from "../components/ProtectedPage";

import { IChangePassword, IChangePasswordVariables } from "../types";

export default function ChangePassword() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IChangePassword>({
    mode: "onChange",
  });

  const mutation = useMutation(changePassword, {
    onSuccess: () => {
      toast({
        title: "비밀번호가 변경되었습니다.",
        status: "success",
      });
      navigate("/");
    },
  });

  const changeSubmit = ({
    old_password,
    new_password,
  }: IChangePasswordVariables) => {
    mutation.mutate({ old_password, new_password });
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
          <Box as="form" onSubmit={handleSubmit(changeSubmit)}>
            <HStack my={2}>
              <Text>기존 비밀번호</Text>{" "}
              <Input
                {...register("old_password", {
                  required: "비밀번호를 입력해주세요.",
                })}
                type={"password"}
                width={"40%"}
              />
            </HStack>
            <Text fontSize={"xs"} color={"red.500"}>
              {errors?.old_password?.message}
            </Text>

            <HStack my={2}>
              <Text>비밀번호 입력</Text>{" "}
              <Input
                {...register("new_password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "8글자 이상 입력해주세요.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                    message:
                      "비밀번호는 문자, 숫자, 특수문자가 하나 이상 필요합니다.",
                  },
                })}
                type={"password"}
                width={"40%"}
              />
            </HStack>
            <Text fontSize={"xs"} color={"red.500"}>
              {errors?.new_password?.message}
            </Text>
            <HStack my={2}>
              <Text>비밀번호 확인</Text>{" "}
              <Input
                {...register("new_password_check", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "8글자 이상 입력해주세요.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                    message:
                      "비밀번호는 문자, 숫자, 특수문자가 하나 이상 필요합니다.",
                  },
                  validate: {
                    checkPassword: (value) => {
                      const { new_password } = getValues();
                      return (
                        new_password === value ||
                        "패스워드가 일치하지 않습니다."
                      );
                    },
                  },
                })}
                type={"password"}
                width={"40%"}
              />
            </HStack>
            <Text fontSize={"xs"} color={"red.500"}>
              {errors?.new_password_check?.message}
            </Text>
            <Button type="submit" disabled={!isValid}>
              변경
            </Button>
          </Box>
        </Box>
      </Layout>
    </ProtectedPage>
  );
}
