import { Box, Image, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box
      height="100vh"
      width={"100vw"}
      justifyItems={"center"}
      alignItems={"center"}
    >
      <Image src={"../loading.png"}></Image>
      <Text>로딩 중입니다...</Text>
    </Box>
  );
}
