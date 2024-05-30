"use client";
import React, { useState } from "react";
import SideBar from "../components/SideBar";
import {
  Text,
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Input,
  HStack,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

const monthDictionary : { [key: number]: string } = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const initialTitles: string[] = [
  "Reverse Lunges",
  "Bulgarian Split Squats",
  "Hip Thrusts",
  "Leg Press Machine",
  "Hip Adductor Machine",
];

const exercise = [
  "Reverse Lunges",
  "Bulgarian Split Squats",
  "Hip Thrusts",
  "Leg Press Machine",
  "Hip Adductor Machine",
];

interface AddExProps {
  isOpen: boolean;
  onClose: () => void;
  titles: string[];
  addTitle: (title: string) => void;
}

const AddEx: React.FC<AddExProps> = ({ isOpen, onClose, titles, addTitle }) => {
  const [accordionLabel, setAccordionLabel] = useState("Select Exercise...");
  const [isOpen1, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleButtonClick = (label: any) => {
    setAccordionLabel(label);
    setIsOpen(false);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen1);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setInputValue("");
  };

  const handleConfirmClick = () => {
    if (inputValue.trim()) {
      addTitle(inputValue);
      setAccordionLabel(inputValue);
      setIsEditing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="scale"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent bg="#5A457F">
        <ModalHeader textColor="#ECE8F1" fontSize={"48"}>
          Enter Exercise
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion allowToggle index={isOpen1 ? [0] : []}>
            <AccordionItem border={"none"}>
              <h2>
                <AccordionButton
                  onClick={toggleAccordion}
                  bg="#C7B3DC"
                  borderTopRadius="10px"
                  _hover={{ bg: "#d5c0ec" }}
                  _expanded={{ bg: "#C7B3DC" }}
                >
                  <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
                    {accordionLabel}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel
                bg="#C7B3DC"
                overflowY="auto"
                height="300px"
                borderBottomRadius={"10px"}
              >
                {titles.map((ex, index) => (
                  <Box flexDirection="column" key={index} mt={2}>
                    <Button
                      bg="#5A457F"
                      width="100%"
                      onClick={() => handleButtonClick(ex)}
                    >
                      {ex}
                    </Button>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Button
            mt={2}
            bg="#C7B3DC"
            borderRadius="10px"
            _hover={{ bg: "#d5c0ec" }}
            _expanded={{ bg: "#C7B3DC" }}
            border={"10px"}
            textColor={"black"}
          >
            <AddIcon mr={2} />
            <Box>
              {isEditing ? (
                <HStack>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter New Exercise"
                    border="none"
                  />
                  <Box onClick={handleConfirmClick}>Confirm</Box>
                </HStack>
              ) : (
                <Box onClick={handleEditClick}>Add New Exercise</Box>
              )}
            </Box>
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Homepage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [titlesState, setTitlesState] = useState<string[]>(initialTitles);

  const addTitle = (newTitle: string) => {
    setTitlesState([...titlesState, newTitle]);
  };

  return (
    <Flex>
      <SideBar />
      <Box
        flex="1"
        p={5}
        flexDirection="column"
        bg="#130030"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text alignItems="left" color="white" fontSize="50" pb="60px" pt="40px">
          {monthDictionary[month]} {day}th {year}
        </Text>
        <Box
          flex="1"
          p={3}
          borderRadius="15px"
          display="flex"
          flexDirection="column"
          width="95%"
          justifyContent="flex-start"
          paddingTop="20px"
          padding="50px"
          alignItems="left"
          bg="#E9E4F2"
        >
          <Text fontSize="50" color="#130030" fontWeight="bold">
            Planned Today
          </Text>
          <Box
            overflowY="auto"
            height="500px"
            flexDirection="row"
            display="flex"
          >
            <Box width={"100%"}>
              <Accordion allowToggle allowMultiple>
                {titlesState.map((title, index) => (
                  <AccordionItem mt={3} padding={1} key={index}>
                    <h2>
                      <Box display="flex" alignItems="center">
                        <AccordionButton
                          bg="#C7B3DC"
                          borderRadius="10px"
                          _hover={{ bg: "#d5c0ec" }}
                          _expanded={{ bg: "#C7B3DC" }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            <Text fontWeight="bold" fontSize="20">
                              {title}
                            </Text>
                          </Box>
                          <AccordionIcon display="none" />
                        </AccordionButton>
                        <Button
                          aspectRatio={1}
                          borderRadius="50%"
                          backgroundColor="gray.400"
                          ml={3}
                          padding={0}
                          minWidth="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          bg="#5A457F"
                          _hover={{ bg: "#6c5399" }}
                        >
                          <Box
                            width="75%"
                            height="5%"
                            backgroundColor="gray.700"
                            borderRadius="full"
                            bg="#ECE8F1"
                          />
                        </Button>
                      </Box>
                    </h2>
                    <AccordionPanel
                      fontWeight="bold"
                      fontSize="20"
                      pb={4}
                      display="flex"
                      flexDirection="column"
                    >
                      <Flex flexWrap="wrap">
                        <Box
                          borderRadius="10px"
                          width="10%"
                          mt={3}
                          ml={10}
                          mr={5}
                          bg="#C7B3DC"
                          textColor="black"
                          textAlign="center"
                          padding={2}
                        >
                          Set 1
                        </Box>

                        <Box
                          borderRadius="10px"
                          width="15%"
                          mt={3}
                          mr={5}
                          bg="#C7B3DC"
                          textColor="black"
                          textAlign="left"
                          padding={2}
                        >
                          Weight: 55
                        </Box>
                        <Box
                          borderRadius="10px"
                          width="15%"
                          mt={3}
                          mr={4}
                          bg="#C7B3DC"
                          textColor="black"
                          textAlign="left"
                          padding={2}
                        >
                          Reps: 12
                        </Box>
                        <Button
                          mt={4}
                          width="10px"
                          borderRadius="115px"
                          bg="#5A457F"
                          textColor={"#ECE8F1"}
                          alignContent={"center"}
                          textAlign={"center"}
                        >
                          <CloseIcon />
                        </Button>
                      </Flex>

                      <Button
                        mt={4}
                        ml={10}
                        width="20%"
                        bg="#5A457F"
                        textColor={"#ECE8F1"}
                        alignContent={"center"}
                        textAlign={"center"}
                      >
                        Add Set...
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
              <Box
                bg="#5A457F"
                textColor={"#ECE8F1"}
                alignContent={"center"}
                textAlign={"center"}
                width="96.5%"
                height="40px"
                borderRadius="10px"
                fontSize="20"
                _hover={{ bg: "#6a0084" }}
                onClick={togglePopup}
                mt={5}
              >
                Add Exercise...
              </Box>
              <Center>
                <AddEx
                  isOpen={isOpen}
                  onClose={togglePopup}
                  titles={titlesState}
                  addTitle={addTitle}
                />
              </Center>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Homepage;