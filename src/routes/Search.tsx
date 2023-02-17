import { Avatar, Box, Button, HStack, Input, Text } from "@chakra-ui/react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { searchData } from "../api";

import Layout from "../components/Feed/LayOut";
import SideBar from "../components/Feed/SideBar";
import ProtectedPage from "../components/ProtectedPage";

import { IHashtagsResult, IUsersResult } from "../types";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [users, setUsers] = useState([]);
  const handleSearch = async () => {
    const response = await searchData({ keyword: searchTerm });
    setHashtags(response.data.hashtags);
    setUsers(response.data.users);
    console.log(response.data);
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
          <Box>
            <Text>검색</Text>
            <HStack>
              <Input
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                placeholder={"해시태그 또는 유저이름을 입력하세요."}
                mr={5}
              />
              <Button onClick={handleSearch}>검색</Button>
            </HStack>
            <>
              {hashtags.map((hashtag: IHashtagsResult) => (
                <HStack my={2}>
                  <Link to={`/hashtags/${hashtag.name}`}>
                    <Avatar size={"sm"} name={"#"} />
                  </Link>
                  <Link to={`/hashtags/${hashtag.name}`}>
                    <Text fontSize={"20px"}>#{hashtag.name}</Text>
                  </Link>
                </HStack>
              ))}
              {users.map((user: IUsersResult) => (
                <HStack my={2}>
                  <Link to={`/${user.username}`}>
                    <Avatar size={"sm"} src={user.avatar} />
                  </Link>
                  <Link to={`/${user.username}`}>
                    <Text as="b">{user.username}</Text>
                  </Link>
                </HStack>
              ))}
            </>
          </Box>
        </Box>
      </Layout>
    </ProtectedPage>
  );
}
