import { Box } from "@chakra-ui/react";

function Layout({ children }: any) {
  return (
    <Box
      as="main"
      margin={"0"}
      mx={"auto"}
      mt={"45px"}
      maxW={"930px"}
      w={"100%"}
    >
      {children}
    </Box>
  );
}

export default Layout;
