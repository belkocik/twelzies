import React from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
export default function Controls(props) {
  return (
    <Box>
      <Heading>Controls</Heading>
      <Button
        colorScheme="orange"
        width={{ base: "100px", lg: "160px" }}
        height={{ base: "50px", lg: "60px" }}
        fontSize="2xl"
        onClick={props.isActive && props.handlePause}
        m={1}
      >
        {props.isPaused ? "Resume" : "Pause"}
      </Button>
      <Button
        colorScheme="red"
        width={{ base: "130px", lg: "160px" }}
        height={{ base: "50px", lg: "60px" }}
        fontSize="2xl"
        onClick={props.handleStop}
      >
        End Game
      </Button>
    </Box>
  );
}
