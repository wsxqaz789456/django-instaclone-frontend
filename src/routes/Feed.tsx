import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../api";
import FeedPost from "../components/Feed/FeedPost";
import Layout from "../components/Feed/LayOut";
import SideBar from "../components/Feed/SideBar";
import ProtectedPage from "../components/ProtectedPage";

import { IFeedData } from "../types";

export default function Feed() {
  const { data } = useQuery<IFeedData[]>(["feed"], getFeed);

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
          {data?.map((post) => (
            <FeedPost key={post.pk} post={post} />
          ))}
        </Box>
      </Layout>
    </ProtectedPage>
  );
}
