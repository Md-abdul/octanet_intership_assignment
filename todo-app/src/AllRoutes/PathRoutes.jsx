import { Route, Routes } from "react-router-dom";
// import { AddTask } from "../Pages/AddTask";
import Home from "../Pages/Home";

export const PathRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/addtask" element={<AddTask />} /> */}
      </Routes>
      
    </>
  );
};
