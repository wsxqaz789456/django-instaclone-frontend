import { Box, Grid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getHashtag } from "../api";
import Layout from "../components/Feed/LayOut";
import SideBar from "../components/Feed/SideBar";
import ProfileModal from "../components/Profile/ProfileModal";
import ProtectedPage from "../components/ProtectedPage";
import { IHashtagData } from "../types";

const Photo = styled.div<{ bg: string }>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
  cursor: pointer;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

export default function Hashtag() {
  const { hashtag } = useParams();
  const { data } = useQuery<IHashtagData>(["hashtag", hashtag], getHashtag);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPk, setSelectedPk] = useState<number | null>(null);
  const onOpen = (pk: number) => {
    setIsOpen(true);
    setSelectedPk(pk);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedPk(null);
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
          <Text fontSize={"28px"}>#{hashtag}</Text>
          <Grid
            templateColumns={"repeat(3, 1fr)"}
            autoRows={"290px"}
            gap={"30px"}
            mt={"50px"}
          >
            {data?.related_posts.map((post) => (
              <>
                <Photo
                  key={post.pk}
                  bg={post.image}
                  onClick={() => onOpen(post.pk)}
                >
                  <Icons>
                    <AiFillHeart />
                    <Icon>{post.likes_count}</Icon>
                    <FaComment />
                    <Icon>{post.comments_count}</Icon>
                  </Icons>
                </Photo>
              </>
            ))}
          </Grid>
        </Box>
        {isOpen && (
          <ProfileModal isOpen={isOpen} onClose={onClose} pk={selectedPk} />
        )}
      </Layout>
    </ProtectedPage>
  );
}
