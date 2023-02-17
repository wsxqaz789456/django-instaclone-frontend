import { Box, Input, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createComment } from "../../api";
import { ICommentsProps } from "../../types";
import Comment from "./Comment";

export default function Comments({
  pk,
  author,
  caption,
  comments_count,
  comments,
}: ICommentsProps) {
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation(createComment, {
    onSuccess: () => {
      setValue("content", "");
      queryClient.refetchQueries(["feed"]);
    },
  });
  const onValid = ({ content }: any) => {
    mutation.mutate({ content, pk });
  };
  return (
    <Box mt={"20px"}>
      <Comment author={author.username} caption={caption} />
      <Text>{`댓글 ${comments_count}개`}</Text>
      {comments?.map((comment) => (
        <Comment
          postId={pk}
          pk={comment.id}
          key={comment.id}
          author={comment.author.username}
          caption={comment.content}
          isMine={comment.is_mine}
        />
      ))}
      <Box mt={"10px"} pt={"15px"} pb={"10px"}>
        <Box as="form" onSubmit={handleSubmit(onValid)}>
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
