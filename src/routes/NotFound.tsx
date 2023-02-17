import { Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg="gray.100" minH="100vh">
      <Heading mt="8" mb="4">
        죄송합니다. 페이지를 사용할 수 없습니다.
      </Heading>
      <Text mt="4">
        클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.
        {
          <Link to={"/"}>
            <Text textColor={"blue"}>홈으로 돌아가기</Text>
          </Link>
        }
      </Text>
    </VStack>
  );
}
