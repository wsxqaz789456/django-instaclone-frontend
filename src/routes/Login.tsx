import {
  Box,
  Button,
  HStack,
  Img,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import AuthLayout from "../components/Auth/AuthLayout";
import FaceBookLogin from "../components/FaceBookLogin";
import { ILoginForm } from "../types";

export default function Login() {
  const { register, handleSubmit } = useForm<ILoginForm>();
  const navigate = useNavigate();
  const mutation = useMutation(login, {
    onSuccess: () => {
      navigate("/feed");
    },
  });
  const onSubmit = (data: ILoginForm) => {
    mutation.mutate(data);
  };

  return (
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
              {...register("password", {
                required: "비밀번호는 필수입니다.",
              })}
              my={"3px"}
              type={"password"}
              variant={"filled"}
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
              로그인
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
          <Text>계정이 없으신가요?</Text>{" "}
          <Link to={"/signup"}>
            <Text color={"blue.500"}>가입하기</Text>
          </Link>
        </HStack>
      </VStack>
    </AuthLayout>
  );
}
