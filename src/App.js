import { ChakraProvider } from "@chakra-ui/react";
import Die from "./components/Die";
import {
  Flex,
  Center,
  Button,
  Grid,
  VStack,
  Heading,
  Container,
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Scoreboard from "./components/Scoreboard";
import Header from "./components/Header";
import Controls from "./components/Controls";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [twelzies, setTwelzies] = useState(false);
  const [count, setCount] = useState(0);

  const [scoreData, setScoreData] = useState(
    JSON.parse(localStorage.getItem("scoreData")) || []
  );

  // timer states
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  //

  function handleButtonClick() {
    setCount((prevValue) => prevValue + 1);
    twelzies && setCount(0);
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const firstValue = dice[0].value;
    const allTheSameValues = dice.every((die) => die.value === firstValue);

    if (allHeld && allTheSameValues) {
      setTwelzies(true);
      setScoreData((prevState) => {
        return [
          ...prevState,
          {
            count: count,
            time: time,
            date: new Date().toString(),
          },
        ];
      });
      timerReset();
    }
  }, [dice]);

  // SET LOCALE STORAGE IF SCORE CHANGES
  useEffect(() => {
    localStorage.setItem("scoreData", JSON.stringify(scoreData));
  }, [scoreData]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 12; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // delete scores
  function deleteScore() {
    setScoreData([]);
    localStorage.removeItem("scoreData");
  }

  // helper function
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function rollDice() {
    if (twelzies) {
      setDice(allNewDice());
      setTwelzies(false);
      timerStart();
    } else {
      setDice((prevState) =>
        prevState.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      timerStart();
    }
  }

  function holdDice(id) {
    if (!twelzies && isActive) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id
            ? {
                ...die,
                isHeld: !die.isHeld,
              }
            : die;
        })
      );
    }
  }

  function removeHeld() {
    setDice((prevState) =>
      prevState.map((die) => {
        return die.isHeld ? { ...die, isHeld: !die.isHeld } : generateNewDie();
      })
    );
  }

  // timerStart

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevState) => prevState + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  function timerStart() {
    setIsActive(true);
    setIsPaused(false);
  }

  function timerPauseResume() {
    setIsPaused(!isPaused);
  }

  function timerReset() {
    setIsActive(false);
    setTime(0);
  }
  // timerEnd

  function ButtonContent() {
    if (twelzies || !isActive) {
      return "New Game";
    } else {
      return "Roll";
    }
  }

  return (
    <ChakraProvider>
      {twelzies && <Confetti />}
      <Flex
        alignItems="center"
        justifyContent="center"
        w="full"
        minH="100vh"
        maxH="100vh"
        h="full"
        bg="linear-gradient(#6667AB, #37399e);"
      >
        <Container>
          <Center align="center" jusitfy="center">
            <VStack
              minWidth={{ base: "370px", md: "650px", lg: "700px" }}
              height={{ base: "920px", md: "840px" }}
              bg="#F5F5F5"
              padding={6}
              borderRadius="8px"
              boxShadow="xl"
              maxH="98vh"
            >
              <Header
                time={time}
                count={count}
                isActive={isActive}
                twelzies={twelzies}
              />
              <Grid
                templateColumns={{
                  base: "repeat(3, 4fr)",
                  lg: "repeat(4, 3fr)",
                }}
                gap={6}
                pb={6}
              >
                {diceElements}
              </Grid>
              <Button
                colorScheme={twelzies ? "blue" : "purple"}
                width="170px"
                height={{ base: "50px", md: "60px" }}
                fontSize="2xl"
                onClick={() => {
                  rollDice();
                  handleButtonClick();
                }}
              >
                {ButtonContent()}
              </Button>
              <Divider borderColor="purple" pt={2} />

              <Grid
                templateColumns={{ base: "repeat 1,2fr", md: "repeat(2,1fr)" }}
              >
                <Scoreboard
                  scoreData={scoreData}
                  twelzies={twelzies}
                  deleteScore={() => deleteScore()}
                />

                <Controls
                  isPaused={isPaused}
                  handlePause={() => timerPauseResume()}
                  handleStop={() => {
                    timerReset();
                    removeHeld();
                  }}
                  isActive={isActive}
                />
              </Grid>
            </VStack>
          </Center>
        </Container>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
