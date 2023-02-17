import {
  Avatar,
  Box,
  Button,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { AiFillHeart, AiOutlineTable } from "react-icons/ai";
import { BsBookmark, BsFillGearFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProfile, logout, userFollow, userUnfollow } from "../api";

import Layout from "../components/Feed/LayOut";
import SideBar from "../components/Feed/SideBar";
import ProfileModal from "../components/Profile/ProfileModal";
import NotFound from "./NotFound";

import { IProfileData } from "../types";
import Loading from "./Loading";

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

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data, isError, isLoading } = useQuery<IProfileData>(
    [`profile`, username],
    getProfile,
    { retry: false }
  );

  const queryClient = useQueryClient();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      toast({
        title: "로그아웃이 완료되었습니다.",
        status: "success",
      });
      queryClient.refetchQueries(["me"]);
    },
  });

  const unfollowMutation = useMutation(userUnfollow, {
    onSuccess: () => {
      queryClient.refetchQueries(["profile"]);
    },
  });
  const followMutation = useMutation(userFollow, {
    onSuccess: () => {
      queryClient.refetchQueries(["profile"]);
    },
  });
  const clickUnfollow = () => {
    if (username) {
      unfollowMutation.mutate(username);
    }
  };
  const clickFollow = () => {
    if (username) {
      followMutation.mutate(username);
    }
  };

  const getButton = (data: any) => {
    const { is_me, is_following } = data;
    if (is_me) {
      return (
        <Link to="/accounts/edit">
          <Button size={"sm"}>프로필 편집</Button>
        </Link>
      );
    }
    if (is_following) {
      return (
        <Button size={"sm"} onClick={clickUnfollow}>
          팔로우 취소
        </Button>
      );
    } else {
      return (
        <Button size={"sm"} onClick={clickFollow}>
          팔로우
        </Button>
      );
    }
  };
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
  const [isPost, setIsPost] = useState(true);
  const [isSave, setIsSave] = useState(false);
  const handleIsPost = () => {
    setIsPost(true);
    setIsSave(false);
    queryClient.refetchQueries(["profile"]);
  };
  const handleIsSave = () => {
    setIsSave(true);
    setIsPost(false);
    queryClient.refetchQueries(["profile"]);
  };
  const handleChangePassword = () => {
    navigate("/accounts/change-password");
  };
  const handleLogOut = () => {
    logoutMutation.mutate();
    navigate("/");
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFound />;
  }
  return (
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
        <HStack>
          <Avatar
            size={"2xl"}
            mr={"85px"}
            style={{ width: "160px", height: "160px" }}
            src={data?.avatar}
          />
          <VStack align={"start"} alignSelf={"start"}>
            <HStack mt={"2"}>
              <Text fontSize={"20px"}>{data?.username}</Text>
              {data ? getButton(data) : null}
              <Menu>
                <MenuButton>
                  <BsFillGearFill />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleChangePassword}>
                    비밀번호 변경
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>로그아웃</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <HStack pb={"3"}>
              <Text>게시물 {<Text as="b">{data?.posts.length}</Text>}</Text>
              <Text px={"8"}>
                팔로워 {<Text as="b">{data?.followers_count}</Text>}
              </Text>
              <Text>팔로우 {<Text as="b">{data?.following_count}</Text>}</Text>
            </HStack>
            <VStack alignItems={"flex-start"} spacing={-0.5}>
              <Text as={"b"} fontSize={"xs"}>
                {data?.first_name} {data?.last_name}
              </Text>

              <Text wordBreak={"break-all"} fontSize={"s"}>
                {data?.bio}
              </Text>
            </VStack>
          </VStack>
        </HStack>
        <HStack justifyContent={"center"} my={3}>
          {isPost ? (
            <Button variant={"outline"} onClick={handleIsPost}>
              <AiOutlineTable />
              게시물
            </Button>
          ) : (
            <Button variant={"ghost"} onClick={handleIsPost}>
              <AiOutlineTable />
              게시물
            </Button>
          )}
          {isSave ? (
            <Button variant={"outline"} onClick={handleIsSave}>
              <BsBookmark />
              저장됨
            </Button>
          ) : (
            <Button variant={"ghost"} onClick={handleIsSave}>
              <BsBookmark />
              저장됨
            </Button>
          )}
        </HStack>
        {isPost ? (
          <Grid
            templateColumns={"repeat(3, 1fr)"}
            autoRows={"290px"}
            gap={"30px"}
            mt={"50px"}
          >
            {data?.posts.map((post) => (
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
        ) : null}

        {isSave ? (
          <Grid
            templateColumns={"repeat(3, 1fr)"}
            autoRows={"290px"}
            gap={"30px"}
            mt={"50px"}
          >
            {data?.is_me ? (
              data?.saved_posts.map((post) => (
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
              ))
            ) : (
              <Text>저장한 내용은 본인만 볼 수 있습니다.</Text>
            )}
          </Grid>
        ) : null}
      </Box>
      {isOpen && (
        <ProfileModal isOpen={isOpen} onClose={onClose} pk={selectedPk} />
      )}
    </Layout>
  );
}
