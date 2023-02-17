import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={client}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);
