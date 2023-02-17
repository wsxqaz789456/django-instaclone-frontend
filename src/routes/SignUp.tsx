import {
  Box,
  Button,
  HStack,
  Img,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api";

import AuthLayout from "../components/Auth/AuthLayout";
import FaceBookLogin from "../components/FaceBookLogin";
import ProtectedPage from "../components/ProtectedPage";

import { ISignUpForm } from "../types";

export default function SignUp() {
  const { register, handleSubmit } = useForm<ISignUpForm>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(signUp, {
    onSuccess: () => {
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });

  const onSubmit = (data: ISignUpForm) => {
    mutation.mutate(data);
  };

  return (
    <ProtectedPage>
      <AuthLayout>
        <VStack maxW={"350px"} width={"100%"}>
          <Box
            border={"1px"}
            bg={"white"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            padding={"35px 40px 25px 40px"}
            mb={"10px"}
          >
            <Box>
              <Img
                my={"-14"}
                boxSize="220px"
                objectFit={"contain"}
                src="../logo.png"
              />
            </Box>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("username", {
                  required: "사용자이름은 필수입니다.",
                })}
                my={"3px"}
                variant={"filled"}
                placeholder="사용자이름"
              />
              <Input
                {...register("first_name", {
                  required: "이름은 필수입니다.",
                })}
                my={"3px"}
                variant={"filled"}
                placeholder="이름"
              />
              <Input
                {...register("last_name", {
                  required: "성은 필수입니다.",
                })}
                my={"3px"}
                variant={"filled"}
                placeholder="성"
              />
              <Input
                {...register("email", {
                  required: "이메일은 필수입니다.",
                })}
                my={"3px"}
                variant={"filled"}
                placeholder="이메일"
              />
              <Input
                {...register("password", {
                  required: "비밀번호는 필수입니다.",
                })}
                my={"3px"}
                variant={"filled"}
                type="password"
                placeholder="비밀번호"
              />
              <Button
                isLoading={mutation.isLoading}
                type={"submit"}
                mt={"10px"}
                w={"100%"}
                colorScheme={"twitter"}
                color={"white"}
              >
                회원가입
              </Button>
            </Box>
            <FaceBookLogin />
          </Box>
          <HStack
            justifyContent={"center"}
            p={"20px 0px"}
            width={"100%"}
            border={"1px"}
            bg={"white"}
          >
            <Text>계정이 이미 존재합니까?</Text>
            <Link to={"/login"}>
              <Text color={"blue.500"}>로그인</Text>
            </Link>
          </HStack>
        </VStack>
      </AuthLayout>
    </ProtectedPage>
  );
}
