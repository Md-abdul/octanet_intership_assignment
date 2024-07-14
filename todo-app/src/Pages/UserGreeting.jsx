import { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  WrapItem,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
//   Icon,
} from "@chakra-ui/react";
import { EmailIcon, InfoOutlineIcon, SettingsIcon } from "@chakra-ui/icons";

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good Morning";
  if (currentHour < 18) return "Good Afternoon";
  return "Good Evening";
};

const UserGreeting = () => {
  const [greeting, setGreeting] = useState(getGreeting());
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting(getGreeting());
    }, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(timer);
  }, []);

  const handleAvatarClick = () => {
    setIsOpen(true);
  };

  return (
    <Box mb={20}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="black">
          👋 Hello !! {greeting}
        </Text>
        <WrapItem
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
          }
          borderRadius={"20px"}
          backgroundColor={"white"}
          cursor={"pointer"}
          onClick={handleAvatarClick}
        >
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </WrapItem>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              User Information
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex alignItems="center" mb={4}>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" mr={4} />
                <Box>
                  <Text fontWeight="bold">Dan Abrahmov</Text>
                  <Flex alignItems="center">
                    <EmailIcon mr={2} />
                    <Text>dan.abramov@example.com</Text>
                  </Flex>
                </Box>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <InfoOutlineIcon mr={2} />
                <Text>More Info</Text>
              </Flex>
              <Flex alignItems="center">
                <SettingsIcon mr={2} />
                <Text>Settings</Text>
              </Flex>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserGreeting;
