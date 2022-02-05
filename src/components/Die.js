import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
export default function Die(props) {
  return (
    <Flex
      align="center"
      justify="center"
      h={{ base: "65px", md: "70px" }}
      w={{ base: "65px", md: "70px" }}
      bg={props.isHeld ? "green.300" : "white"}
      cursor="pointer"
      borderRadius="5px"
      transition="50ms"
      fontWeight={700}
      _hover={{
        background: "green.400",
        transform: "translateY(-4px) scale(1.05)",
        color: "white",
      }}
      _focus={{ boxShadow: "0px 8px 8px 0px #00000026" }}
      boxShadow="lg"
      onClick={props.holdDice}
      // if isHeld === true
      transform={props.isHeld && "translateY(-4px) scale(1.05)"}
    >
      <Box>
        <Text fontSize="3xl">{props.value}</Text>
      </Box>
    </Flex>
  );
}
