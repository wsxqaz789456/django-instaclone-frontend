import { Avatar, Box, HStack, Img, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { IFeedMainData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike, postSave } from "../../api";

import Comments from "./Comments";
import getTime from "../../hooks/getTime";
import { Link } from "react-router-dom";

function FeedPost({ post }: { post: IFeedMainData }) {
  let dateString = post.created_at;
  let localtime = new Date(dateString);
  const time = getTime(localtime);

  const queryClient = useQueryClient();
  const likeMutation = useMutation(postLike, {
    onSuccess: () => {
      queryClient.refetchQueries(["feed"]);
    },
  });
  const saveMutation = useMutation(postSave, {
    onSuccess: () => {
      queryClient.refetchQueries(["feed"]);
    },
  });
  const handleClickLikePost = async () => {
    likeMutation.mutate(post.pk);
  };
  const handleClickSavePost = async () => {
    saveMutation.mutate(post.pk);
  };
  return (
    <Box mb={"60px"} maxW={"615px"} borderBottom={"1px"} key={post.pk}>
      <Box p={"15px"} display={"flex"} alignItems={"center"}>
        <Link to={`/${post.author.username}`}>
          <Avatar size={"sm"} ml={"-4"} mr={"2"} src={post.author.avatar} />
        </Link>
        <Link to={`/${post.author.username}`}>
          <Text fontSize={"15px"} as={"b"}>
            {post.author.username}
          </Text>
        </Link>
        <Text ml={"15"}>{time}</Text>
      </Box>
      <Img src={post.image} minW={"100%"} maxW={"100%"} />
      <HStack my={"3px"} justifyContent={"space-between"}>
        <HStack>
          {post?.is_liked ? (
            <AiFillHeart
              size={"30px"}
              color={"red"}
              cursor={"pointer"}
              onClick={handleClickLikePost}
            />
          ) : (
            <AiOutlineHeart
              cursor={"pointer"}
              size={"30px"}
              onClick={handleClickLikePost}
            />
          )}
        </HStack>
        {post?.is_saved ? (
          <BsFillBookmarkFill
            size={"24px"}
            cursor={"pointer"}
            onClick={handleClickSavePost}
          />
        ) : (
          <BsBookmark
            size={"24px"}
            cursor={"pointer"}
            onClick={handleClickSavePost}
          />
        )}
      </HStack>
      <Text as={"b"} fontSize={"14px"}>
        {post.likes_count === 0
          ? "좋아요를 가장 먼저 눌러보세요."
          : `좋아요 ${post.likes_count}개`}
      </Text>
      <Comments
        pk={post.pk}
        author={post.author}
        caption={post.caption}
        comments_count={post.comments_count}
        comments={post.comments}
      />
    </Box>
  );
}
export default FeedPost;
