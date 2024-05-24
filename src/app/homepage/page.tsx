import React from "react";
import SideBar from "../components/SideBar";
import db from "../database/db"
import { Text, Heading, Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, } from '@chakra-ui/react';

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
const day = currentDate.getDate();

const monthDictionary = {
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
  12: "December"
} as { [key: number]: string };

const Homepage = () => {
  return (
    <Flex>
    <SideBar />
    <Box flex="1" p={5} flexDirection="column"bg="#130030" display="flex" justifyContent="center" alignItems="center">
      <Text color = "white" fontSize = "50">
        {monthDictionary[month]} {day}th {year}
      </Text>
      <Box 
        flex="1" 
        p={3}
        borderRadius="15px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        paddingTop = "20px"
        padding = "50px"
        alignItems="left"
        bg ="#E9E4F2">
          <Text fontSize="50" color="#130030" fontWeight = "bold">
            Planned Today</Text>
          <Box overflowY = "scroll" height = "70px">
              <Accordion>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      <Text fontSize="20">Split Squats</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Button>TEST1</Button>
                  <Button>TEST2</Button>
                  <Button>TEST3</Button>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Section 2 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </AccordionPanel>
              </AccordionItem>
              </Accordion>
          </Box>
          
        </Box>
      {/* <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion> */}
    </Box>
      </Flex>
  );
};

export default Homepage;
