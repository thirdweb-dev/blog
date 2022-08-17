import { Flex } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { LinkButton } from "./LinkButton";

interface GeneralCtaProps {
  size?: string;
}

export const GeneralCta: React.FC<GeneralCtaProps> = ({ size = "md" }) => {
  const { trackEvent } = useTrack();

  return (
    <Flex w="100%" justifyContent="center">
      <LinkButton
        bgColor="primary.500"
        color="white"
        _hover={{ bgColor: "primary.400" }}
        px={12}
        onClick={() =>
          trackEvent({
            category: "cta-button",
            action: "click",
            label: "start",
          })
        }
        textAlign="center"
        size={size}
        isExternal
        href="https://thirdweb.com/dashboard"
      >
        Start building
      </LinkButton>
    </Flex>
  );
};
