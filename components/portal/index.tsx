import {
  Box,
  BoxProps,
  Button,
  Center,
  Divider,
  Heading,
  HeadingProps,
  Icon,
  Image,
  ImageProps,
  Stack,
  Table,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useClipboard,
} from "@chakra-ui/react";
import { NextLink } from "components/shared/NextLink";
import Head from "next/head";
import React from "react";
import { onlyText } from "react-children-utilities";
import { FiLink } from "react-icons/fi";
import { IoCopy } from "react-icons/io5";
import slugify from "slugify";

interface HeadingLinkProps extends HeadingProps {}

const MdxHeadingLink: React.FC<HeadingLinkProps> = ({
  children,
  ...restProps
}) => {
  const slug = slugify(children as string, { lower: true, strict: true });
  return (
    <NextLink
      href={`#${slug}`}
      id={slug}
      position="relative"
      role="group"
      textDecoration="none!important"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Heading {...restProps}>{children}</Heading>
      <Icon ml={3} opacity={0} as={FiLink} _groupHover={{ opacity: 0.69 }}>
        #
      </Icon>
    </NextLink>
  );
};

const MdxH1: React.FC = ({ children }) => (
  <Heading size="display.md" as="h1" my={6}>
    {children}
  </Heading>
);

const MdxH2: React.FC = ({ children }) => {
  return (
    <MdxHeadingLink size="title.lg" as="h2" mt={8} lineHeight="120%">
      {children}
    </MdxHeadingLink>
  );
};

const MdxH3: React.FC = ({ children }) => {
  return (
    <MdxHeadingLink size="title.sm" as="h3" mt={8} lineHeight="120%">
      {children}
    </MdxHeadingLink>
  );
};

const MdxP: React.FC = ({ children }) => (
  <Text
    w="full"
    overflowX="auto"
    size="body.lg"
    as="p"
    mt={3}
    lineHeight="160%"
  >
    {children}
  </Text>
);

interface MdxAProps {
  href: string;
}

const MdxA: React.FC<MdxAProps> = ({ children, href }) => {
  const isExternal = href.startsWith("http");
  return (
    <NextLink color="primary.500" isExternal={!!isExternal} href={href}>
      {children}
    </NextLink>
  );
};

export const ImageSideToSide: React.FC<BoxProps> = ({ children }) => (
  <Stack
    justify="space-around"
    align="center"
    direction={{ base: "column", md: "row" }}
    spacing={3}
  >
    {children}
  </Stack>
);

export const CodeWithCopy: React.FC = ({ children }) => {
  const { onCopy, hasCopied } = useClipboard(onlyText(children));

  return (
    <Stack position="relative" zIndex="popover" overflow="visible">
      <Button
        size="xs"
        onClick={onCopy}
        variant="outline"
        leftIcon={<IoCopy />}
        colorScheme="gray"
        borderColor="gray.700"
        bgColor="white"
        color="gray.700"
        position="absolute"
        right={-2}
        top={-12}
      >
        {hasCopied ? "Code copied" : "Copy code"}
      </Button>
      <code>{children}</code>
    </Stack>
  );
};

export const MdxComponents = {
  a: MdxA,
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  p: MdxP,
  code: CodeWithCopy,
  ul: (props: BoxProps) => (
    <Box as="ul" pt={2} pl={4} ml={2} mb={4} {...props} />
  ),
  ol: (props: BoxProps) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props: BoxProps) => (
    <Box as="li" lineHeight="100%" py={2} nb {...props} />
  ),
  br: (props: BoxProps) => <Box height="24px" {...props} />,
  hr: () => <Divider my={4} w="100%" />,
  table: (props: any) => <Table {...props} />,
  thead: (props: any) => <Thead {...props} />,
  tr: (props: any) => <Tr {...props} />,
  th: (props: any) => <Th {...props} />,
  td: (props: any) => <Td {...props} />,
  img: (props: ImageProps) => {
    return (
      <Center my={3} borderRadius="md">
        <Stack w="100%" align="center">
          <Image
            {...props}
            borderRadius="md"
            h="100%"
            w="100%"
            objectFit="contain"
          />

          {props.alt && (
            <Text color="gray.600" textAlign="center" size="body.sm">
              {props.alt}
            </Text>
          )}
        </Stack>
      </Center>
    );
  },
  Head,
  ImageSideToSide,
};
