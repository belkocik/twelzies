import React from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Divider,
  Flex,
  Center,
} from "@chakra-ui/react";
import { TimeIcon, CalendarIcon, InfoIcon } from "@chakra-ui/icons";

export default function Scoreboard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scoreBoardElements = props.scoreData.map((item, id) => (
    <Box key={id}>
      <Text>
        <CalendarIcon /> {new Date(item.date).toLocaleString()}
      </Text>
      <Text>
        <InfoIcon /> {item.count} rolls
      </Text>
      <Text>
        <TimeIcon /> {item.time} seconds
      </Text>
      <Divider m={1} />
    </Box>
  ));

  return (
    <>
      <Center>
        <Button
          onClick={onOpen}
          colorScheme={props.twelzies ? "teal" : "yellow"}
          fontSize="2xl"
          height={{ base: "50px", md: "80px" }}
          m={1}
        >
          Open Scoreboard
        </Button>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">Scoreboard</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontSize="lg">{scoreBoardElements}</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={props.deleteScore}>
              Delete Scores
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
