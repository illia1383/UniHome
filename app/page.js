
"use client";

import { Image } from '@chakra-ui/react'
import { Flex, Box, Text, Button, Stack, VStack } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/main");
  };

  return (
    <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
      <Box paddingTop="250">
        <VStack spacing={4} align="center">
          <Heading as="h1" size="2xl">UniHomes</Heading>
          <Text fontSize="xl">Housing Made Simple</Text>
          <Button colorScheme="teal" size="lg" onClick={handleButtonClick}>
            Find a Home
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
