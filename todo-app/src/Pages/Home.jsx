import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Flex,
  Spinner,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { toast } from "react-toastify";
import AddTask from "./AddTask";
import UserGreeting from "./UserGreeting";

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5001/task");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        toast.error("Error fetching tasks: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/task/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  const handleUpdate = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5001/task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="2xl" />
      </Flex>
    );
  }

  return (
    <Box p={4} w="70%" mx="auto">
      <UserGreeting />

      <Flex justifyContent="center" mb={6}>
        <Box
          p={6}
          boxShadow="md"
          borderRadius={"30rem"}
          bg="white"
          w="70%"
          textAlign="center"
          bgGradient="linear(to-r, purple.500, pink.300, purple.500)"
        >
          <Flex justifyContent="center" alignItems="center">
            <CircularProgress
              value={completionPercentage}
              color="blue.500"
              size="70px"
              thickness="10px"
              mr={6}
            >
              <CircularProgressLabel>{`${completionPercentage}%`}</CircularProgressLabel>
            </CircularProgress>
            <Box textAlign="left">
              <Text fontSize="2xl" mb={2} fontWeight={500}>
                Keep pushing, you are doing great!
              </Text>
              <Text fontSize="xl" mt={-2}>
                You have completed {completedTasks} out of {totalTasks} tasks.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>

      {totalTasks === 0 ? (
        <Text fontSize="xl" textAlign="center">
          No tasks available. Please add some tasks.
        </Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2 }}
          spacing={4}
          justifyContent="center"
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onDelete={() => handleDelete(task.id)}
              onUpdate={handleUpdate}
              id={task.id}
            />
          ))}
        </SimpleGrid>
      )}

      <AddTask onAdd={handleAddTask} />
    </Box>
  );
};

export default Home;
