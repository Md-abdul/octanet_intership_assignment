import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import { AddIcon } from "@chakra-ui/icons";

export const AddTask = ({ onAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("in-progress");

  const handleAddTask = async () => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    try {
      const response = await fetch("http://localhost:5001/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to add task");

      onAdd(newTask);

      toast.success("Task added successfully!");

      setTitle("");
      setDescription("");
      setStatus("in-progress");

      onClose();

      window.location.reload();
    } catch (error) {
      toast.error("Failed to add task: " + error.message);
    }
  };

  return (
    <>
      <IconButton
        icon={<AddIcon />}
        aria-label="Add Task"
        position="fixed"
        bottom={6}
        right={6}
        color={"white"}
        backgroundColor={"rgba(182, 36, 255, 0.882)"}
        _hover={{ backgroundColor: "rgba(98, 7, 143, 0.882)" }}
        size="lg"
        p={5}
        onClick={onOpen}
      />

      <Box>
        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent
              backdropBlur={"#6d6b6b"}
              backgroundColor={""}
              color="black"
              p={10}
              borderRadius={"20px"}
            >
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Add New Task
              </AlertDialogHeader>

              <AlertDialogBody>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    borderColor="rgba(182, 36, 255, 0.882)"
                    p={5}
                    border={"2px solid rgba(182, 36, 255, 0.882)"}
                    _hover={{ borderColor: "rgba(182, 36, 255, 0.882)" }}
                    // _focus={{ borderColor: "red" }}
                  />
                  <FormLabel mt={4}>Description</FormLabel>
                  <Textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    borderColor="rgba(182, 36, 255, 0.882)"
                    p={5}
                    border={"2px solid rgba(182, 36, 255, 0.882)"}

                  />
                  <FormLabel mt={4}>Status</FormLabel>
                  <Input
                    placeholder="Task Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    borderColor="rgba(182, 36, 255, 0.882)"
                    p={5}
                    border={"2px solid rgba(182, 36, 255, 0.882)"}
                  />
                </FormControl>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme="teal" onClick={handleAddTask} ml={3}>
                  Add Task
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
      <ToastContainer/>
    </>
  );
};

AddTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddTask;
