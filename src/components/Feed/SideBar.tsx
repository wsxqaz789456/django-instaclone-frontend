import { Text, Box, HStack, Image, VStack, Avatar } from "@chakra-ui/react";

import { HiOutlineSearch } from "react-icons/hi";
import { RiHomeLine } from "react-icons/ri";
import { BsPlusSquare } from "react-icons/bs";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ISideBar } from "../../types";

export default function SideBar() {
  const { data } = useQuery<ISideBar>(["me"]);
  return (
    <VStack width="250px" borderRight={"1px solid gray"} padding="20px">
      <Box>
        <Link to="/">
          <Image boxSize="130px" objectFit={"contain"} src="../logo.png" />
        </Link>
      </Box>
      <Link to="/">
        <HStack my={"5"}>
          <RiHomeLine size={"30"} />
          <Text fontSize={"20px"}>홈</Text>
        </HStack>
      </Link>
      <Link to="/search">
        <HStack my={"5"}>
          <HiOutlineSearch size={"30"} />
          <Text fontSize={"20px"}>검색</Text>
        </HStack>
      </Link>
      <Link to={"/posts/upload"}>
        <HStack mt={"5"} mb={"20"}>
          <BsPlusSquare size={"28px"} />
          <Text fontSize={"20px"}>만들기</Text>
        </HStack>
      </Link>
      <HStack>
        <Link to={`/${data?.username}`}>
          <Avatar src={data?.avatar} />
        </Link>
        <Link to={`/${data?.username}`}>
          <Text as="b">{data?.username}</Text>
        </Link>
      </HStack>
    </VStack>
  );
}
