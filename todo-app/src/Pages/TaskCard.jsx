


import PropTypes from "prop-types";
import {
  Box,
  Text,
  Stack,
  IconButton,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { EditTask } from "./EditTask";
import { useRef } from "react";

export const TaskCard = ({ title, description, status, id, onDelete, onUpdate }) => {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green.700";
      case "pending":
        return "#D500000";
      case "in-progress":
        return "yellow.800";
      default:
        return "gray.500";
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(id);
      toast.success("Task deleted successfully!");
      onDeleteClose();
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  return (
    <>
      <Box
        p={4}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        // borderWidth="1px"
        borderRadius="xl"
        bg="white"
        textAlign="center"
        m={2}
        position="relative"
        color={'white'}
        backgroundColor={'rgba(185, 87, 234, 0.882)'}
      >
        
        <Stack spacing={3}>
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          <Text>{description}</Text>
          <Text 
          w={'10rem'}
            color="white" 
            bg={getStatusColor(status)} 
            fontWeight="bold" 
            p={1} 
            borderRadius="md" 
            display="inline-block"
          >
            {status}
          </Text>

          <Flex justifyContent="flex-end" position="absolute" top={2} right={2}>
          <IconButton
            icon={<EditIcon />}
            size="md"
            variant="ghost"
            aria-label="Edit Task"
            mr={2}
            onClick={onEditOpen}
          />
          <IconButton
            color={"red.600"}
            icon={<DeleteIcon />}
            size="md"
            variant="ghost"
            aria-label="Delete Task"
            onClick={onDeleteOpen}
          />
        </Flex>
        </Stack>
        
      </Box>

      <EditTask
        isOpen={isEditOpen}
        onClose={onEditClose}
        currentStatus={status}
        onUpdate={onUpdate}
        id={id}
      />

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default TaskCard;
