import { Box } from "@chakra-ui/react";
import { PathRoutes } from "./AllRoutes/PathRoutes";
import "./App.css";

function App() {
  return (
    <>
      <Box backgroundColor={"#E0E0E0"} h={"100vh"}>
        <PathRoutes />
      </Box>
    </>
  );
}

export default App;
