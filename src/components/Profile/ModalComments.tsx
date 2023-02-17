import { Box, HStack, Input, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { createComment, postLike, postSave } from "../../api";
import { IModalCommentsData } from "../../types";

import ModalComment from "./ModalComment";

export default function ModalComments({
  pk,
  author,
  caption,
  comments,
  likesCount,
  isLiked,
  isSaved,
  avatar,
}: IModalCommentsData) {
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();

  const likeMutation = useMutation(postLike, {
    onSuccess: () => {
      queryClient.refetchQueries(["post"]);
    },
  });
  const saveMutation = useMutation(postSave, {
    onSuccess: () => {
      queryClient.refetchQueries(["post"]);
    },
  });
  const handleClickLikePost = async () => {
    likeMutation.mutate(pk);
  };

  const commentMutation = useMutation(createComment, {
    onSuccess: () => {
      setValue("content", "");
      queryClient.refetchQueries(["post"]);
    },
  });
  const onValid = ({ content }: any) => {
    commentMutation.mutate({ content, pk });
  };
  const handleClickSavePost = async () => {
    saveMutation.mutate(pk);
  };
  return (
    <Box mt={"20px"} display={"flex"} flexDirection={"column"} height={"100%"}>
      <ModalComment
        author={author.username}
        caption={caption}
        avatar={avatar}
      />
      <Box mt={"10px"} flex={1}>
        {comments?.map((comment: any) => (
          <ModalComment
            avatar={comment.author.avatar}
            postId={pk}
            pk={comment.id}
            key={comment.id}
            author={comment.author.username}
            caption={comment.content}
            isMine={comment.is_mine}
          />
        ))}
      </Box>
      <Box mt={"10px"} pt={"15px"} pb={"10px"}>
        <HStack my={"3px"} justifyContent={"space-between"}>
          {isLiked ? (
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
          {isSaved ? (
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
        <Text fontSize={"14px"} as={"b"}>
          {likesCount === 0
            ? "좋아요를 가장 먼저 눌러보세요"
            : `좋아요 ${likesCount}개`}
        </Text>
        <Box as="form" onSubmit={handleSubmit(onValid)} mt={"4"}>
          <Input
            {...register("content", {
              required: "댓글 내용을 입력해주세요.",
            })}
            variant="unstyled"
            width={"100%"}
            placeholder={"댓글 달기..."}
          />
        </Box>
      </Box>
    </Box>
  );
}
