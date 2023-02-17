import { Box } from "@chakra-ui/react";

export default function Layout({ children }: any) {
  return (
    <Box display="flex" minH="100vh" flexDirection="row">
      {children}
    </Box>
  );
}
