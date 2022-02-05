import React from "react";
import { Box, Heading } from "@chakra-ui/react";

export default function Header(props) {
  const winnerCongrats = ["You won!🥳", "GG!🎉", "Nice job!🎊"];
  const pickRandomCongrat = Math.floor(Math.random() * winnerCongrats.length);
  let headerContent;

  if (!props.isActive && !props.twelzies) {
    headerContent =
      "Roll until all dice are the same. Click each die to freeze it at its current value between rolls";
  } else if (props.isActive) {
    headerContent = `Time [seconds]: ${props.time} - Rolls: ${props.count}`;
  } else {
    headerContent = winnerCongrats[pickRandomCongrat];
  }

  return (
    <Box height="180px">
      <Heading as="h1" size="4xl" color="purple.600" isTruncated>
        Twelzies
      </Heading>
      <Heading
        as="h2"
        fontSize={{
          base: props.twelzies ? "2xl" : "xl",
          lg: props.twelzies ? "3xl" : "2xl",
        }}
        pb={10}
        color={props.twelzies ? "red.300" : "gray.700"}
      >
        {headerContent}
      </Heading>
    </Box>
  );
}
