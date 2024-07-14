import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Select,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

export const EditTask = ({ isOpen, onClose, currentStatus, onUpdate, id }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleSubmit = () => {
    onUpdate(id, status);
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Edit Task Status
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text mb={3}>Select the new status:</Text>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </Select>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

EditTask.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  currentStatus: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default EditTask;
