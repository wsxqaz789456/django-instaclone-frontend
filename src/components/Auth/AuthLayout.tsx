import { Box } from "@chakra-ui/react";

export default function AuthLayout({ children }: any) {
  return (
    <Box
      display={"flex"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      {children}
    </Box>
  );
}
