import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import { LinkButton } from "components/shared/LinkButton";
import { ConsolePage } from "pages/_app";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";

const Portal404Page: ConsolePage = () => {
  return (
    <Container>
      <Stack spacing={6}>
        <Heading size="subtitle.lg">404 - Not found</Heading>
        <Text size="body.lg">
          The page you are looking for does not exist, or has been moved.
        </Text>
        <Text size="body.lg">
          You can try to find what you are looking for by going back to the{" "}
          <strong>Blog</strong> home page.
        </Text>
        <LinkButton
          alignSelf="flex-start"
          colorScheme="primary"
          href="/"
          leftIcon={<FiChevronLeft />}
        >
          Go back
        </LinkButton>
      </Stack>
    </Container>
  );
};

export default Portal404Page;
