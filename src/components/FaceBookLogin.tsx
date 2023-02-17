import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import { AiFillFacebook } from "react-icons/ai";

export default function FaceBookLogin() {
  return (
    <Box mb={4}>
      <HStack my={4}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <HStack>
        <AiFillFacebook size={"20"} />
        <Text fontSize={"md"}>Facebook으로 로그인</Text>
      </HStack>
    </Box>
  );
}
