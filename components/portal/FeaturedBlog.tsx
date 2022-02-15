import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { NextLink } from "components/shared/NextLink";
import React from "react";
import { GuideData } from "utils/portalTypes";
import { GrayTag } from "./tag";

interface FeaturedBlogProps {
  blog: GuideData;
}
export const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ blog }) => {
  const { image, title, tags } = blog.metadata;

  return (
    <LinkBox as={Stack} flexDirection={{ base: "column", md: "row" }}>
      <AspectRatio ratio={1200 / 630} w="100%" marginRight={{ base: 0, md: 8 }}>
        <Box borderRadius="lg" overflow="hidden">
          <ChakraNextImage
            alt={`${title} thumbnail`}
            borderTopLeftRadius="lg"
            borderBottomRightRadius="lg"
            src={image}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center"
            width="360"
            height="189"
          />
        </Box>
      </AspectRatio>
      <Stack>
        <Stack direction="row" align="center">
          <>
            <ChakraNextImage
              boxSize={8}
              width={8}
              height={8}
              alt="generalicon"
              src="/assets/tw-icons/general.png"
            />
            <Heading opacity={0.7} size="label.lg" textTransform="uppercase">
              General
            </Heading>
          </>
        </Stack>
        <LinkOverlay as={NextLink} href={`/${blog.slug}`}>
          <Heading size="title.lg" fontWeight={600} noOfLines={3} mb={2}>
            {title}
          </Heading>
        </LinkOverlay>
        <Stack direction="row">
          {tags?.slice(0, 3).map((tag) => (
            <GrayTag key={tag} tag={tag} />
          ))}
        </Stack>
      </Stack>
    </LinkBox>
  );
};
