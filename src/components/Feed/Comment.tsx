import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ICommentProps } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../api";

const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
export default function Comment({
  postId,
  pk,
  author,
  caption,
  isMine,
}: ICommentProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.refetchQueries(["feed"]);
    },
  });
  const onDeleteClick = () => {
    if (postId && pk) {
      mutation.mutate({ postId, pk });
    }
  };
  return (
    <Box mb={"7px"}>
      <Link to={`/${author}`}>
        <Text fontSize={"15px"} as={"b"}>
          {author}
        </Text>
      </Link>
      <CommentCaption>
        {caption.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word.substring(1)}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </Box>
  );
}
