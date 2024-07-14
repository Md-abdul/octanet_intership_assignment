import { Box } from "@chakra-ui/react";
import { PathRoutes } from "./AllRoutes/PathRoutes";
import "./App.css";
import { Home } from "./Pages/Home";

function App() {
  return (
    <>
      <Box backgroundColor={'#E0E0E0'} h={'100vh'}>
        <Home />
        <PathRoutes />
      </Box>
    </>
  );
}

export default App;
